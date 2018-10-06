import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ChromeExtensionReloader from 'webpack-chrome-extension-reloader';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import path from 'path';

const { NODE_ENV = 'development' } = process.env;

const base = {
  context: __dirname,
  entry: {
    background: path.resolve(__dirname, 'src/background/index.js'),
    content: path.resolve(__dirname, 'src/content/index.js'),
    popup: path.resolve(__dirname, 'src/popup/index.js'),
  },
  output: {
    path: path.join(__dirname, 'extension/dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$|.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src/manifest.json',
        to: './manifest.json',
      },
      {
        from: 'src/icons',
        to: 'icons',
      },
    ]),
    new HtmlWebpackPlugin({
      title: 'popup',
      hash: true,
      cache: true,
      inject: 'body',
      template: 'build-utils/page.ejs',
      appMountId: 'app',
      chunks: ['popup'],
    }),
    new VueLoaderPlugin(),
  ],
};

const development = {
  ...base,
  mode: 'development',
  devtool: '#eval-module-source-map',
  module: {
    ...base.module,
  },
  plugins: [
    ...base.plugins,
    new ChromeExtensionReloader({
      reloadPage: true,
    }),
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/,
    }),
  ],
  devServer: {
    inline: false,
  },
};

const production = {
  ...base,
  mode: 'production',
  devtool: '#source-map',

  plugins: [
    ...base.plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = development;
} else {
  module.exports = production;
}
