# 01_helloVitalik.js - Hello Vitalik示例

## 功能描述
这是一个基础的ethers.js示例，演示如何连接到以太坊网络并查询Vitalik Buterin的地址余额。

## 主要功能
- 创建Provider连接到以太坊主网
- 查询Vitalik地址的ETH余额
- 获取当前区块号
- 显示网络信息

## 技术要点
- 使用JsonRpcProvider连接网络
- 使用provider.getBalance()查询余额
- 使用ethers.formatEther()格式化ETH数量
- 使用provider.getBlockNumber()获取区块号
- 使用provider.getNetwork()获取网络信息

## 输出信息
- Vitalik的以太坊地址
- 当前ETH余额
- 当前区块号
- 网络名称和链ID

## 学习价值
- 了解ethers.js的基本用法
- 学习如何连接以太坊网络
- 掌握余额查询的基本操作
- 理解Provider的概念
