# Contracts 文件夹

此文件夹用于存放静态文件，如合约ABI、合约JSON等，可以在`src`目录下的文件中引入使用。

## 使用方法

### 方式1：使用相对路径引入

在`src`目录下的文件中，可以使用相对路径引入：

```javascript
// 从src目录引入
import * as contractJson from "../contracts/contract.json" assert {type: "json"};

// 或者使用require方式（如果支持）
const contractJson = require("../contracts/contract.json");
```

### 方式2：使用别名引入

webpack配置了别名`@contracts`，可以直接使用：

```javascript
import * as contractJson from "@contracts/contract.json" assert {type: "json"};
```

## 文件类型

支持以下静态文件类型：
- `.json` - JSON文件（合约ABI、配置等）
- 其他静态资源文件

## 注意事项

1. JSON文件导入需要使用`assert {type: "json"}`语法
2. 确保文件路径正确
3. 静态文件会被webpack打包处理

