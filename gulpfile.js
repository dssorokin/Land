var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var paths = {
	html:['app/index.html'],
	css:['sass/main.sсss','sass/fonts.sсss','sass/header.sсss']
};

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    startPath:"/app",
    port: 8081,
    open: true,
    notify: false
  });
});

gulp.task('mincss',function(){
	return gulp.src('sass/*.scss')
			.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
			.pipe(minifyCss())
			.pipe(rename({suffix: '.min',
						  prefix:'_'}))
			.pipe(gulp.dest('app'))
			.pipe(reload({stream:true}));
});



gulp.task('js',function(){
	gulp.src('js/common.js')
	.pipe(reload({stream:true}));
});


gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

gulp.task('watcher' ,function(){
	gulp.watch('sass/*.scss',['mincss']);
	gulp.watch(paths.html,['html']);
	gulp.watch('app/js/common.js',['js']);
});

gulp.task('default', ['watcher', 'browserSync','mincss']);