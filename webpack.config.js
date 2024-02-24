import path from 'path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
// import { default as test } from 'node:test';

const baseConfig = {
    entry: path.resolve('./src/index.js'),
    mode: 'development',
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
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
    ],
};

export default async ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfigModule = isProductionMode ? await import('./webpack.prod.config.js') : await import('./webpack.dev.config.js');
    const envConfig = await envConfigModule.default;

    return merge(baseConfig, envConfig);
};

