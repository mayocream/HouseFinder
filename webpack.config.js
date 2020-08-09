const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'none',
    entry: {
        map: './src/map.tsx',
        background: './src/background.ts',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, loader: 'ts-loader', exclude: '/node_modules/'},
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './manifest.json'},
            ],
        }),
    ],
}