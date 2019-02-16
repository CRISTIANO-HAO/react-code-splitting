const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin')
const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3333
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'React Code Splitting',
    }),
    // 为了避免每次打包的文件哈希变化，我们可以使用 webpack 内置的 HashedModuleIdsPlugin，这样可以避免每次打包的文件哈希值变化
    new HashedModuleIdsPlugin(), // 根据模块的相对路径生成 HASH 作为模块 ID
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    alias: {
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: false,
      })
    ],
    splitChunks: {
      // 默认配置
      // chunks: 'all',
      // minSize: 30000,
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      // cacheGroups: {
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true
      //   }
      // }
      chunks: 'all', // 默认 async 可选值 all 和 initial
      maxInitialRequests: Infinity, // 一个入口最大的并行请求数
      minSize: 30000, // 避免模块体积过小而被忽略
      minChunks: 1, // 默认也是一表示最小引用次数
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 如果需要的依赖特别小，可以直接设置成需要打包的依赖名称
          name(module, chunks, chcheGroupKey) { // 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取模块名称
            return `npm.${packageName.replace('@', '')}` // 可选，一般情况下不需要将模块名称 @ 符号去除
          }
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: [
        //   {
        //   loader: 'es3ify-loader'
        // }, 
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              // 'react', 'es2015', 'stage-0'
              '@babel/react'
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      ]
    },
    {
      test: /\.(css|less)$/,
      use: [{
        loader: "style-loader"
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: "[local]"
        }
      },
      {
        loader: "less-loader"
      }
      ]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    },
      // {
      //   test: /\.(csv|tsv)$/,
      //   use: [
      //     'csv-loader'
      //   ]
      // },
      // {
      //   test: /\.xml$/,
      //   use: [
      //     'xml-loader'
      //   ]
      // }
    ]
  }
};