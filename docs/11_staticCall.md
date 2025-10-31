# 11_staticCall.js - 静态调用

## 功能描述
演示如何使用staticCall模拟合约调用，检查交易是否会成功而无需真正执行。

## 主要功能
- 使用staticCall模拟合约方法调用
- 检查交易执行结果
- 模拟不同发送方的调用
- 验证合约状态变化

## 技术要点
- 使用`contract.函数名.staticCall()`进行静态调用
- 设置override选项（from地址）
- 不消耗gas费用的模拟执行
- 返回执行结果

## 输出信息
- 静态调用的结果
- 交易是否成功
- 模拟的发送方地址
- 合约方法返回值

## 使用方法
1. 创建Provider和Wallet
2. 创建合约实例
3. 使用staticCall()模拟调用
4. 设置override选项
5. 检查返回结果

## 注意事项
- staticCall不会真正执行交易
- 不会消耗gas费用
- 需要提供正确的override选项
- 可以用来验证交易逻辑

