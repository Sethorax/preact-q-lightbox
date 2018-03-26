const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

/**
 * WEBPACK CONFIG
 */
module.exports = env => {
    return {
        entry: {
            'preact-q-lightbox': (env === 'production') ? './src/index.js' : './build/entry.js',
            styles: './src/styles.scss'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: new RegExp(`node_modules`),
                    use: {
                        loader: 'babel-loader'
                    }
                }, {
                    test: /\.(css|sass|scss)$/,
                    exclude: /(bower_components)/,
                    use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: (env === 'dev')
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: (env === 'dev'),
                            minimize: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: (env === 'dev')
                        }
                    }]
                }
            ]
        },
        mode: (env === 'dev') ? 'development' : 'production',
        plugins: [],
        externals: (env === 'dev') ? {} : nodeExternals(),
        resolve: {
            extensions: ['.js', '.jsx']
        },
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: path.resolve('./dist')
        }
    };
};