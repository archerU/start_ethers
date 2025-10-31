# 14_HDwallet.js - HD钱包

## 功能描述
演示如何创建和使用分层确定性（HD）钱包，包括助记词生成、钱包派生和加密存储。

## 主要功能
- 生成随机助记词
- 创建HD钱包
- 派生多个子钱包
- 加密和导入钱包

## 技术要点
- 使用`ethers.Mnemonic.entropyToPhrase()`生成助记词
- 使用`ethers.HDNodeWallet.fromPhrase()`创建HD钱包
- 使用`derivePath()`派生子钱包
- 使用`wallet.encrypt()`加密钱包
- 使用`ethers.Wallet.fromEncryptedJson()`导入钱包

## 输出信息
- 生成的助记词
- HD钱包信息
- 派生的子钱包地址
- 加密的钱包JSON
- 导入的钱包信息

## 使用方法
1. 生成随机助记词
2. 创建HD基钱包
3. 派生多个子钱包
4. 加密钱包为JSON
5. 从JSON导入钱包

## 注意事项
- 助记词需要安全保存
- 派生路径需要正确设置
- 加密密码需要牢记
- 私钥不能泄露

