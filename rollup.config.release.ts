import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import capitalize from 'lodash.capitalize'

const libraryName = 'catk';

export default {
    entry: `compiled/${libraryName}.js`,
    targets: [
        {dest: 'dist/catk.min.js', moduleName: capitalize(libraryName), format: 'umd'}
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
        include: 'compiled/**',
    },
    plugins: [
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
        uglify()
    ],
}