# 19_Mempool.js - 内存池监听

## 功能描述
演示如何监听以太坊内存池（Mempool）中的待处理交易，实时获取pending交易信息。

## 主要功能
- 监听pending交易
- 获取交易哈希
- 获取交易详情
- 限制RPC调用频率

## 技术要点
- 使用`provider.on("pending")`监听pending交易
- 使用WebSocket连接提高实时性
- 使用节流函数限制调用频率
- 使用`provider.getTransaction()`获取交易详情

## 输出信息
- 监听到的交易哈希
- 交易详情
- 时间戳
- 交易数量

## 使用方法
1. 创建WebSocket Provider
2. 监听pending事件
3. 获取交易哈希
4. 查询交易详情
5. 处理交易数据

## 注意事项
- 推荐使用WebSocket连接
- 需要限制RPC调用频率
- 大量交易可能影响性能
- 需要处理网络错误

