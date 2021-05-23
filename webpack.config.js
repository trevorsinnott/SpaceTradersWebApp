const path = require('path');
const sass = require('sass');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isEnvProduction = argv.mode === 'production';
  const isEnvDevelopment = argv.mode === 'development';

  return {
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isEnvDevelopment ? 'inline-source-map' : undefined,
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      compress: true,
      hot: true,
      open: true,
      port: 3000,
    },
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      pathinfo: isEnvDevelopment,
      path: path.resolve(__dirname, 'build'),
      filename: isEnvProduction
        ? 'scripts/[name].[contenthash:8].js'
        : isEnvDevelopment && 'scripts/[name].bundle.js',
      chunkFilename: isEnvProduction
        ? 'scripts/[name].[contenthash:8].chunk.js'
        : 'scripts/[name].chunk.js',
      publicPath: isEnvProduction
        ? `/${require(path.resolve('package.json')).name}/`
        : undefined,
    },
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[contenthash:base64:5]',
                },
                importLoaders: 1,
                sourceMap: isEnvDevelopment,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isEnvDevelopment,
                postcssOptions: {
                  plugins: [require('autoprefixer')],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isEnvDevelopment,
                implementation: sass,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                sourceMap: isEnvDevelopment,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isEnvDevelopment,
                postcssOptions: {
                  plugins: [require('autoprefixer')],
                },
              },
            },
            // Compiles Sass to CSS
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isEnvDevelopment,
                implementation: sass,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/i,
          use: ['file-loader'],
        },
      ],
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: isEnvDevelopment,
            keep_fnames: isEnvDevelopment,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          minify: (file, sourceMap) => {
            // https://github.com/mishoo/UglifyJS2#minify-options
            const uglifyJsOptions = {
              /* your `uglify-js` package options */
            };

            if (sourceMap) {
              uglifyJsOptions.sourceMap = {
                content: sourceMap,
              };
            }

            return require('uglify-js').minify(file, uglifyJsOptions);
          },
        }),
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: {
        name: (entryPoint) => `runtime-${entryPoint.name}`,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        publicUrl: isEnvProduction
          ? `/${require(path.resolve('package.json')).name}/`
          : '/',
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new Dotenv({
        path: isEnvDevelopment
          ? './.env.development.local'
          : './.env.production.local', // load this now instead of the ones in '.env'
        safe: false, // If true, load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        allowEmptyValues: true, // Whether to allow empty strings in safe mode. If false, will throw an error if any env variables are empty (but only if safe mode is enabled).
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: false, // load '.env.defaults' as the default values if empty.
      }),
      ...(isEnvProduction
        ? [
            new CopyPlugin({
              patterns: [
                {
                  from: path.resolve(__dirname, 'public'),
                  globOptions: {
                    ignore: [
                      // Ignore all `html` files
                      '**/*.html',
                      // Ignore all files in all subdirectories
                      // '**/subdir/**',
                    ],
                  },
                },
              ],
            }),
          ]
        : []),
    ],
  };
};
