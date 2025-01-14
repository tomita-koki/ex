const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Sassのコンパイルタスク
gulp.task('cssSass', function () {
    return gulp.src('_dev/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());  // 変更後にブラウザをリロードせずスタイルのみ反映
});

// ブラウザシンクの初期化タスク
gulp.task("browserSyncTask", function () {
    browserSync.init({
        server: {
            baseDir: "src",
        },
    });
});

// ウォッチタスクの設定
gulp.task('watch', function () {
    gulp.watch('_dev/scss/**/*.scss', gulp.series('cssSass'));  
    gulp.watch("src/**").on('change', browserSync.reload); // 変更があればリロード
});

// デフォルトタスク
gulp.task('default', gulp.parallel('cssSass', 'browserSyncTask', 'watch'));
