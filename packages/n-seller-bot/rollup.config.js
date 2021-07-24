import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
	input: pkg.entry,

	plugins: [
		typescript()
	],

  output: [
    {
      file: pkg.main,
      format: 'es',
    },
  ]
}