import path from 'path';
import fs from 'fs';

const currentRoot = () => fs.realpathSync(process.cwd());

const resolveToCurrentRoot = (filePath) =>
  path.resolve(currentRoot(), filePath);

const currentSrc = () => resolveToCurrentRoot('src');
const currentBuild = () => resolveToCurrentRoot('build');
const currentPackageJson = () => resolveToCurrentRoot('package.json');

export {
  resolveToCurrentRoot,
  currentSrc,
  currentBuild,
  currentPackageJson,
  currentRoot,
};
