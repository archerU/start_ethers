// 文件加载器 - 负责动态加载src目录中的文件列表
class FileLoader {
    constructor() {
        // 不再需要文件描述配置
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
            { name: '00_config.js', description: '配置使用' },
            { name: '01_HelloVitalik.js', description: '查询余额' },
            { name: '02_Provider.js', description: 'Provider' },
            { name: '03_ReadContract.js', description: '读取合约' },
            { name: '04_SendETH.js', description: '发送ETH' },
            { name: '05_WriteContract.js', description: '写入合约' },
            { name: '06_DeployContract.js', description: '部署合约' },
            { name: '07_Event.js', description: '监听事件' },
            { name: '08_ContractListener.js', description: '合约监听' },
            { name: '09_EventFilter.js', description: '事件过滤' },
            { name: '10_Units.js', description: '单位转换' },
            { name: '11_staticCall.js', description: '静态调用' },
            { name: '12_ERC721Check.js', description: 'ERC721' },
            { name: '13_EncodeCalldata.js', description: '编码数据' },
            { name: '14_HDwallet.js', description: 'HD钱包' },
            { name: '15_MultiTransfer.js', description: '批量转账' },
            { name: '16_MultiCollect.js', description: '批量收集' },
            { name: '17_MerkleTree.js', description: 'Merkle树' },
            { name: '18_Signature.js', description: '签名' },
            { name: '19_Mempool.js', description: '内存池' },
            { name: '20_DecodeTx.js', description: '解析交易' },
            { name: '21_VanityAddress.js', description: '靓号地址' },
            { name: '22_ReadAnyData.js', description: '读取数据' },
            { name: '23_Frontrun.js', description: '抢先交易' },
            { name: '24_ERC20Check.js', description: 'ERC20' },
            { name: '25_Flashbots.js', description: 'Flashbots' },
            { name: '26_EIP712.js', description: 'EIP712' },
            { name: '27_CreationChecker1.js', description: '创建检测1' },
            { name: '28_CreationChecker2.js', description: '创建检测2' },
            { name: 'ET_Metamask.js', description: 'MetaMask' },
            { name: 'ET02_SignInWithEthereum.js', description: 'SIWE' }
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
                <div class="file-desc">${file.description || '暂无描述'}</div>
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
