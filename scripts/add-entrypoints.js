/* eslint-disable */
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const PACKAGE_ROOT = path.resolve(__dirname, '../');
const DEFAULT_ENTRYPOINTS_FOLDER = `${PACKAGE_ROOT}/entrypoints`;

const files = glob.sync(`${DEFAULT_ENTRYPOINTS_FOLDER}/*.*`, {
  cwd: __dirname,
});

const ENTRYPOINTS_FOLDER = `${PACKAGE_ROOT}/src/entrypoints`;

fs.removeSync(ENTRYPOINTS_FOLDER);
fs.ensureDirSync(ENTRYPOINTS_FOLDER);

const replaceFrom = new RegExp("'../src/", 'g');

files.forEach(file => {
  const fileName = path.basename(file);
  const fileContent = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(`${ENTRYPOINTS_FOLDER}/${fileName}`, fileContent.replace(replaceFrom, "'../"));
});
