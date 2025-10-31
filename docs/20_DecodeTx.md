# 20_DecodeTx.js - 解析交易

## 功能描述
演示如何监听pending交易并解析交易数据，包括函数调用和参数解码。

## 主要功能
- 监听pending交易
- 过滤特定类型的交易
- 解码交易数据
- 解析函数参数

## 技术要点
- 使用`ethers.Interface()`创建接口实例
- 使用`interface.getFunction().selector`获取选择器
- 使用`interface.decodeFunctionData()`解码数据
- 处理BigInt类型数据

## 输出信息
- 交易哈希
- 函数选择器
- 解码后的函数参数
- 交易详情

## 使用方法
1. 创建WebSocket Provider
2. 创建Interface实例
3. 获取函数选择器
4. 监听pending交易
5. 过滤并解码交易

## 注意事项
- 需要正确设置ABI
- 函数选择器需要匹配
- 需要处理BigInt类型
- WebSocket连接更实时

