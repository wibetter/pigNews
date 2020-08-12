const fs = require('fs');
const path = require('path');

const { resolveToCurrentRoot } = require('build/utils/pathUtils');

module.exports = () => {
  const jsEntries = {};
  const pagesDir = resolveToCurrentRoot('./src/pages');
  fs.readdirSync(pagesDir)
    .filter((p) => p.match(/\.[tj]sx?$/))
    .map((p) => path.join(pagesDir, p))
    .forEach((p) => {
      const entryName = path.basename(p).replace(/\.[tj]sx?$/, '');
      jsEntries[entryName] = p;
    });
  return jsEntries;
};
