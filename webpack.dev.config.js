const path = await import('path');


export default {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve('./dist'),
    },
};
