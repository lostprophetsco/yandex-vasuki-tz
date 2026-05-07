import gulp from 'gulp';
import merge from 'merge-stream';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'; // оптимизирует изображения
import pngQuant from 'imagemin-pngquant'; // оптимизирует png изображения
import webp from 'gulp-webp'; // создает webp файлы
import avif from 'gulp-avif'; // создает avif файлы

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';

const images = (isBuild, serverInstance) => {
  const imageOpt = gulp
    .src(filePaths.src.images)
    .pipe(logger.handleError('IMAGES-MIN'))
    .pipe(plugins.newer(filePaths.build.images))
    .pipe(
      plugins.if(
        isBuild,
        imagemin([
          gifsicle({
            interlaced: true, // чересстрочная загрузка изображения
          }),
          optipng({
            optimizationLevel: 5, // уровень оптимизации png файла
          }),
          pngQuant({
            quality: [0.8, 0.9], // уровень оптимизации png файла
          }),
          mozjpeg({
            quality: 80, // уровень оптимизации jpg файла
            progressive: true, // чересстрочная загрузка изображения
          }),
          svgo({
            plugins: [
              { cleanupIds: true }, // удаляет неиспользуемые id
              { removeUselessDefs: true }, // удаляет <defs>
              { removeViewBox: true }, // удаляет атрибут viewBox
              { removeComments: true }, // удаляет комментарии
              // { inlineStyles: { removeMatchedSelectors: false, onlyMatchedOnce: false } }, // оставляет стили в теге style
              { mergePaths: true }, // объединяет несколько путей в один
              { minifyStyles: false }, // не удаляет @keyframes из тега style
            ],
          }),
        ]),
      ),
    )
    .pipe(gulp.dest(filePaths.build.images))
    .pipe(gulp.src(filePaths.src.svg))
    .pipe(gulp.dest(filePaths.build.images))
    .pipe(serverInstance.stream());

  const imageWebp = gulp
    .src(filePaths.src.images)
    .pipe(logger.handleError('IMAGES-WEBP'))
    .pipe(plugins.newer(filePaths.build.images))
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest(filePaths.build.images))
    .pipe(serverInstance.stream());

  const imageAvif = gulp
    .src(filePaths.src.images)
    .pipe(logger.handleError('IMAGES-AVIF'))
    .pipe(plugins.newer(filePaths.build.images))
    .pipe(avif({ quality: 85 }))
    .pipe(gulp.dest(filePaths.build.images))
    .pipe(serverInstance.stream());

  return merge(imageOpt, imageWebp, imageAvif);
};

export { images };
