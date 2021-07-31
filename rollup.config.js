import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: 'inline',
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: 'inline',
      },
    ],
    plugins: [
      json(),
      typescript(),
      commonjs({
        exclude: 'node_modules',
        extensions: ['.js', '.ts']
      }),
      resolve({
        browser: false
      }),
    ],
    onwarn(warning, rollupWarn) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        rollupWarn(warning);
      }
    }
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
      },
    ],
    plugins: [dts()]
  }
]
