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

var lib = require('bower-files')();

var browserSync;

// Include plugins
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
  replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var src = {
  css: ['src/**/*.css', 'react/components/**/*.css'],
  js: ['src/**/*.js', 'react/components/**/*.js'],
  less: ['react/components/**/*.less', 'src/**/*.less'],
  bower: ['bower.json', '.bowerrc'],
  server: [
    'server/app.js',
    'server/routes/*.js',
    'server/routes/**/*.js',
    'server/views/*.jade',
    'server/views/**/*.jade'
  ]
};

var publishdir = 'public/'
var dist = {
  all: [publishdir + '/**/*'],
  css: publishdir + '/css/',
  js: publishdir + '/js/',
};

var builddir = 'build/';

var watchFiles = src.js.concat(src.less, src.css, src.server);

// Clean output directory
gulp.task('clean', function (callback) {
  del(['build/*', 'public/*'], {dot: true});
});

gulp.task('js', function () {
  return gulp.src(lib.ext('js').files.concat(src.js))
    .pipe(plugins.filter('*.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.changed(builddir + 'js'))
    .pipe(gulp.dest(builddir + 'js'))
    .pipe(plugins.size({'title': 'javascripts'}));
});

gulp.task('less', function () {
  return gulp.src(lib.ext('less').files.concat(src.less))
    .pipe(plugins.less())
    .pipe(plugins.changed(builddir + 'css'))
    .pipe(gulp.dest(builddir + 'css'))
    .pipe(plugins.size({'title': 'less'}));
});

gulp.task('css', ['less'], function () {
  return gulp.src(lib.ext('css').files.concat(src.css))
    .pipe(plugins.filter('*.css'))
    .pipe(plugins.changed(builddir + 'css'))
    .pipe(gulp.dest(builddir + 'css'))
    .pipe(plugins.size({'title': 'css'}));
});

gulp.task('build:js', ['js'], function () {
  gulp.src(builddir + 'js/*.js')
    .pipe(plugins.changed(publishdir + 'js'))
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(publishdir + 'js'))
});

gulp.task('build:css', ['less', 'css'], function () {
  gulp.src(builddir + 'css/*.css')
    .pipe(plugins.changed(publishdir+ 'css'))
    .pipe(plugins.concat('main.css'))
    .pipe(gulp.dest(publishdir + 'css'))
});

gulp.task('build:all', ['clean', 'build:js', 'build:css']);

gulp.task('build:watch', function () {

  gulp.run(['build:all'], function () {
    // watch .js files
    gulp.watch(src.js, ['js', 'build:js']);

    // watch .less and .css files
    gulp.watch(src.less, ['less', 'build:css']);
    gulp.watch(src.css, ['css', 'build:css']);
    gulp.watch(src.bower, ['bower']);
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