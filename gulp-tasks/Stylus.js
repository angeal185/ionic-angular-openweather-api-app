var gulp 	= require("gulp");
stylus 		= require("gulp-stylus"),
rename 		= require("gulp-rename"),
notify 		= require("gulp-notify");

gulp.task("stylus", function () {
  return gulp.src("www/stylus/style.styl")
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest("www/css/"))
	.pipe(notify("Task stylus complete."));
});