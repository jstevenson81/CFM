import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IProgram } from '../interfaces/IProgram';
import { IApiWod } from '../interfaces/IApiWod';
import { WodDataService } from './wod.dataService';

@Component({
  selector: 'cfm-wod',
  templateUrl: './wod.component.html',
  styleUrls: ['./wod.component.css']
})

export class WodComponent {

  programList: IProgram[];
  wod: IApiWod;
  errorMessage: any;

  constructor(private dataService: WodDataService) {
    dataService
      .getPrograms()
      .subscribe(
      programs => {this.programList = programs; console.log(this.programList)},
      error => this.errorMessage = error as any);

      dataService.getWod('03-21-2017', 'CrossFit')
      .subscribe(
        wod => {this.wod = wod; console.log(this.wod)},
        error => {this.errorMessage = error as any}
      );
      
  }

}