import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from 'rollup-plugin-babel';
import path from 'path';
import { terser } from 'rollup-plugin-terser';
export const generateRollupConfig = (pkg, inputPath) => ({
  input: inputPath, // our source file
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es', // the preferred format
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: [
                'last 2 firefox versions',
                'last 2 chrome versions',
                'last 2 and_chr versions',
                'last 2 safari versions',
                'last 2 ios_saf versions',
                'last 2 edge versions',
              ],
            },
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true,
          },
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: false,
            regenerator: true,
            useESModules: true,
            helpers: false,
            absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
          },
        ],
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-transform-classes', { loose: true }],
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
      ],
    }),
    terser(), // minifies generated bundles
  ],
});
