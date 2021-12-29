const path = require('path');

module.exports = {
  entry: './src/wordsearch.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'//,
        //exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'wordsearch_all.js',
    path: path.resolve(__dirname, 'dist'),
  },
};