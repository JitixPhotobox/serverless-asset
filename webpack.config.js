// const path = require('path');
// const slsw = require('serverless-webpack');
// const nodeExternals = require('webpack-node-externals');

// module.exports = {
//   entry: slsw.lib.entries,
//   target: 'node',
//   mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
//   optimization: {
//     minimize: false
//   },
//   performance: {
//     hints: false
//   },
//   devtool: 'source-map',
//   externals: [nodeExternals()],
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'babel-loader'
//           }
//         ],
//       }
//     ]
//   },
//   output: {
//     libraryTarget: 'commonjs2',
//     path: path.join(__dirname, '.webpack'),
//     filename: '[name].js',
//     sourceMapFilename: '[file].map'
//   }
// };
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const externals = {};
fs.readdirSync('node_modules')
  .filter(item => ['.bin'].indexOf(item) === -1)  // exclude the .bin folder
  .forEach((mod) => {
    externals[mod] = `commonjs ${mod}`;
  });
if (process.env.NODE_ENV === 'production') externals.push('aws-sdk');

const lambdaFunctions = {
  entry: {
    asset: ['babel-polyfill', './src/asset.js'],
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js',
    libraryTarget: "commonjs2",
    publicPath: ''
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(node)$/,
      use: 'node-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './serverless.yml'),
      to: path.resolve(__dirname, './lib')
    }])
  ],
  target: 'node',
  externals
};

module.exports = lambdaFunctions;