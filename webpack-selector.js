const fs = require('fs');
const path = require('path');

// 获取 src 目录下的所有 .js 文件
function getSrcFiles() {
    const srcDir = path.join(__dirname, 'src');
    const files = fs.readdirSync(srcDir)
        .filter(file => file.endsWith('.js'))
        .sort();
    return files;
}

// 生成动态入口配置
function generateEntryConfig() {
    const files = getSrcFiles();
    const entry = {};
    
    files.forEach(file => {
        const name = file.replace('.js', '');
        entry[name] = `./src/${file}`;
    });
    
    return entry;
}

// 生成选择器页面
function generateSelectorPage() {
    const files = getSrcFiles();
    
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ethers.js 文件选择器</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 40px;
            max-width: 600px;
            width: 100%;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #333;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            color: #666;
            font-size: 1.1em;
        }
        
        .file-list {
            display: grid;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .file-item {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .file-item:hover {
            border-color: #667eea;
            background: #f0f2ff;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.1);
        }
        
        .file-item.active {
            border-color: #667eea;
            background: #667eea;
            color: white;
        }
        
        .file-name {
            font-size: 1.2em;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .file-desc {
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .run-button {
            width: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 15px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
        }
        
        .run-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .run-button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .output {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border-left: 4px solid #667eea;
            min-height: 200px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            white-space: pre-wrap;
            overflow-y: auto;
            max-height: 400px;
        }
        
        .loading {
            text-align: center;
            color: #667eea;
            font-style: italic;
        }
        
        .error {
            color: #dc3545;
            background: #f8d7da;
            border-left-color: #dc3545;
        }
        
        .success {
            color: #155724;
            background: #d4edda;
            border-left-color: #28a745;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Ethers.js</h1>
            <p>选择要运行的示例文件</p>
        </div>
        
        <div class="file-list" id="fileList">
            ${files.map(file => {
                const name = file.replace('.js', '');
                const desc = getFileDescription(file);
                return `
                    <div class="file-item" data-file="${name}">
                        <div class="file-name">${file}</div>
                        <div class="file-desc">${desc}</div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <button class="run-button" id="runButton" disabled>选择文件后点击运行</button>
        
        <div class="output" id="output">
            <div class="loading">请选择一个文件开始运行...</div>
        </div>
    </div>

    <script>
        let selectedFile = null;
        const fileItems = document.querySelectorAll('.file-item');
        const runButton = document.getElementById('runButton');
        const output = document.getElementById('output');
        
        // 文件选择事件
        fileItems.forEach(item => {
            item.addEventListener('click', () => {
                // 移除其他选中状态
                fileItems.forEach(i => i.classList.remove('active'));
                // 添加选中状态
                item.classList.add('active');
                selectedFile = item.dataset.file;
                runButton.disabled = false;
                runButton.textContent = \`运行 \${selectedFile}\`;
            });
        });
        
        // 运行按钮事件
        runButton.addEventListener('click', async () => {
            if (!selectedFile) return;
            
            runButton.disabled = true;
            runButton.textContent = '运行中...';
            output.innerHTML = '<div class="loading">正在运行，请稍候...</div>';
            
            try {
                // 动态导入选中的文件
                const module = await import(\`./\${selectedFile}.js\`);
                
                // 如果模块有默认导出函数，执行它
                if (module.default && typeof module.default === 'function') {
                    await module.default();
                } else {
                    output.innerHTML = '<div class="success">✅ 文件加载成功！</div>';
                }
                
            } catch (error) {
                output.innerHTML = \`<div class="error">❌ 运行失败: \${error.message}</div>\`;
            } finally {
                runButton.disabled = false;
                runButton.textContent = \`运行 \${selectedFile}\`;
            }
        });
        
        // 重写 console.log 来显示输出
        const originalLog = console.log;
        const originalError = console.error;
        
        console.log = function(...args) {
            originalLog.apply(console, args);
            const message = args.join(' ');
            const currentContent = output.innerHTML;
            if (currentContent.includes('正在运行') || currentContent.includes('请选择一个文件')) {
                output.innerHTML = '';
            }
            output.innerHTML += message + '\\n';
            output.scrollTop = output.scrollHeight;
        };
        
        console.error = function(...args) {
            originalError.apply(console, args);
            const message = args.join(' ');
            const currentContent = output.innerHTML;
            if (currentContent.includes('正在运行') || currentContent.includes('请选择一个文件')) {
                output.innerHTML = '';
            }
            output.innerHTML += '<div class="error">' + message + '</div>\\n';
            output.scrollTop = output.scrollHeight;
        };
    </script>
</body>
</html>`;
}

// 获取文件描述
function getFileDescription(filename) {
    const descriptions = {
        '01_HelloVitalik.js': '查询 Vitalik 地址余额和网络信息',
        '02_Provider.js': 'Provider 功能全面示例（网络、区块、余额、Gas）'
    };
    return descriptions[filename] || 'Ethers.js 示例文件';
}

module.exports = {
    generateEntryConfig,
    generateSelectorPage,
    getSrcFiles
};
