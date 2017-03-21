import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import * as _ from 'lodash';
import * as moment from 'moment';

import { IProgram } from '../interfaces/IProgram';
import { IApiWod } from '../interfaces/IApiWod';
import { IComponent } from '../interfaces/IComponent';
import { IComponentList } from '../interfaces/IComponentList';
import { IWodifyRecord } from '../interfaces/IWodifyRecord';

@Injectable()
export class WodDataService {

    apiKey: string;
    dataType: string;
    programsToDisplay: Array<string>;
    location: string;

    constructor(private http: Http) {
        this.apiKey = '8oxu8eutwg3d740yte9qo6rhd'
        this.dataType = 'json';
        // push to program id's
        this.programsToDisplay = ['34077', '34487', '34482'];
        // default location
        this.location = 'Crossfit Mandeville';
    }

    private formatRequest(url: string): string {
        // return the formatted url
        return `${url}?apiKey=${this.apiKey}&type=${this.dataType}`
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private createWodRecord(res: IWodifyRecord): IApiWod {
        
        // create a wod
        var wod: IApiWod = { Program: {Id: '', Name: ''}, Components: {Component: []}, WodHeader: {Date: '', Name: ''}, NoWod: false};
        // if we have no wod then return a IApiWod with a name and date only in the WodHeader
        if (!_.isUndefined(res.APIError) && res.APIError.ResponseCode === '400') {
            // set the error information
            wod.NoWod = true;
            // return the wod
            return wod;
        }
        // set all the other information
        wod.Program.Id=res.RecordList.APIWod.Program.Id;
        wod.Program.Name=res.RecordList.APIWod.Program.Name;
        wod.WodHeader.Date = moment(res.RecordList.APIWod.WodHeader.Date, 'YYYY-MM-DD').format('dddd, MMMM Do, YYYY');
        wod.WodHeader.Name = res.RecordList.APIWod.WodHeader.Name;
        // push the components to the wod
        _.each(res.RecordList.APIWod.Components.Component, (component: IComponent) => {
            // map the component if it has a description or a comment
            if (!_.isEmpty(component.Comments) || !_.isEmpty(component.Description)) {
                // remove the line breaks
                var description = _.isEmpty(component.Description) ? '' : component.Description.replace(/(\r\n|\n|\r)/gm, '<br />');
                var comments = _.isEmpty(component.Comments) ? '' : component.Comments.replace(/(\r\n|\n|\r)/gm, '<br />');
                // push the components
                wod.Components.Component.push({ Name: component.Name, Description: description, Comments: comments });
            }
        });

        // return the wod
        return wod;
    }

    getPrograms(): Observable<Array<IProgram>> {
        var url = this.formatRequest('https://app.wodify.com/API/programs_v1.aspx');

        return this.http.get(url)
            // get the response as json
            .map((res: Response) => res.json() as IWodifyRecord)
            // map the response's programs and return them
            .map((res: IWodifyRecord) => {
                // create a result holder
                let result = _.reject(res.RecordList.Program, (program: IProgram) => {
                    // see if the program is in the list of accepted programs
                    var allowed = _.find(this.programsToDisplay, (id: string) => {
                        return id === program.Id;
                    });
                    // if allowed is undefined
                    return _.isUndefined(allowed);
                });
                // return the array of programs
                return result;
            })
            .catch(this.handleError);
    }

    getWod(wodDate: string, program: string): Observable<IApiWod> {
        // get the url
        var url = this.formatRequest('https://app.wodify.com/API/WODs_v1.aspx');
        // get the date
        var wodDateFormatted = moment(wodDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
        url = url + `&location=${encodeURIComponent(this.location)}&program=${encodeURIComponent(program)}&date=${encodeURIComponent(wodDateFormatted)}`;
        // run the git
        return this.http.get(url)
            // map the response to json
            .map((res: Response) => res.json() as IWodifyRecord)
            // map the record to a wod
            .map((res: IWodifyRecord) => {
               // return the created record
               return this.createWodRecord(res);
            })
            .catch(this.handleError);
    }


}