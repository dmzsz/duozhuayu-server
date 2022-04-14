const chalk = require('chalk')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = function (options, webpack) {
    return {
        ...options,
        mode: 'development',
        entry: ['webpack/hot/poll?1000', options.entry],
        externals: [
            nodeExternals({
                allowlist: ['webpack/hot/poll?1000'],
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            ...options.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
            new RunScriptWebpackPlugin({ name: options.output.filename }),
            new ProgressBarPlugin({
                format:
                    chalk.hex('#6c5ce7')('build ') +
                    chalk.hex('#0984e3')('▯:bar▯ ') +
                    // chalk.red('▯ :bar ▯ ') +
                    chalk.hex('#00b894')('(:percent) ') +
                    // chalk.green(':percent ') +
                    chalk.hex('#ffeaa7')(':msg'),
                // chalk.blue('( :elapsed s )')
                complete: '▰',
                incomplete: '▱',
                clear: false
            }),
        ],
    }
}