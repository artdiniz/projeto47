var gulp = require('gulp');
var del = require('del');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

gulp.task('default', function(){
	gulp.start('prefix');
});

gulp.task('watch', function(){
	watch('**/*', function(){
		gulp.start('prefix');
	});
});

gulp.task('clean', function(cb){
	del(['dist'], cb);
});

gulp.task('copy', ['clean'], function(){
	return gulp.src('**/*').pipe(gulp.dest('dist'));
});

gulp.task('sass', ['copy'], function(){
	return gulp.src('dist/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('prefix', ['sass'], function(){
	return gulp.src('dist/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'IE 10']
		}))
		.pipe(gulp.dest('dist/css'));
});
