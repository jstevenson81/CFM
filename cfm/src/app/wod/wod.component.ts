import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as moment from 'moment';

import { IProgram } from '../interfaces/IProgram';
import { IApiWod } from '../interfaces/IApiWod';

import { WodDataService } from './wod.dataService';

@Component({
  selector: 'cfm-wod',
  templateUrl: './wod.component.html',
  styleUrls: ['../../assets/css/wod.component.css']
})

export class WodComponent {

  programList: IProgram[];
  wod: IApiWod;
  errorMessage: any;
  wodDate: string;
  wodProgramName: string;

  constructor(private dataService: WodDataService) {
    dataService
      .getPrograms()
      .subscribe(
      programs => { this.programList = programs; console.log(this.programList) },
      error => this.errorMessage = error as any);
  }

  getWod(programName: string): void {

    // first we have to check to see what time it is
    var afterSevenPm: boolean = moment().hour() >= 19;
    // if we are after seven pm we need to set the date for tomorrow
    let wodDateMoment: moment.Moment;
    wodDateMoment = afterSevenPm ? moment().add(1, 'days') : moment();
    // set the current wod date
    this.wodDate = wodDateMoment.format('dddd, MMMM Do, YYYY');
    // set the current wod program name
    this.wodProgramName = programName;
    // get the data from the wodify API
    this.dataService.getWod(wodDateMoment.format('MM-DD-YYYY'),this.wodProgramName)
      .subscribe(wod => this.wod = wod, error => this.errorMessage = error as any);
  }
}