const chalk = require('chalk');
const execa = require('execa');


const { ALL_TASKS } = require('../scripts/const');

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
  x => ALL_TASKS.includes(x)
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];

const catchError = error => {
  console.error(chalk.red(`error ${chalk.bold(script)} script:\n`), error);
  process.exit(1);
};

const exec = async (command, args = [], options = { stdio: 'inherit' }) => {
  try {
    return await execa(command, args, options);
  } catch (error) {
    catchError(error);
  }
};

const requireModule = (path, defaultValue) => {
  try {
    return require(path);
  } catch (e) {
    return defaultValue;
  }
};

module.exports = {
  catchError,
  requireModule,
  exec,
  script,
};
