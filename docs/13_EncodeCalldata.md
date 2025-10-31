# 13_EncodeCalldata.js - 编码调用数据

## 功能描述
演示如何使用ethers.js的Interface类编码和解码合约调用数据（calldata）。

## 主要功能
- 创建Interface实例
- 编码函数调用数据
- 解码调用数据
- 获取函数选择器

## 技术要点
- 使用`ethers.Interface()`创建接口实例
- 使用`interface.encodeFunctionData()`编码数据
- 使用`interface.decodeFunctionData()`解码数据
- 使用`interface.getFunction()`获取函数信息

## 输出信息
- 编码后的调用数据
- 函数选择器
- 解码后的函数参数
- 函数名称和参数类型

## 使用方法
1. 创建Interface实例（从ABI或合约）
2. 使用encodeFunctionData编码调用
3. 使用decodeFunctionData解码数据
4. 获取函数选择器和信息

## 注意事项
- ABI必须正确且完整
- 参数类型必须匹配
- 编码格式需要符合以太坊标准
- 解码需要提供正确的ABI

