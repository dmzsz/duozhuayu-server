
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const chalk = require('chalk')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: ['webpack/hot/poll?1000', './src/main.ts'],
    target: 'node',
    externals: [
        nodeExternals({
            allowlist: ['webpack/hot/poll?1000'],
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        new RunScriptWebpackPlugin({ name: 'server.js' }),
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
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerHost: '127.0.0.1',
            analyzerPort: '8888',
            reportFilename: process.env.NODE_ENV === 'development' && 'report.html',
            openAnalyzer: false,
            generateStatsFile: false,
            statsFilename: 'stats.json'
        }),
        // new webpack.BannerPlugin({
        //     banner: 'require("source-map-support").install()',
        //     raw: true,
        //     entryOnly: false
        // }),
    ],
    // optimization: {
    //     removeAvailableModules: false,
    //     removeEmptyChunks: false,
    //     splitChunks: false
    // },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
        // clean: true,
    },
}