var path = require('path');

module.exports = {
  resolve: {
    modules: ['node_modules', 'es2015'],
  },
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js'
  }
};