//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require("gulp-less"),
    concat = require('gulp-concat'),//合并文件 --合并只是放一起--压缩才会真正合并相同样式
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    autoprefixer = require("gulp-autoprefixer"),
    webserver = require('gulp-webserver'),
    // cssBase64 = require('gulp-css-base64'),
    // base64 = require('gulp-base64'),
    watch = require('gulp-watch');

//less => combine => css
var CGI = {
    //zr的目录
    zr:'src/less/core/zr.less',
    fontello:"src/font/css/fontello.css",
    animation:"src/font/css/animation.css",
    watchLess:"src/less/**/*.less",
    local:"src/less_local/**/*.less",
    js:"src/js_local/**/*.js"
}
var DEST = {
    font:"static/font",
    zr:"static/css",
    js:"static/js"

}
gulp.task('less', function () {
    gulp.src([CGI.zr,CGI.fontello,CGI.animation]) //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],//last 5 versions- 主流浏览器的最新两个版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(concat('zr.css'))
        .pipe(gulp.dest(DEST.zr)) //将会在src/css下生成index.css
        .pipe(minifyCss())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(DEST.zr))
});

gulp.task('less_local', function () {
    gulp.src(CGI.local) //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],//last 5 versions- 主流浏览器的最新两个版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(DEST.zr))//将会在src/css下生成index.css
        .pipe(minifyCss())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(DEST.zr))
});

gulp.task('less_DEV_local', function () {
    gulp.src([CGI.zr,CGI.fontello,CGI.animation,CGI.local]) //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],//last 5 versions- 主流浏览器的最新两个版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(concat("index.css"))
        .pipe(gulp.dest(DEST.zr))//将会在src/css下生成index.css
        .pipe(minifyCss())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(DEST.zr))
});
//复制
gulp.task('fontCopy', function () {
    gulp.src("src/font/font/**/*") //该任务针对的文件
        .pipe(gulp.dest(DEST.font));
});


//
gulp.task("minjs",function(){
    gulp.src(CGI.js)
        .pipe(minifyJs())
        .pipe(gulp.dest(DEST.js))
})
//
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            port:9696,
            open: true,
            open: "./index.html"
        }));
});
//
gulp.task("init",function(){
    //"src/css/**/*.css","src/js/**/*.js",
    //less
    var lessWatcher = gulp.watch(CGI.watchLess,["less"]),
        lessLocalWatcher = gulp.watch(CGI.local,["less_local"]),
        jsMinWatcher = gulp.watch(CGI.js,["minjs"]);

    lessWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
    lessLocalWatcher.on('change',function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
    jsMinWatcher.on("change",function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
})
gulp.task("PRODUCT",["less_local"])
gulp.task('DEV',['init','webserver','fontCopy']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径