const path = require('path');
const outputDir = path.resolve(__dirname, './public/assets/js/');

module.exports = {
  entry: path.resolve(__dirname, 'src/assets/js/index.js'),
  output: {
    path: outputDir,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
