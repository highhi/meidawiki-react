'use strict';

var gulp          = require( 'gulp' );
var sync          = require( 'browser-sync' );
var watch         = require( 'gulp-watch' );
var plumber       = require( 'gulp-plumber' );
var rename        = require( 'gulp-rename' );
var sourceMaps    = require( 'gulp-sourcemaps' );

var DIR_MAPS      = '../_maps';

var DIR_SRC       = './src';
var DIR_SRC_SCSS  = './src/scss';
var DIR_SRC_JS    = './src/js';

var DIR_DIST      = './dist';
var DIR_DIST_MAPS = './dist/_maps';
var DIR_DIST_CSS  = './dist/css';
var DIR_DIST_JS   = './dist/js';

var SCSS_FILES    = './src/scss/**/*.scss';
var JS_FILES      = './src/js/**/*.js';
var JSX_FILES     = './src/js/**/*.jsx';


gulp.task('build-css', function() {
    var rubySass = require( 'gulp-ruby-sass' );

    return rubySass( SCSS_FILES, {
        style     : 'compressed',
        compass   : true,
        sourcemap : true
    })
    .pipe( plumber() )
    .pipe( rename({
        extname : '.min.css'
    }))
    .pipe( sourceMaps.write( DIR_MAPS, {
        includeContent : false,
        sourceRoot     : DIR_DIST_MAPS
    }))
    .pipe( gulp.dest( DIR_DIST_CSS ) );
});

gulp.task( 'build-js', function(){
    var browserify = require( 'browserify' );
    var babelify   = require( 'babelify' );
    var source     = require( 'vinyl-source-stream' );
    var buffer     = require( 'vinyl-buffer' );
    var uglify     = require( 'gulp-uglify' );

    return browserify({
        entries : [ DIR_SRC_JS + '/index.jsx' ],
        debug   : true
    })
    .transform( babelify )
    .bundle()
    .on( 'error', function( err ) {
        console.error( 'Error : ' + err.message);
        this.emit('end'); //監視を終了させない
    })
    .pipe( source( 'bundle.js' ) )
    .pipe( buffer() )
    .pipe( sourceMaps.init({
        loadMaps : true
    }))
    //.pipe( uglify() )
    .pipe( sourceMaps.write( DIR_MAPS, {
        includeContent : false,
        sourceRoot     : DIR_DIST_MAPS
    }))
    .pipe( gulp.dest( DIR_DIST_JS ) );
});

gulp.task('sync', function() {
    return sync.init( null, {
        server : {
            baseDir : './'
        },
        open: false
    });
});

gulp.task( 'reload', function() {
    return sync.reload();
});

gulp.task('watch', function() {
    watch( SCSS_FILES, function() {
        gulp.start( 'build-css' );
    });
    watch( [ JS_FILES, JSX_FILES ], function() {
        gulp.start( 'build-js' );
    });
    watch( [ DIR_DIST + '/**', '!' + DIR_DIST_MAPS ], function() {
        gulp.start( 'reload' );
    });
});

gulp.task('default', [ 'sync', 'watch' ]);