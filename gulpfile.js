
// dependencies
const gulp      = require('gulp');
const gutil     = require('gulp-util');
const connect   = require('gulp-connect');
const open      = require('gulp-open');
const runSequence=require('run-sequence');
const sass      = require('gulp-sass');
const rename    = require('gulp-rename');

const less      = require('gulp-less');
const path      = require('path');


// read in the package file
const pkg = require('./package.json');


gulp.task('sass:dev', function() {
    return gulp.src('dev/*.scss')
        .pipe(sass({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('dev'));
});

gulp.task('less', function () {
    return gulp.src('dev/*.less')
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('dev'));
});

gulp.task('connect', function() {
    connect.server({
        root: ['dev'],
        port: 8889,
        livereload: true,
        //livereload: { port: '9999' }
    });
});

gulp.task('open', function() {
    var options = {
        uri: 'http://localhost:8889'
        // app: 'Google Chrome' on Max OSX or 'chrome' on Windows
        // app: 'firefox'
    };
    gutil.log('-----------------------------------------');
    gutil.log('Opening browser to:', gutil.colors.yellow('http://localhost:8889'));
    gutil.log('-----------------------------------------');
    gulp.src(__filename)
        .pipe(open(options));
});



gulp.task('basic-reload', function() {
    gulp.src('dev')
        .pipe(connect.reload());
});

// Comment these if using SASS

// gulp.task('reload', function() {
//     runSequence('less', 'basic-reload');
// });

// gulp.task('watch', function() {
//     gulp.watch(['dev/*.html', 'dev/*.js', 'dev/**/*.less'], ['reload']);
// });

// gulp.task('serve', function(callback) {
//     runSequence('less', ['connect'], ['open','watch'],
//         callback);
// });

// Uncomment this to use SASS instead of LESS

gulp.task('reload', function() {
    runSequence('sass:dev', 'basic-reload');
});

gulp.task('watch', function() {
    gulp.watch(['dev/*.html', 'dev/*.js', 'dev/**/*.scss'], ['reload']);
});

gulp.task('serve', function(callback) {
    runSequence('sass:dev', ['connect'], ['open','watch'],
        callback);
});


gulp.task('default', ['serve']);
