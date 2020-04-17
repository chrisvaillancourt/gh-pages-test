import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: {
    file: 'src/bundle/bundle.js',
    format: 'es',
  },
  plugins: [
    resolve(),
    babel({
      exclude: ['node_modules/**', 'docs/**'],
    }),
    terser(),
    postcss({
      plugins: [],
      minimize: true,
      extract: true,
    }),
  ],
};
