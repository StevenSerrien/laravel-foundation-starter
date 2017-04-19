const elixir = require('laravel-elixir');
const paths = {
  'SOURCE': './resources/assets/',
  'DESTINATION': './public/assets/',
  'NODE': './node_modules/',
}

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir((mix) => {
    mix.sass('app.scss', paths.DESTINATION + 'css', null, {
      includePaths: [
          paths.NODE + 'foundation-sites/scss',
          paths.NODE + 'motion-ui/src',
      ]
    });
    mix.webpack([
      //jQuery needs to be loaded before foundation-menu
      paths.NODE + 'jquery/dist/jquery.js',

      // Core and media query are needed before any
      // other component and are required for all other components
      paths.NODE + 'foundation-sites/js/foundation.core.js',
      paths.NODE + 'foundation-sites/js/foundation.util.mediaQuery.js',
      paths.NODE + 'motion-ui/dist/motion-ui.min.js',

      paths.SOURCE + 'js/app.js',
    ], paths.DESTINATION + 'js/foundation.js', './');
    mix.webpack('app.js', paths.DESTINATION + 'js/');
    mix.browserSync({proxy: 'localhost:8888'});

});
