module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-flow', '@babel/preset-react'],
  env: {
    production: {
      presets: ['react-optimize']
    }
  },
  plugins: [
    'react-hot-loader/babel',
    '@babel/transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./', './src'],
        alias: {
          '~': './',
          assets: './src/assets',
          api: './src/api',
          common: './src/common'
        }
      }
    ]
  ],
  ignore: ['node_modules', 'build']
};
