const path = require("path");
const { generateEntryConfig } = require("./webpack-selector");

// 获取文件描述
function getFileDescription(filename) {
    const descriptions = {
        '01_HelloVitalik.js': '查询 Vitalik 地址余额和网络信息',
        '02_Provider.js': 'Provider 功能全面示例（网络、区块、余额、Gas）'
    };
    return descriptions[filename] || 'Ethers.js 示例文件';
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
      }
    ],
    compress: true,
    port: 8080,
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