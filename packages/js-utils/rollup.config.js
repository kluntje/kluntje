import pkg from './package.json';
import { generateRollupConfig } from '../../rollup.lerna';

export default Object.values(pkg.exports).map(mapping => {
  const inputPath = mapping.require
    // replace the "./lib" from the output path to "./src" for the input path
    .replace(/^\.\/lib/, './src')
    // sub modules have a /sub-module.ts entry and not sub-module/index.ts
    // i.e. for output: lib/function-helpers/decorators/index.js -> input: ./src/function-helpers/decorators.ts
    .replace(/(\/.+\/.+\/.+)(\/index)\.js/, "$1.js")

    // replace the ".js" extension from the output path, with ".ts" for the src path
    .replace(/.js$/, '.ts');

  return generateRollupConfig(
    {
      main: mapping.require,
      module: mapping.import,
      dependencies: pkg.dependencies,
    },
    inputPath,
   );
});
