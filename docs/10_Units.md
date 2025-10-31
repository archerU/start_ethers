# 10_Units.js - 单位转换

## 功能描述
演示如何使用ethers.js进行单位转换，包括BigNumber操作、格式化单位和解析单位。

## 主要功能
- BigNumber的创建和操作
- 格式化：小单位转大单位（wei转ether）
- 解析：大单位转小单位（ether转wei）
- 数学运算和比较

## 技术要点
- 使用`ethers.getBigInt()`创建BigNumber
- 使用`ethers.formatUnits()`格式化单位
- 使用`ethers.formatEther()`格式化ETH
- 使用`ethers.parseUnits()`解析单位
- 使用`ethers.parseEther()`解析ETH

## 输出信息
- BigNumber的创建方式
- 格式化后的数值
- 解析后的BigNumber值
- 数学运算结果
- 比较操作结果

## 使用方法
1. 创建BigNumber实例
2. 使用formatUnits()格式化显示
3. 使用parseUnits()转换为小单位
4. 进行数学运算和比较

## 注意事项
- BigNumber使用JavaScript BigInt类型
- 不能从超出安全范围的数字创建
- 格式化需要指定正确的单位
- parseUnits默认单位是ether

