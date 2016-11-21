import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'my-app',
    template: `<h1>Hello Angular</h1>`
})
export class AppComponent {
    constructor() {
        console.log($(window));
    }
 }
