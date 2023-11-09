const path = require('path');
const HtmlWebbpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, './src/app/index.js'),
        details: path.resolve(__dirname, './src/app/movie-detail.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[contenthash].js',
        clean: true,
    },
    devServer: {
        static:  {
            directory: path.resolve(__dirname, 'dist'),
        },
        // port: 3000,
        compress: true,
        open: false,
        hot: false,
        // liveReload: false,
        historyApiFallback: {
            index: '/movies.html',
        },
        //Kan sätta 
        // watchFiles: {
        //     path: ["src/**/*"],//Glob pattern matas in här
        //     options: {
        //         polling: false
        //     },
        // },
    },
    module: {
        rules: [
            {
                // test: /\.scss$/,
                test: /.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader", //3. här laddas css: en in i DOM
                    "css-loader", // 2. nu placeras css filen/filerna i html-dokumentet
                    "sass-loader" //1. om vi hittar några scss filer kompileras de till css
                ], 
            },
        ]
    },
    /*Filen heter movies.html och template är
    den sökvägen för filename. template = "du ska använda den här html-filen
    som ligger i denna sökväg/path som mall för den filen"*/
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
        }),
        new HtmlWebbpackPlugin({
        filename: 'movies.html',
        template: './src/app/movies.html',
        inject: true,
        chunks: ["index"],
        }),
        new HtmlWebbpackPlugin({
        filename: 'movie-details.html',
        template: './src/app/movie-details.html',
        inject: true,
        chinks: ["details"],
        })
    ],
};