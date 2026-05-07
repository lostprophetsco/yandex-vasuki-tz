import gulp from 'gulp';
import del from 'del';
import zipPlugin from 'gulp-zip';

import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';

const zip = async () => {
  del(`./${filePaths.projectDirName}.zip`).then(() =>
    logger.warning('Прошлый ZIP архив успешно удалён'),
  );

  setTimeout(() => {
    return gulp
      .src(`${filePaths.buildFolder}/**/*.*`, {})
      .pipe(logger.handleError('ZIP'))
      .pipe(zipPlugin(`${filePaths.projectDirName}.zip`))
      .pipe(gulp.dest('./'))
      .on('end', () => logger.warning('ZIP архив успешно сгенерирован'));
  }, 1000);
};

export { zip };
