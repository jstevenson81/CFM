/// <reference path="../../typings/browser.d.ts" />
(function () {
    'use strict';
    $('.coach-link').click(function () {
        var currentDetails = $(this).attr('href');
        $('.coach-details').not(currentDetails).each(function (i) {
            $(this).collapse('hide');
        });
    });
    $('.collapse').on('shown.bs.collapse', function () {
        var $this = $(this);
        $('html, body').stop().animate({ scrollTop: ($this.offset().top - 50) }, 1250, 'easeInOutExpo');
    });
    $('#toggle').click(function () {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });
    $('nav > ul > li > a').click(function () {
        $('#toggle').toggleClass('active');
        $('#overlay').toggleClass('open');
    });
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({ scrollTop: ($($anchor.attr('href')).offset().top - 50) }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
    // Initialize and Configure Scroll Reveal Animation
    var myWindow = window;
    myWindow.sr = ScrollReveal();
    myWindow.sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    myWindow.sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    myWindow.sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);
})();

//# sourceMappingURL=ui.js.map
