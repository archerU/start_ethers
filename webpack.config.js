const path = require("path");
const { generateEntryConfig } = require("./webpack-selector");

// 获取文件描述
function getFileDescription(filename) {
    return filename; // 直接返回文件名，不添加描述
}

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    ...generateEntryConfig(),
    selector: "./webpack-selector.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
    library: {
      type: "umd",
      name: "[name]"
    }
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "public"),
      },
      {
        directory: path.join(__dirname, "dist"),
        publicPath: "/",
      },
      {
        directory: path.join(__dirname, "src"),
        publicPath: "/src",
      },
      {
        directory: path.join(__dirname, "docs"),
        publicPath: "/docs",
      }
    ],
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    setupMiddlewares: (middlewares, devServer) => {
      // 添加API中间件来提供文件列表
      devServer.app.get('/api/files', (req, res) => {
        const fs = require('fs');
        const srcDir = path.join(__dirname, 'src');
        
        try {
          const files = fs.readdirSync(srcDir)
            .filter(file => file.endsWith('.js'))
            .sort()
            .map(file => {
              const name = file;
              const desc = getFileDescription(file);
              return { name, desc };
            });
          
          res.json(files);
        } catch (error) {
          res.status(500).json({ error: 'Failed to read src directory' });
        }
      });
      
      return middlewares;
    }
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util"),
      "fs": false,
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  plugins: [
    new (require("webpack")).ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser"
    })
  ]
}