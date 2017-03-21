import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { WodDataService } from './wod/wod.dataService';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { WodComponent } from './wod/wod.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WodComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    WodDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
