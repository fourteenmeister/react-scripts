#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const execa = require('execa');
const { ALL_TASKS } = require('../scripts/const');
const { script } = require('../scripts/utils');

const args = process.argv.slice(2);

const onSuccess = ({ exitCode }) => {
  console.log(chalk.cyan(`${chalk.bold(script)} script execute successfully`));
  process.exit(exitCode);
};
const onError = ({ exitCode }) => {
  process.exit(exitCode);
};

if (ALL_TASKS.includes(script)) {
  args.unshift(require.resolve('../scripts/run'));
  console.log(chalk.yellow(`${chalk.bold(script)} script executing...`));
  execa(
    'node',
    args,
    { stdio: 'inherit' }
  )
    .then(onSuccess)
    .catch(onError);
} else {
  console.log('Unknown script "' + script + '".');
  console.log('Perhaps you need to update react-scripts?');
  console.log(
    'See: https://facebook.github.io/create-react-app/docs/updating-to-new-releases'
  );
}

