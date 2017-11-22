/**
 * Configuration.
 */

// CSS
var styleSRC                = './src/sass/main.scss';
var styleDestination        = './dist/css/';

// Vendor JS
var jsVendorSRC             = './src/js/vendor/*.js';
var jsVendorDestination     = './dist/js/';
var jsVendorFile            = 'vendors';

// Custom JS
var jsCustomSRC             = './src/js/custom/*.js';
var jsCustomDestination     = './dist/js/';
var jsCustomFile            = 'custom';

// Images
var imagesSRC               = './src/img/**/*.{png,jpg,gif,svg}';
var imagesDestination       = './dist/img/';

// Watch file paths
var styleWatchFiles         = './src/sass/**/*.scss';
var vendorJSWatchFiles      = './src/js/vendor/*.js';
var customJSWatchFiles      = './src/js/custom/*.js';

const AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  '> 1%',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
];

/**
 * Load Plugins
 */

var gulp         = require('gulp');

// CSS
var sass         = require('gulp-sass');
var minifycss    = require('gulp-uglifycss');
var autoprefixer = require('gulp-autoprefixer');
var mmq          = require('gulp-merge-media-queries');

// JS
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');

// Images
var imagemin     = require('gulp-imagemin');

// Utilities
var rename       = require('gulp-rename');
var lineec       = require('gulp-line-ending-corrector');
var filter       = require('gulp-filter');
var sourcemaps   = require('gulp-sourcemaps');

/**
 * Tasks
 */

gulp.task('styles', function () {
  gulp.src( styleSRC )
  .pipe( sourcemaps.init() )
  .pipe( sass( {
    errLogToConsole: true,
    outputStyle: 'compact',
    // outputStyle: 'compressed',
    // outputStyle: 'nested',
    // outputStyle: 'expanded',
    precision: 10
  } ) )
  .on('error', console.error.bind(console))
  .pipe( sourcemaps.write( { includeContent: false } ) )
  .pipe( sourcemaps.init( { loadMaps: true } ) )
  .pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )

  .pipe( sourcemaps.write ( styleDestination ) )
  .pipe( lineec() )
  .pipe( gulp.dest( styleDestination ) )

  .pipe( filter( '**/*.css' ) )
  .pipe( mmq( { log: true } ) )

  .pipe( rename( { suffix: '.min' } ) )
  .pipe( minifycss( {
    maxLineLen: 10
  }))
  .pipe( lineec() )
  .pipe( gulp.dest( styleDestination ) )

  .pipe( filter( '**/*.css' ) )
  .pipe( notify( { message: 'TASK: "styles" Completed! 💯', onLast: true } ) )
});

gulp.task( 'vendorsJs', function() {
  gulp.src( jsVendorSRC )
  .pipe( concat( jsVendorFile + '.js' ) )
  .pipe( lineec() )
  .pipe( gulp.dest( jsVendorDestination ) )
  .pipe( rename( {
    basename: jsVendorFile,
    suffix: '.min'
  }))
  .pipe( uglify() )
  .pipe( lineec() )
  .pipe( gulp.dest( jsVendorDestination ) )
  .pipe( notify( { message: 'TASK: "vendorsJs" Completed! 💯', onLast: true } ) );
});

gulp.task( 'customJS', function() {
  gulp.src( jsCustomSRC )
  .pipe( concat( jsCustomFile + '.js' ) )
  .pipe( lineec() )
  .pipe( gulp.dest( jsCustomDestination ) )
  .pipe( rename( {
    basename: jsCustomFile,
    suffix: '.min'
  }))
  .pipe( uglify() )
  .pipe( lineec() )
  .pipe( gulp.dest( jsCustomDestination ) )
  .pipe( notify( { message: 'TASK: "customJs" Completed! 💯', onLast: true } ) );
});

gulp.task( 'images', function() {
  gulp.src( imagesSRC )
  .pipe( imagemin( {
        progressive: true,
        optimizationLevel: 3,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}]
      } ) )
  .pipe(gulp.dest( imagesDestination ))
  .pipe( notify( { message: 'TASK: "images" Completed! 💯', onLast: true } ) );
});

gulp.task( 'default', ['styles', 'vendorsJs', 'customJS', 'images'], function () {
  gulp.watch( styleWatchFiles, [ 'styles' ] );
  gulp.watch( vendorJSWatchFiles, [ 'vendorsJs' ] );
  gulp.watch( customJSWatchFiles, [ 'customJS' ] );
});