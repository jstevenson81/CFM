// angular imports
import { Component } from '@angular/core';

// jquery 
declare var $: JQueryStatic;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app works!';

    constructor() {
    }

    ngAfterViewInit(): void {
        // jQuery for page scrolling feature - requires jQuery Easing plugin
            $('a.page-scroll').bind('click', function (event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: ($($anchor.attr('href')).offset().top - 50)
                }, 1250, 'easeInOutExpo');
                event.preventDefault();
            });

            // Highlight the top nav as scrolling occurs

            // Closes the Responsive Menu on Menu Item Click
            $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function () {
                $('.navbar-toggle:visible').click();
            });

            $('body').scrollspy({
                target: '.navbar-fixed-top',
                offset: 51
            });


            // Offset for Main Navigation
            $('#mainNav').affix({
                offset: {
                    top: 100
                }
            });
    }
}
