import gulp from 'gulp';
import webpack from 'webpack-stream';

import { webpackConfig } from '../../webpack.config.js';
import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';

const javascript = (isDev, serverInstance) => {
  return gulp
    .src(filePaths.src.js)
    .pipe(logger.handleError('JS'))
    .pipe(webpack({ config: webpackConfig(isDev) }))
    .pipe(gulp.dest(filePaths.build.js))
    .pipe(serverInstance.stream());
};

export { javascript };
