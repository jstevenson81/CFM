import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { WodifyDataService } from './shared/wodify.dataService';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { WodComponent } from './wod/wod.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WodComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    WodifyDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
