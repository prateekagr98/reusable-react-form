
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';
import postcss from 'rollup-plugin-postcss'
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

const extensions = ['.js', '.jsx'];
const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});
const defaultExternal = deps.concat(peerDeps);

module.exports = {
  input: 'components/build_entry.js',
  external: defaultExternal,
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve({ extensions }),
    commonjs({
      include: '**/node_modules/**',
      namedExports: {},
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    postcss({
      plugins: []
    }),
    terser(),
    cleanup()
  ]
};