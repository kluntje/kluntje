const pkg = require('./package.json');
import { generateRollupConfig } from '../../rollup.lerna';

const bundles = {
  index: {
    inputPath: './src/index.ts',
    outFiles: {
      main: './lib/index.js',
      module: './lib/index.mjs',
    },
  },
  apiHelpers: {
    inputPath: './src/api-helpers/index.ts',
    outFiles: {
      main: 'lib/api-helpers/index.js',
      module: 'lib/api-helpers/index.mjs',
    },
  },
  arrayHelpers: {
    inputPath: './src/array-helpers/index.ts',
    outFiles: {
      main: 'lib/array-helpers/index.js',
      module: 'lib/array-helpers/index.mjs',
    },
  },
  dateHelpers: {
    inputPath: './src/date-helpers/index.ts',
    outFiles: {
      main: 'lib/date-helpers/index.js',
      module: 'lib/date-helpers/index.mjs',
    },
  },
  domHelpers: {
    inputPath: './src/dom-helpers/index.ts',
    outFiles: {
      main: 'lib/dom-helpers/index.js',
      module: 'lib/dom-helpers/index.mjs',
    },
  },
  functionHelpers: {
    inputPath: './src/function-helpers/index.ts',
    outFiles: {
      main: 'lib/function-helpers/index.js',
      module: 'lib/function-helpers/index.mjs',
    },
  },
  "functionHelpers/decorators": {
    inputPath: './src/function-helpers/decorators.ts',
    outFiles: {
      main: 'lib/function-helpers/decorators/index.js',
      module: 'lib/function-helpers/decorators/index.mjs',
    },
  },
  objectHelpers: {
    inputPath: './src/object-helpers/index.ts',
    outFiles: {
      main: 'lib/object-helpers/index.js',
      module: 'lib/object-helpers/index.mjs',
    },
  },
  stringHelpers: {
    inputPath: './src/string-helpers/index.ts',
    outFiles: {
      main: 'lib/string-helpers/index.js',
      module: 'lib/string-helpers/index.mjs',
    },
  },
};

const getConfig = target => {
  return generateRollupConfig(
    {
      main: bundles[target].outFiles.main,
      module: bundles[target].outFiles.module,
      dependencies: pkg.dependencies,
    },
    bundles[target].inputPath,
  );
};

module.exports = getConfig(process.env.TARGET);
