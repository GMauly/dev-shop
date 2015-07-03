/**
 * Created by urielbertoche on 03/07/15.
 */

'use strict';

// Include Gulp
var gulp = require('gulp');

var childProcess = require('child_process');
var path = require('path');
var del = require('del');
var mkdirp = require('mkdirp');

var browserSync;

// Include plugins
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
  replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var buildDest = 'build/';
var pubDest = 'public/';
var jsFiles = ['react/components/**/*.js', 'src/js/*.js'];
var lessFiles = ['react/components/**/*.less', 'src/less/*.less'];
var cssFiles = ['react/components/**/*.css', 'src/css/*.css'];
var src_server = [
  'server/app.js',
  'server/routes/*.js',
  'server/routes/**/*.js',
  'server/views/*.jade',
  'server/views/**/*.jade'
];

var watchFiles = jsFiles.concat(lessFiles, cssFiles, src_server);

// Clean output directory
gulp.task('clean', function (callback) {
  del(['build/*', 'public/*'], {dot: true});
});

gulp.task('js', function () {
  return gulp.src(plugins.mainBowerFiles().concat(jsFiles))
    .pipe(plugins.filter('*.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.changed(buildDest + 'js'))
    .pipe(gulp.dest(buildDest + 'js'))
    .pipe(plugins.size({'title': 'javascripts'}));
});

gulp.task('less', function () {
  return gulp.src(lessFiles)
    .pipe(plugins.less())
    .pipe(plugins.changed(buildDest + 'css'))
    .pipe(gulp.dest(buildDest + 'css'))
    .pipe(plugins.size({'title': 'less'}));
});

gulp.task('css', ['less'], function () {
  return gulp.src(plugins.mainBowerFiles().concat(cssFiles))
    .pipe(plugins.filter('*.css'))
    .pipe(plugins.changed(buildDest + 'css'))
    .pipe(gulp.dest(buildDest + 'css'))
    .pipe(plugins.size({'title': 'css'}));
});

gulp.task('build:js', ['js'], function () {
  gulp.src(buildDest + 'js/*.js')
    .pipe(plugins.changed(pubDest + 'js'))
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(pubDest + 'js'))
});

gulp.task('build:css', ['less', 'css'], function () {
  gulp.src(buildDest + 'css/*.css')
    .pipe(plugins.changed(pubDest + 'css'))
    .pipe(plugins.concat('main.css'))
    .pipe(gulp.dest(pubDest + 'css'))
});

gulp.task('build:all', ['build:js', 'build:css']);

gulp.task('build:watch', function () {

  gulp.run(['build:all'], function () {
    // watch .js files
    gulp.watch(jsFiles, ['js', 'build:js']);

    // watch .less and .css files
    gulp.watch(lessFiles, ['less', 'build:css']);
    gulp.watch(cssFiles, ['css', 'build:css']);
  });

});

gulp.task('server', ['build:watch'], function () {

  var started = false;

  var server = {};

  var startup = function () {
    var child = childProcess.fork('./server/app.js', {
      env: (process.env ? process.env : 'development')
    });

    child.once('message', function (message) {
      if (message.match(/^online$/)) {
        if (browserSync) {
         browserSync.reload();
        }

        if(!started) {
          started=true;
          gulp.watch(src_server, function () {
            plugins.util.log('Restarting development server.');
            server.kill('SIGTERM');
            server = startup();
          });

        }
      }
    });

    return child;
  }

  server = startup();

  process.on('exit', function () {
    server.kill('SIGTERM');
  });
});

gulp.task('sync', ['server'], function () {
  browserSync = require('browser-sync');

  browserSync({
    logPrefix: 'DEVS',
    open: false,
    notify: false,
    https: false,
    proxy: 'localhost:5000'
  });

  gulp.watch(watchFiles, function (file) {
    browserSync.reload(path.relative(__dirname, file.path));
  });
});

gulp.task('default', ['sync']);