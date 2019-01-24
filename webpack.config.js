const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Phaser webpack config
var phaser;
const testMode = process.env.testmode || false;
if (!testMode) {
    var phaserModule = path.join(__dirname, '/node_modules/phaser/')
    phaser = path.join(phaserModule, 'src/phaser.js')
} else {
    var phaserModule = path.join(__dirname, '/../rex-phaser/')
    phaser = path.join(phaserModule, 'src/phaser.js')
}

const projectMain = process.env.main;
const assetsFolder = process.env.assets;
const htmlTemplate = process.env.htmltemplate || './examples/index.html';

module.exports = {
    mode: 'development',
    entry: {
        app: [
            '@babel/polyfill',
            projectMain
        ],
        vendor: ['phaser']
    },
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
            CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: htmlTemplate,
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './build']
            }
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            // 'rexPlugins': path.resolve(__dirname, 'plugins/'),
            // 'rexTemplates': path.resolve(__dirname, 'templates/'),
        }
    }
}