// 等待MetaMask初始化
async function waitForMetaMask() {
    return new Promise((resolve, reject) => {
        if (window.ethereum) {
            resolve(window.ethereum);
            return;
        }

        const checkInterval = setInterval(() => {
            if (window.ethereum) {
                clearInterval(checkInterval);
                resolve(window.ethereum);
            }
        }, 100);

        // 10秒超时
        setTimeout(() => {
            clearInterval(checkInterval);
            reject(new Error('MetaMask初始化超时'));
        }, 10000);
    });
}

// MetaMask钱包连接和操作示例
import { ethers } from 'ethers';

async function connectMetaMask() {
    console.log('🦊 MetaMask钱包连接示例');
    console.log('='.repeat(50));

    try {
        // 等待MetaMask初始化
        console.log('⏳ 等待MetaMask初始化...');
        await waitForMetaMask();
        console.log('✅ MetaMask已初始化');

        // 检查是否安装了MetaMask
        if (typeof window.ethereum === 'undefined') {
            console.error('❌ 未检测到MetaMask，请先安装MetaMask扩展');
            console.log('📥 请访问 https://metamask.io/ 安装MetaMask');
            return;
        }

        console.log('✅ 检测到MetaMask扩展');

        // 检查MetaMask是否已解锁
        console.log('🔓 检查MetaMask解锁状态...');
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            });
            
            if (accounts.length === 0) {
                console.log('🔒 MetaMask已锁定，需要解锁');
                console.log('💡 请在MetaMask中解锁您的钱包');
                
                // 尝试请求连接来解锁
                console.log('🔗 正在请求连接MetaMask...');
                const newAccounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                
                if (newAccounts.length === 0) {
                    console.error('❌ 用户拒绝了连接请求或钱包未解锁');
                    return;
                }
                
                console.log('✅ MetaMask解锁并连接成功！');
                console.log(`📧 连接的钱包地址: ${newAccounts[0]}`);
            } else {
                console.log('✅ MetaMask已解锁');
                console.log(`📧 当前钱包地址: ${accounts[0]}`);
            }
        } catch (unlockError) {
            console.log('🔒 MetaMask需要解锁，尝试请求连接...');
            
            // 请求连接MetaMask
            console.log('🔗 正在请求连接MetaMask...');
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                console.error('❌ 用户拒绝了连接请求');
                return;
            }

            console.log('✅ MetaMask连接成功！');
            console.log(`📧 连接的钱包地址: ${accounts[0]}`);
        }

        // 创建Provider和Signer
        console.log('🔧 创建Provider和Signer...');
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // 获取钱包信息
        await getWalletInfo(provider, signer);

        // 监听账户变化
        window.ethereum.on('accountsChanged', (accounts) => {
            console.log('🔄 检测到账户切换');
            if (accounts.length === 0) {
                console.log('📤 用户已断开连接');
            } else {
                console.log(`📧 新账户地址: ${accounts[0]}`);
            }
        });

        // 监听网络变化
        window.ethereum.on('chainChanged', (chainId) => {
            console.log('🌐 检测到网络切换');
            console.log(`🔗 新链ID: ${parseInt(chainId, 16)}`);
            // 刷新页面以使用新网络
            window.location.reload();
        });

    } catch (error) {
        console.error('❌ MetaMask连接失败:', error.message);
        
        if (error.message.includes('MetaMask初始化超时')) {
            console.log('⏰ MetaMask初始化超时');
            console.log('💡 请确保MetaMask扩展已正确安装并启用');
        } else if (error.code === 4001) {
            console.log('💡 用户拒绝了连接请求');
        } else if (error.code === -32002) {
            console.log('⏳ 连接请求已在进行中，请检查MetaMask弹窗');
        } else if (error.message.includes('No active wallet found')) {
            console.log('🔒 MetaMask钱包未解锁或未选择账户');
            console.log('💡 请确保：');
            console.log('   1. MetaMask已解锁');
            console.log('   2. 已选择正确的账户');
            console.log('   3. 网络连接正常');
            console.log('   4. MetaMask扩展已启用');
        } else if (error.message.includes('User rejected')) {
            console.log('❌ 用户拒绝了连接请求');
        } else {
            console.log('🔧 其他错误，请检查MetaMask状态');
            console.log('💡 尝试刷新页面或重启浏览器');
        }
    }
}

// 获取钱包详细信息
async function getWalletInfo(provider, signer) {
    try {
        console.log('\n📊 钱包详细信息:');
        console.log('-'.repeat(30));

        // 获取账户地址
        const address = await signer.getAddress();
        console.log(`📍 钱包地址: ${address}`);

        // 获取ETH余额
        const balance = await provider.getBalance(address);
        console.log(`💰 ETH余额: ${ethers.formatEther(balance)} ETH`);

        // 获取网络信息
        const network = await provider.getNetwork();
        console.log(`🌐 网络名称: ${network.name}`);
        console.log(`🔗 链ID: ${network.chainId}`);

        // 获取Gas费用
        const feeData = await provider.getFeeData();
        console.log(`⛽ Gas价格: ${ethers.formatUnits(feeData.gasPrice, 'gwei')} Gwei`);
        
        if (feeData.maxFeePerGas) {
            console.log(`💸 最大费用: ${ethers.formatUnits(feeData.maxFeePerGas, 'gwei')} Gwei`);
            console.log(`🎯 优先费用: ${ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei')} Gwei`);
        }

        // 获取当前区块号
        const blockNumber = await provider.getBlockNumber();
        console.log(`📦 当前区块: ${blockNumber}`);

        // 获取账户交易数量
        const transactionCount = await provider.getTransactionCount(address);
        console.log(`📝 交易数量: ${transactionCount}`);

    } catch (error) {
        console.error('❌ 获取钱包信息失败:', error.message);
    }
}

