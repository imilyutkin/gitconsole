var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    ts = require('gulp-typescript'),
    minifycss = require('gulp-minify-css');

var hostname = 'localhost';

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: 35729}));
    app.use(express.static(__dirname + '/app'));
    app.listen('8000', hostname);
});

gulp.task('ts', function () {
	return gulp.src('scripts/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'main.js'
		}))
		.pipe(gulp.dest('app/js'));
});

var tinylr;
gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('watch', function() {
    gulp.watch('css/*.css', ['styles'], notifyLiveReload);
    gulp.watch('scripts/**/*.ts', ['ts'], notifyLiveReload);
    gulp.watch('scripts/*.ts', ['ts'], notifyLiveReload);
    gulp.watch('app/js/*.js', notifyLiveReload);
    gulp.watch('app/css/*.css', notifyLiveReload);
    gulp.watch('app/*.html', notifyLiveReload);
});

gulp.task('styles', function () {
    gulp.src('css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: true
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('vendors', function () {
    gulp.src('bower_components/angular/angular.min.js')
      .pipe(gulp.dest('app/vendor/angular'));
    gulp.src('bower_components/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('app/vendor/jquery'));
    gulp.src('node_modules/normalize.css/normalize.css')
      .pipe(gulp.dest('app/vendor/normalize'));
});

gulp.task('default', ['styles', 'ts', 'express', 'livereload', 'watch', 'vendors'], function() {

});
