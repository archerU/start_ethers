# 25_Flashbots.js - Flashbots交易

## 功能描述
演示如何使用Flashbots服务发送MEV（最大可提取价值）交易，避免被抢先交易。

## 主要功能
- 连接Flashbots服务
- 创建Flashbots Provider
- 发送Flashbots交易
- 处理交易状态

## 技术要点
- 使用`@flashbots/ethers-provider-bundle`库
- 使用`FlashbotsBundleProvider.create()`创建Provider
- 使用`flashbotsProvider.sendBundle()`发送交易
- 处理bundle状态

## 输出信息
- Flashbots连接状态
- Bundle详情
- 交易哈希
- Bundle执行状态

## 使用方法
1. 创建普通Provider
2. 创建Flashbots Provider
3. 准备交易bundle
4. 发送bundle
5. 检查执行状态

## 注意事项
- 需要Flashbots账户
- 需要声誉私钥
- 测试网和主网URL不同
- 交易可能不被包含

