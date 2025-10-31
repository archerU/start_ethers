# 06_DeployContract.js - 部署智能合约

## 功能描述
演示如何使用ethers.js创建合约工厂并部署智能合约到以太坊网络。

## 主要功能
- 创建合约工厂（ContractFactory）
- 部署智能合约
- 等待合约部署上链
- 调用部署后的合约方法
- 获取合约地址和部署状态

## 技术要点
- 使用`ethers.ContractFactory`创建合约工厂
- 使用`contractFactory.deploy()`部署合约
- 使用`contract.waitForDeployment()`等待部署
- 使用`contract.target`获取合约地址
- 处理部署过程中的错误和gas费用

## 输出信息
- 合约部署状态
- 合约地址
- 部署交易的详细信息
- 合约方法调用结果

## 使用方法
1. 准备合约ABI和字节码
2. 创建Provider和Wallet
3. 使用ContractFactory创建工厂实例
4. 调用deploy()方法部署合约
5. 等待部署完成
6. 获取合约地址并调用方法

## 注意事项
- 需要足够的ETH支付gas费用
- 字节码需要完整的部署字节码
- 构造函数参数需要正确传递
- 部署时间取决于网络拥堵情况

