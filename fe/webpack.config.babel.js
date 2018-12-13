import path from 'path';
import _ from 'lodash';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { EnvironmentPlugin, IgnorePlugin, ProvidePlugin } from 'webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import autoprefixer from 'autoprefixer';
import moment from 'moment';

export default (env = {}, argv) => {
  const { analyze, open, production } = env;
  const isProd = production;
  const mode = isProd ? 'production' : 'development';
  const startServer = /dev-server$/.test(argv.$0);
  const profile = analyze || (!isProd && !startServer);
  const timestamp = moment().format('YYYYMMDDHHmmss');

  const origins = {
    user: 'http://localhost:9400'
  };

  const devServer = startServer
    ? {
        devServer: {
          compress: true,
          contentBase: 'dist/assets',
          historyApiFallback: true,
          host: 'localhost',
          open,
          port: 4000,
          quiet: false
        }
      }
    : {};

  const globals = {
    _: 'lodash'
  };

  const indexHtmlConfig = {
    title: 'HACKERMAN',
    template: './src/index.htm',
    filename: 'index.html',
    inject: 'body'
  };

  const fontRule = {
    test: /\.(eot|svg|ttf|woff2?)(\?.+)?$/,
    loader: 'url-loader',
    options: {
      name: 'assets/fonts/[name].[ext]',
      limit: 8192
    }
  };

  const imageRule = {
    test: /\.(ico|gif|jpe?g|png)(\?.+)?$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/[name].[ext]'
        }
      },
      'image-webpack-loader'
    ]
  };

  const jsRule = {
    test: /\.jsx?$/,
    exclude: /node_modules\/(?!gnar-edge)/,
    use: 'babel-loader'
  };

  const scssLoaders = [
    'style',
    'css',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [autoprefixer]
      }
    },
    'resolve-url',
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['./src']
      }
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: './src/css/*'
      }
    }
  ].map(loader => _.set(_.isObject(loader) ? loader : { loader: `${loader}-loader` }, 'options.sourceMap', !isProd));

  if (isProd) {
    scssLoaders[0] = MiniCssExtractPlugin.loader;
  }

  const scssRule = {
    test: /\.s?css$/,
    use: scssLoaders
  };

  const txtRule = {
    test: /\.(md|txt)$/,
    use: 'raw-loader'
  };

  const plugins = [
    new EnvironmentPlugin({
      NODE_ENV: mode,
      ORIGINS: JSON.stringify(startServer ? origins : {})
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/logo.png',
      prefix: 'assets/icons/'
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ProvidePlugin(globals),
    new HtmlWebpackPlugin(indexHtmlConfig)
  ];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        chunkFilename: '[id].css',
        filename: isProd ? `[name].${timestamp}.css` : '[name].[hash].css'
      })
    );
  }

  if (profile) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  const cacheGroup = (memo, dep, idx, deps) => {
    const name = dep.replace(/@/, '');
    // eslint-disable-next-line no-param-reassign
    memo[name] = {
      test: RegExp(`[\\/]node_modules[\\/]${dep === 'vendor' ? `(?!(${deps.join('|')}))` : dep}`),
      name,
      chunks: 'initial',
      minSize: 0,
      minChunks: 1,
      enforce: true
    };
  };

  return {
    ...devServer,
    devtool: isProd ? 'source-map' : 'inline-source-map',
    entry: {
      main: './src'
    },
    mode,
    module: {
      rules: [fontRule, imageRule, jsRule, scssRule, txtRule]
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: !isProd
        })
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: _.transform(['@material-ui', 'moment', 'react', 'vendor'], cacheGroup, {})
      }
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? `[name].${timestamp}.js` : '[name].[hash].bundle.js',
      chunkFilename: isProd ? `[name].${timestamp}.js` : '[name].[chunkhash].bundle.js',
      publicPath: '/'
    },
    performance: {
      maxAssetSize: 512000,
      maxEntrypointSize: 1048576
    },
    plugins,
    profile,
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src/'),
        common: path.resolve(__dirname, './src/common/'),
        assets: path.resolve(__dirname, './src/assets/')
      },
      extensions: ['.js', '.jsx']
    }
  };
};
