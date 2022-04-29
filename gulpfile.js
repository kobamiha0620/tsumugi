'use strict';


// import plumber from "gulp-plumber";
// import notify from "gulp-notify";
// import browserSync from "browser-sync";
// import postcss from "gulp-postcss";

// import cssdeclsort from "css-declaration-sorter";
// import imagemin from "gulp-imagemin";
// import optipng from "imagemin-optipng";
// import mozjpeg from "imagemin-mozjpeg";
// import ejs from "gulp-ejs";
// import rename from "gulp-rename";
const { gulp, src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpDartSass = require('gulp-dart-sass');
const sassGlob = require('gulp-sass-glob-use-forward');
const autoprefixer = require('gulp-autoprefixer');

function buildStyles() {
  return src('./src/scss/*.scss')
  .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulpDartSass())
    .pipe(autoprefixer()) //prefix
    .pipe(dest('./20220509/assets/'))
};


const pathsIMG = {
    srcDir : 'images/base',
    dstDir : 'images/'
  }

function imagesCompression(){
    const srcGlob = pathsIMG.srcDir + '*.+(jpg|jpeg|png|gif|svg)';
    const dstGlob = pathsIMG.dstDir;

    return src( srcGlob )
        .pipe(changed( dstGlob ))
        .pipe(imagemin( imageminOptions ))
        .pipe(dest( dstGlob ))
        
        .pipe(notify({
            title: '画像を圧縮しました。',
            message: new Date(),
            sound: 'Tink'
        }));
}




exports.buildStyles = buildStyles;

exports.watch = function () {
  watch('./src/scss/**/*.scss', buildStyles);
  watch('images/base/*.+(jpg|jpeg|png|gif|svg)', imagesCompression);

};