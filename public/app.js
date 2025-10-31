// Ethers.js 文件选择器应用逻辑
class EthersApp {
    constructor() {
        this.selectedFile = null;
        this.fileItems = document.querySelectorAll('.file-item');
        this.runButton = document.getElementById('runButton');
        this.output = document.getElementById('output');
        this.readme = document.getElementById('readme');
        
        this.init();
    }
    
    init() {
        this.initFileLoader();
        this.setupResizer();
    }
    
    // 初始化文件加载器
    async initFileLoader() {
        const fileLoader = new FileLoader();
        this.fileItems = await fileLoader.init();
        
        // 文件列表加载完成后，设置其他功能
        this.setupFileSelection();
        this.setupRunButton();
        this.setupConsoleOverride();
    }
    
    // 设置文件选择事件
    setupFileSelection() {
        this.fileItems.forEach(item => {
            item.addEventListener('click', () => {
                // 移除其他选中状态
                this.fileItems.forEach(i => i.classList.remove('active'));
                // 添加选中状态
                item.classList.add('active');
                this.selectedFile = item.dataset.file;
                this.runButton.disabled = false;
                this.runButton.innerHTML = '<span class="status-indicator status-ready"></span>运行 ' + this.selectedFile;
                
                // 清空输出区域
                this.output.innerHTML = '';
                
                // 加载对应的readme文件
                this.loadReadme(this.selectedFile);
            });
        });
    }
    
    // 设置运行按钮事件
    setupRunButton() {
        this.runButton.addEventListener('click', async () => {
            if (!this.selectedFile) return;
            
            // 重置状态，确保每次运行都是全新的开始
            this.runButton.disabled = true;
            this.runButton.innerHTML = '<span class="status-indicator status-running"></span>运行中...';
            
            // 清空输出区域，准备新的运行
            this.output.innerHTML = '';
            
            try {
                // 使用script标签加载UMD模块
                const module = await this.loadModuleViaScript(`${this.selectedFile}.js`);
                
                // 尝试获取可执行的函数
                let executableFunction = null;
                
                // 首先尝试默认导出
                if (module.default && typeof module.default === 'function') {
                    executableFunction = module.default;
                } else {
                    // 尝试命名导出
                    const functionName = this.selectedFile.replace('01_', '').replace('02_', '');
                    if (module[functionName] && typeof module[functionName] === 'function') {
                        executableFunction = module[functionName];
                    } else {
                        // 尝试查找任何函数导出
                        for (const key of Object.keys(module)) {
                            if (typeof module[key] === 'function') {
                                executableFunction = module[key];
                                break;
                            }
                        }
                    }
                }
                
                // 如果找到可执行函数，执行它
                if (executableFunction) {
                    // 执行文件中的函数，这里会触发文件内的所有console.log
                    await executableFunction();
                    
                    // 文件运行结束后添加提示
                    console.log('='.repeat(50));
                    console.log('✅ 文件运行结束');
                } else {
                    console.error('❌ 文件加载成功，但没有找到可执行的函数');
                }
                
            } catch (error) {
                console.error(`❌ 文件运行失败: ${error.message}`);
                console.error(`📋 错误详情: ${error.stack || error.toString()}`);
            } finally {
                // 无论成功还是失败，都恢复按钮状态
                this.runButton.disabled = false;
                this.runButton.innerHTML = '<span class="status-indicator status-ready"></span>运行 ' + this.selectedFile;
            }
        });
    }
    
    // 设置控制台输出重写
    setupConsoleOverride() {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const originalInfo = console.info;
        
        // 重写 console.log
        console.log = (...args) => {
            this.addToOutput(args, 'log-info');
        };
        
        // 重写 console.error
        console.error = (...args) => {
            this.addToOutput(args, 'log-error', '❌');
        };
        
        // 重写 console.warn
        console.warn = (...args) => {
            this.addToOutput(args, 'log-warn', '⚠️');
        };
        
        // 重写 console.info
        console.info = (...args) => {
            this.addToOutput(args, 'log-info', 'ℹ️');
        };
    }
    
    // 添加输出到界面
    addToOutput(args, className, prefix = '') {
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
            }
            return String(arg);
        }).join(' ');
        
        // 过滤掉webpack-dev-server的无关信息
        if (this.shouldFilterMessage(message)) {
            return;
        }
        
        const timestamp = new Date().toLocaleTimeString();
        const icon = prefix || '';
        
        // 添加运行结果，包含时间戳和样式
        this.output.innerHTML += `<div class="log-line ${className}">[${timestamp}] ${icon} ${message}</div>`;
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    // 判断是否应该过滤掉某些消息
    shouldFilterMessage(message) {
        const filterPatterns = [
            '[webpack-dev-server]',
            '[HMR]',
            'Hot Module Replacement',
            'Live Reloading',
            'Progress disabled',
            'Overlay enabled',
            'Waiting for update signal',
            'Server started',
            'webpack compiled',
            'webpack is watching'
        ];
        
        return filterPatterns.some(pattern => message.includes(pattern));
    }
    
    // 通过script标签加载模块
    async loadModuleViaScript(filename) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `/${filename}`;
            script.onload = () => {
                // UMD模块会暴露到全局变量
                const moduleName = filename.replace('.js', '');
                const globalModule = window[moduleName];
                
                if (globalModule) {
                    // UMD模块的导出结构
                    const module = {
                        default: globalModule.default || globalModule,
                        ...globalModule
                    };
                    resolve(module);
                } else {
                    reject(new Error(`全局模块 ${moduleName} 未找到`));
                }
            };
            script.onerror = () => {
                reject(new Error(`加载脚本 ${filename} 失败`));
            };
            document.head.appendChild(script);
        });
    }
    
    // 加载readme文件
    async loadReadme(filename) {
        try {
            const response = await fetch(`/docs/${filename}.md`);
            if (response.ok) {
                const markdown = await response.text();
                this.readme.innerHTML = this.parseMarkdown(markdown);
            } else {
                this.readme.innerHTML = '<div class="loading">暂无说明文档</div>';
            }
        } catch (error) {
            this.readme.innerHTML = '<div class="loading">加载说明文档失败</div>';
        }
    }
    
    // 设置拖动分隔条
    setupResizer() {
        const resizer = document.getElementById('resizer');
        const middleMain = document.querySelector('.middle-main');
        const rightReadme = document.querySelector('.right-readme');
        
        if (!resizer || !middleMain || !rightReadme) return;
        
        let isResizing = false;
        let startX = 0;
        let startWidth = 0;
        
        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = rightReadme.offsetWidth;
            resizer.classList.add('dragging');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const diff = startX - e.clientX; // 鼠标向左移动，diff为正
            const newWidth = startWidth + diff;
            
            // 限制宽度范围
            const minWidth = 200;
            const maxWidth = window.innerWidth * 0.5; // 最大不超过窗口的50%
            
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                rightReadme.style.width = newWidth + 'px';
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                resizer.classList.remove('dragging');
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
        });
    }
    
    // 简单的Markdown解析器
    parseMarkdown(markdown) {
        return markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/`(.*)`/gim, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
            .replace(/\n/gim, '<br>')
            .replace(/<li>(.*?)<br>/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
            .replace(/<\/ul><ul>/gim, '');
    }
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new EthersApp();
});
