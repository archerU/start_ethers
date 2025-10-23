// 文件加载器 - 负责动态加载src目录中的文件列表
class FileLoader {
    constructor() {
        this.fileDescriptions = {
            '01_HelloVitalik.js': '查询 Vitalik 地址余额和网络信息',
            '02_Provider.js': 'Provider 功能全面示例（网络、区块、余额、Gas）'
        };
    }

    // 动态加载文件列表
    async loadFileList() {
        try {
            // 获取src目录中的文件列表
            const response = await fetch('/api/files');
            if (response.ok) {
                const files = await response.json();
                return files;
            } else {
                // 如果API不可用，使用默认文件列表
                return this.getDefaultFileList();
            }
        } catch (error) {
            console.error('加载文件列表失败:', error);
            // 使用默认文件列表
            return this.getDefaultFileList();
        }
    }

    // 获取默认文件列表
    getDefaultFileList() {
        return [
            { name: '01_HelloVitalik.js', desc: this.fileDescriptions['01_HelloVitalik.js'] },
            { name: '02_Provider.js', desc: this.fileDescriptions['02_Provider.js'] }
        ];
    }

    // 渲染文件列表
    renderFileList(files) {
        const fileListContainer = document.getElementById('fileList');
        if (!fileListContainer) {
            console.error('找不到文件列表容器');
            return;
        }

        fileListContainer.innerHTML = '';
        
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.dataset.file = file.name.replace('.js', '');
            
            fileItem.innerHTML = `
                <div class="file-name">${file.name}</div>
                <div class="file-desc">${file.desc}</div>
            `;
            
            fileListContainer.appendChild(fileItem);
        });

        return document.querySelectorAll('.file-item');
    }

    // 初始化文件列表
    async init() {
        const files = await this.loadFileList();
        return this.renderFileList(files);
    }
}

// 导出FileLoader类供其他模块使用
window.FileLoader = FileLoader;
