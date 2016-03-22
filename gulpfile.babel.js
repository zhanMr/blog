import gulp from 'gulp';
import babel from 'gulp-babel';
import notify from 'gulp-uglify'
import connect from 'gulp-connect';
//合并代码
gulp.task('routes', function() {
    return gulp.src(['develop/routes/*.js'])
        .pipe(babel())
       //合并到libs目录
        .pipe(gulp.dest('routes'))
        //.pipe(livereload({start: true}))
        .pipe(connect.reload())
        //合并完成的提示
        .pipe(notify({message: 'concat is ok...'}));
});

gulp.task('views', function() {
    return gulp.src(['develop/views/*.js*'])
        //.pipe(babel())
        //合并到libs目录
        .pipe(gulp.dest('views'))
        .pipe(connect.reload())
        //.pipe(livereload({start: true}))
        //合并完成的提示
        .pipe(notify({message: 'concat is ok...'}));
});
//事件监听
gulp.task('watch', function(){
    //livereload.listen();
    //connect.server(
    //    {port: 3000,livereload: true}
    //);
    gulp.watch('develop/**/*.*', ['routes','views']);
});

gulp.task('connect', function(){
   connect.server({
       root: 'app',
       port:3000 ,
       livereload: true

   })
});

//默认执行
gulp.task('default',['connect','watch']);


