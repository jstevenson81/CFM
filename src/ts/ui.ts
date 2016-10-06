/// <reference path="../../typings/browser.d.ts" />

(() => {
    'use strict';

    $('.coach-link').click(function () {
        let currentDetails = $(this).attr('href');
        $('.coach-details').not(currentDetails).each(function (i) {
            $(this).collapse('hide');
        });
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
        let $anchor = $(this);
        $('html, body').stop().animate({scrollTop: ($($anchor.attr('href')).offset().top - 50)}, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Initialize and Configure Scroll Reveal Animation
    let myWindow = window as any;
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
