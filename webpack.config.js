import path from 'path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import EslingPlugin from 'eslint-webpack-plugin';
// import { default as test } from 'node:test';




const baseConfig = {
    entry: path.resolve('./src/index'),
    mode: 'development',
    module: {
        rules: [
            { test: /\.ts$/i, use: 'ts-loader'},
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve('./dist'),
    },
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    
    plugins: [
        new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts'})
    ],
    
};

export default async ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfigModule = isProductionMode ? await import('./webpack.prod.config.js') : await import('./webpack.dev.config.js');
    const envConfig = await envConfigModule.default;

    return merge(baseConfig, envConfig);
};

