var gulp = require('gulp');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');

// 웹서버를 localhost:9400 로 실행한다.
gulp.task('server', function () {
	return gulp.src('./')
		.pipe(webserver( {
            port: 9400
        } ));
});

// sass 파일을 css 로 컴파일한다.
//
// gulp.watch() 에서는 모든 scss 파일의 수정을 감지하지만,
// 여기서 컴파일은 index.scss 하나만 하면, index.scss 가 다른 모든 part scss 를 포함하므로
// 모든 scss 파일들이 컴파일 된다.
gulp.task('compile-sass', function () {
	return gulp.src("css/index.scss")
		.pipe( sass().on('error', sass.logError) ) // sass 에러 처리. on(...) 을 안하면 gulp 가 멈춘다.
		.pipe(gulp.dest('css'));
});


// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
	livereload.listen();
    gulp.watch("./css/*.scss", ['compile-sass']); // scss 파일이 변경되면, 컴파일
    gulp.watch("./css/*.css").on('change', livereload.changed); // index.css 가 변경되면 리로드
	gulp.watch("./index.html").on('change', livereload.changed); // index.html 이 변경되면 reload
});


// gulp 명령을 실행하면, 기본적으로 수행 할 task 목록
// 1. gulp-server 먼저 실행하고,
// 2. sass 를 한번 컴파일한다. ( 참고로 : js 는 tsc 가 컴파일한다. )
// 3. 그리고 맨 마지막 watch 를 해서 이 후 부터 변경되는 파일은 watch 콜백에서 정해진 대로 처리한다.
gulp.task( 'default', [ 'server', 'compile-sass', 'watch'  ] );
