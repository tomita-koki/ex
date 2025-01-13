const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Sassのコンパイルタスク
gulp.task('cssSass', function () {
    return gulp.src('_dev/scss/**/*.scss')  // すべてのSCSSファイルを対象に
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

// ウォッチタスク（変更を監視してcssSassタスクを実行）
gulp.task('watch', function () {
    gulp.watch('_dev/scss/**/*.scss', gulp.series('cssSass'));  
});

// デフォルトタスクでwatchを実行
gulp.task('default', gulp.series('cssSass', 'watch'));


