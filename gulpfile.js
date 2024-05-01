// gulpプラグインの読みこみ
const gulp = require("gulp");

// browser-syncのプラグインの読み込み
const browserSync = require("browser-sync");

// タスクの設定
gulp.task("browserSyncTask", function (done) {
  browserSync({
    server: {
      baseDir: "docs", // ルートとなるディレクトリを指定
    },
  });

  // srcフォルダ以下のファイルを監視
  gulp.watch("docs/**", function (done) {
    browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
    done(); //追加
  });
});