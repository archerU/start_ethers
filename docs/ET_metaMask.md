# ET_metaMask.js - MetaMask钱包连接和操作示例

## 功能描述
演示如何连接和使用MetaMask钱包，包括钱包连接、信息读取、网络切换、消息签名等功能。

## 主要功能
- 检测MetaMask扩展是否安装
- 请求连接MetaMask钱包
- 读取钱包详细信息
- 监听账户和网络变化
- 网络切换功能
- 消息签名功能

## 技术要点
- 使用`window.ethereum`检测MetaMask
- 使用`eth_requestAccounts`请求连接
- 使用`ethers.BrowserProvider`创建Provider
- 使用`provider.getSigner()`获取签名者
- 监听`accountsChanged`和`chainChanged`事件
- 使用`wallet_switchEthereumChain`切换网络
- 使用`signer.signMessage()`签名消息

## 输出信息
- MetaMask安装状态
- 钱包连接状态
- 钱包地址和余额
- 网络信息（名称、链ID）
- Gas费用信息
- 当前区块号
- 交易数量
- 签名结果

## 使用方法
1. 确保浏览器已安装MetaMask扩展
2. 运行此文件
3. 在弹出的MetaMask窗口中确认连接
4. 查看控制台输出的钱包信息

## 注意事项
- 需要用户手动确认连接请求
- 需要用户手动确认签名操作
- 网络切换可能需要用户确认
- 某些功能需要用户授权

## 学习价值
- 学习Web3钱包集成
- 掌握MetaMask API使用
- 理解钱包连接流程
- 学习事件监听机制
- 掌握消息签名操作
