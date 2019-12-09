process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.WEBPACK_CONFIG_PATH = process.env.WEBPACK_CONFIG_PATH || 'webpack.config.js';

const execa = require('execa');
const path = require('path');
const webpackMerge = require('webpack-merge');

const { REACT_TASKS } = require('./const');
const { exec, requireModule, script } = require('./utils');

(async () => {
  if (REACT_TASKS.includes(script)) {
    const scriptPath = path.join(
      require.resolve('react-scripts/package.json'),
      '..'
    );

    const webpackConfigPath = `${scriptPath}/config/webpack.config`;
    const webpackConfig = require(webpackConfigPath);
    const customWebpackConfig = requireModule(path.resolve(process.env.WEBPACK_CONFIG_PATH));

    require.cache[require.resolve(webpackConfigPath)].exports = env =>
      webpackMerge(webpackConfig(env), customWebpackConfig);

    require(`${scriptPath}/scripts/${script}`);
  } else {
    switch (script) {
      case 'clean':
        await exec(
          'rimraf',
          ['build'],
        );
        break;
      case 'serve':
        await exec(
          'rimraf',
          ['build'],
        );
        await exec(
          'npm',
          ['run', 'build'],
        );
        await execa(
          'serve',
          ['-s', 'build'],
          { stdio: 'inherit' }
        );
        break;
      default:
        break;
    }
  }
})();
