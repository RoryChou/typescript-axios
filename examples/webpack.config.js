const fs = require('fs')
const path = require('path')
const webpack = require('webpack')


module.exports = {
  mode: "development",

  /**
   * 多入口
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同子目录下
   * 每个子目录会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   * */
  // fixme 没看懂，这块entry对象最后的值为啥是数组?
  //{ simple:
  //    [ 'webpack-hot-middleware/client',
  //      'E:\\project\\study\\ts-axios-doc\\typescript-library-starter\\example
  // s\\simple\\app.ts' ] }
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  /**
   * 根据不同的目录名称，打包生成目标js，名称和目录名一致
   * */
  // fixme 没看懂，__build__这是啥
  output: {
    path: path.join(__dirname, '__build__'),
    filename: "[name].js",
    publicPath: "/__build__/"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        // fixme 这是啥
        enforce: "pre",
        use: [
          {
            loader: "tslint-loader"
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]

      }
    ]
  },
  // fixme 补充解析文件类型？
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}