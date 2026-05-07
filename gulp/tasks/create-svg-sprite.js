import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';

const createSvgSprite = () => {
  return gulp
    .src(filePaths.src.svgIcons, {})
    .pipe(logger.handleError('COPY ROOT FILES'))
    .pipe(
      svgSprite({
        mode: {
          defs: {
            sprite: '../sprite.svg',
            bust: false,

            /** Создавать страницу с перечнем иконок */
            example: false,
          },
        },
      }),
    )
    .pipe(gulp.dest(filePaths.srcFolder + '/images'));
};

export { createSvgSprite };
