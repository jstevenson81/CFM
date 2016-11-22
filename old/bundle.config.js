var
    src = './src',
    scriptSrc = src + '/js/',
    allCss = src + '/css/**/**.css',
    npm = './node_modules/'

var config = {
    bundle: {
        main: {
            scripts: [
                npm + 'jquery/dist/jquery.js',
                npm + 'bootstrap/dist/js/bootstrap.js',
                npm + 'scrollreveal/dist/scrollreveal.js',
                scriptSrc + 'ui.js'
            ],
            styles: [
                npm + 'bootstrap/dist/css/bootstrap.css',
                allCss
            ]
        },
    },
    copy:[
        {
        src: [npm + 'bootstrap/dist/fonts/**/*.*'],
        base: npm + 'bootstrap/dist/',
        },
        {
            src: [src + '/index.html'],
            base: src
        },
        {
            src: [src + '/img/**/*.*'],
            base: src
        },
        {
            src: [src + '/ts/**/*.*'],
            base: src           
        }
    ]
}

module.exports = config;