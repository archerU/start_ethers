# 17_MerkleTree.js - Merkle树

## 功能描述
演示如何使用Merkle树实现白名单验证，包括生成Merkle树、获取证明和部署合约。

## 主要功能
- 生成Merkle树
- 计算叶子节点哈希
- 获取Merkle证明
- 使用Merkle树验证白名单
- 部署带Merkle根的合约

## 技术要点
- 使用`merkletreejs`库创建Merkle树
- 使用`ethers.keccak256()`计算哈希
- 使用`merkleTree.getHexProof()`获取证明
- 使用`merkleTree.getHexRoot()`获取根
- 部署NFT合约并传入Merkle根

## 输出信息
- 叶子节点列表
- Merkle树结构
- 证明路径
- Merkle根
- 合约部署信息

## 使用方法
1. 准备白名单地址列表
2. 生成Merkle树
3. 获取证明和根
4. 部署合约并传入根
5. 使用证明验证白名单

## 注意事项
- 需要使用merkletreejs库
- 哈希算法需要一致
- 证明和根需要匹配
- 合约需要支持Merkle验证

