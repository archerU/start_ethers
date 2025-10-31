const path = require("path");
const { generateEntryConfig } = require("./webpack-selector");

// 获取文件描述
function getFileDescription(filename) {
    const descriptions = {
        '00_config.js': '配置使用',
        '01_HelloVitalik.js': '查询余额',
        '02_Provider.js': 'Provider',
        '03_ReadContract.js': '读取合约',
        '04_SendETH.js': '发送ETH',
        '05_WriteContract.js': '写入合约',
        '06_DeployContract.js': '部署合约',
        '07_Event.js': '监听事件',
        '08_ContractListener.js': '合约监听',
        '09_EventFilter.js': '事件过滤',
        '10_Units.js': '单位转换',
        '11_staticCall.js': '静态调用',
        '12_ERC721Check.js': 'ERC721',
        '13_EncodeCalldata.js': '编码数据',
        '14_HDwallet.js': 'HD钱包',
        '15_MultiTransfer.js': '批量转账',
        '16_MultiCollect.js': '批量收集',
        '17_MerkleTree.js': 'Merkle树',
        '18_Signature.js': '签名',
        '19_Mempool.js': '内存池',
        '20_DecodeTx.js': '解析交易',
        '21_VanityAddress.js': '靓号地址',
        '22_ReadAnyData.js': '读取数据',
        '23_Frontrun.js': '抢先交易',
        '24_ERC20Check.js': 'ERC20',
        '25_Flashbots.js': 'Flashbots',
        '26_EIP712.js': 'EIP712',
        '27_CreationChecker1.js': '创建检测1',
        '28_CreationChecker2.js': '创建检测2',
        'ET_Metamask.js': 'MetaMask',
        'ET02_SignInWithEthereum.js': 'SIWE'
    };
    
    return descriptions[filename] || filename;
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
      },
      {
        directory: path.join(__dirname, "contracts"),
        publicPath: "/contracts",
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
              const description = getFileDescription(file);
              return { name, description };
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
    alias: {
      "@contracts": path.resolve(__dirname, "contracts")
    },
    extensions: ['.js', '.json'],
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
  experiments: {
    asset: true,
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        type: 'json',
      }
    ]
  },
  plugins: [
    new (require("webpack")).ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser"
    })
  ]
}