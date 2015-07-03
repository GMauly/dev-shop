/**
 * Created by urielbertoche on 03/07/15.
 */

'use strict';

// Include Gulp
var gulp = require('gulp');

var childProcess = require('child_process');
var path = require('path');
var webpack = require('webpack');
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

var watch = false;

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

gulp.task('css', function () {
  return gulp.src(plugins.mainBowerFiles().concat(cssFiles))
    .pipe(plugins.filter('*.css'))
    .pipe(plugins.changed(buildDest + 'css'))
    .pipe(gulp.dest(buildDest + 'css'))
    .pipe(plugins.size({'title': 'css'}));
});

gulp.task('build:js', function () {
  gulp.src(buildDest + 'js/*.js')
    .pipe(plugins.changed(pubDest + 'js'))
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(pubDest + 'js'))
});

gulp.task('build:css', function () {
  gulp.src(buildDest + 'css/*.css')
    .pipe(plugins.changed(pubDest + 'css'))
    .pipe(plugins.concat('main.css'))
    .pipe(gulp.dest(pubDest + 'css'))
});

gulp.task('build:all', ['js', 'less', 'css'], function() {
  gulp.run(['build:js', 'build:css']);
});

/*
gulp.task('bundle', function (callback) {
  var config = require('./webpack.config.js');
  var bundler = webpack(config);
  var verbose = true;

  var bundlerRunCount = 0;

  var bundle = function (err, stats) {
    if (err) {
      throw new plugins.util.PluginError('webpack', err);
    }

    console.log(stats.toString({
      colors: plugins.util.colors.supportsColor,
      hash: verbose,
      version: verbose,
      timings: verbose,
      chunks: verbose,
      chunksModules: verbose,
      cached: verbose,
      cachedAssets: verbose
    }));

    if (++bundlerRunCount === (watch ? config.length : 1)) {
      return callback();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});
*/

gulp.task('build', ['clean', 'build:all']);

gulp.task('build:watch', function (callback) {
  watch = true;

  gulp.run(['build'], function () {
    // watch .js files
    gulp.watch(jsFiles, ['js', 'build:js']);

    // watch .less and .css files
    gulp.watch(lessFiles, ['less', 'build:css']);
    gulp.watch(cssFiles, ['css', 'build:css']);

    callback();
  });

});

gulp.task('server', ['build:watch'], function (callback) {

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

          callback();
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

gulp.task('sync', ['server'], function (callback) {
  browserSync = require('browser-sync');

  browserSync({
    logPrefix: 'DEVS',
    open: false,
    notify: false,
    https: false,
    proxy: 'localhost:5000'
  }, callback);

  gulp.watch(watchFiles, function (file) {
    browserSync.reload(path.relative(__dirname, file.path));
  });
});

gulp.task('default', ['sync']);