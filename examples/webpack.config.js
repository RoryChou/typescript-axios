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
  // 当你向 entry 传入一个数组时会发生什么？
  // 向 entry 属性传入文件路径数组，将创建出一个 多主入口(multi-main entry)。
  // 在你想要一次注入多个依赖文件，并且将它们的依赖导向(graph)到一个 chunk 时，这种方式就很有用。
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
  // 这个是devserver的publicPath
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader','css-loader'
        ]
      }
    ]
  },
  // fixme 补充解析文件类型？
  // 补充webpack解析文件的类型，没有明确文件后缀的时候用的
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
