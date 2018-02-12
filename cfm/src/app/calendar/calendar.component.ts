import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as moment from 'moment';
import * as _ from 'lodash';

import { WodifyDataService } from '../shared/wodify.dataService';

import {IClass} from '../interfaces/IClass';

@Component({
    selector: 'cfm-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['../../assets/css/calendar.component.css']
})

export class CalendarComponent {

    errorMessage: any;
    classes: Array<IClass>;
    today: string;

    constructor(private dataService: WodifyDataService) { }

    ngOnInit() {
        // get the date to show in the calendar
        let properDate = this.dataService.getProperDate();
        // set today to the properDate
        this.today = properDate.format('dddd, MMMM Do, YYYY')
        // get the calendar
        this.dataService.getCalendar(this.dataService.formatDateForWodify(properDate))
        .subscribe(classes => this.classes = classes, error => this.errorMessage = error as any);
    }
}