// 检查MetaMask连接状态
async function checkConnection() {
    console.log('\n🔍 检查MetaMask连接状态:');
    console.log('-'.repeat(30));

    if (typeof window.ethereum === 'undefined') {
        console.log('❌ MetaMask未安装');
        return false;
    }

    try {
        // 检查MetaMask是否可用
        if (!window.ethereum.isMetaMask) {
            console.log('⚠️ 检测到非MetaMask钱包');
        }

        // 检查是否已连接
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });

        if (accounts.length === 0) {
            console.log('🔌 MetaMask已安装但未连接');
            console.log('💡 需要用户授权连接');
            return false;
        }

        console.log('✅ MetaMask已连接');
        console.log(`📧 当前账户: ${accounts[0]}`);

        // 获取网络信息
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });
        console.log(`🌐 当前网络ID: ${parseInt(chainId, 16)}`);

        // 检查网络连接
        try {
            await window.ethereum.request({
                method: 'eth_blockNumber'
            });
            console.log('🌐 网络连接正常');
        } catch (networkError) {
            console.log('⚠️ 网络连接可能有问题');
        }

        return true;
    } catch (error) {
        console.error('❌ 检查连接状态失败:', error.message);
        
        if (error.message.includes('No active wallet found')) {
            console.log('🔒 MetaMask钱包未解锁');
            console.log('💡 请解锁MetaMask钱包后重试');
        }
        
        return false;
    }
}

// 切换网络
async function switchNetwork(chainId) {
    console.log(`\n🔄 切换到网络 ${chainId}:`);
    console.log('-'.repeat(30));

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
        console.log('✅ 网络切换成功');
    } catch (error) {
        if (error.code === 4902) {
            console.log('❌ 网络不存在，需要添加网络');
        } else {
            console.error('❌ 网络切换失败:', error.message);
        }
    }
}

// 签名消息示例
async function signMessage(message) {
    console.log(`\n✍️ 签名消息: "${message}"`);
    console.log('-'.repeat(30));

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const signature = await signer.signMessage(message);
        console.log('✅ 签名成功');
        console.log(`📝 签名结果: ${signature}`);
        
        return signature;
    } catch (error) {
        console.error('❌ 签名失败:', error.message);
        return null;
    }
}



// 创建MetaMask启动按钮
function createMetaMaskButton() {
    // 检查是否已存在按钮
    if (document.getElementById('metaMaskButton')) {
        return;
    }

    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'metaMaskButtonContainer';
    buttonContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: white;
        border: 2px solid #e1e5e9;
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    // 创建按钮
    const button = document.createElement('button');
    button.id = 'metaMaskButton';
    button.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">🦊</span>
            <span>启动钱包</span>
        </div>
    `;
    button.style.cssText = `
        background: linear-gradient(135deg, #f6851b 0%, #ff6b35 100%);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 150px;
    `;

    // 添加悬停效果
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 6px 20px rgba(246, 133, 27, 0.3)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });

    // 添加点击事件
    button.addEventListener('click', async () => {
        button.disabled = true;
        button.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">⏳</span>
                <span>启动中...</span>
            </div>
        `;
        button.style.opacity = '0.7';

        try {
            await connectMetaMask();
            // 连接成功后更新按钮
            button.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 20px;">✅</span>
                    <span>已启动</span>
                </div>
            `;
            button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            button.disabled = false;
            button.style.opacity = '1';
        } catch (error) {
            console.error('启动钱包失败:', error);
            button.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 20px;">🦊</span>
                    <span>启动钱包</span>
                </div>
            `;
            button.disabled = false;
            button.style.opacity = '1';
        }
    });

    // 创建状态指示器
    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'metaMaskStatus';
    statusIndicator.style.cssText = `
        margin-top: 8px;
        font-size: 12px;
        color: #666;
        text-align: center;
    `;
    statusIndicator.textContent = '点击启动MetaMask钱包';

    // 组装按钮
    buttonContainer.appendChild(button);
    buttonContainer.appendChild(statusIndicator);
    document.body.appendChild(buttonContainer);
}

// 主函数
async function metaMaskExample() {
    console.log('🚀 开始MetaMask示例');
    
    // 创建MetaMask启动按钮
    createMetaMaskButton();
    
    // 检查连接状态
    const isConnected = await checkConnection();
    
    if (!isConnected) {
        console.log('💡 请点击右上角的按钮启动MetaMask钱包');
    } else {
        // 如果已连接，获取钱包信息
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        await getWalletInfo(provider, signer);
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ MetaMask示例完成');
}

// 浏览器环境导出函数
window.metaMaskExample = metaMaskExample;
window.connectMetaMask = connectMetaMask;
window.checkConnection = checkConnection;
window.switchNetwork = switchNetwork;
window.signMessage = signMessage;
window.waitForMetaMask = waitForMetaMask;
window.createMetaMaskButton = createMetaMaskButton;

// ES6 模块导出
export default metaMaskExample;
export { connectMetaMask, checkConnection, switchNetwork, signMessage, waitForMetaMask, createMetaMaskButton };
