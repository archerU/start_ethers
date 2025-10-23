// 浏览器环境，使用 ES6 import
import { ethers } from 'ethers';

async function providerExamples() {
    console.log('🔗 Ethers.js Provider 示例');
    console.log('='.repeat(40));

    // 1. 不同的 Provider 类型
    console.log('\n1. 创建不同类型的 Provider:');

    // JSON-RPC Provider
    const jsonRpcProvider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
    console.log('✅ JSON-RPC Provider 创建成功');

    // Alchemy Provider (需要 API Key)
    // const alchemyProvider = new ethers.AlchemyProvider('mainnet', 'YOUR_API_KEY');

    // Infura Provider (需要 API Key)
    // const infuraProvider = new ethers.InfuraProvider('mainnet', 'YOUR_API_KEY');

    // 2. 获取网络信息
    console.log('\n2. 网络信息:');
    try {
        const network = await jsonRpcProvider.getNetwork();
        console.log(`网络名称: ${network.name}`);
        console.log(`链 ID: ${network.chainId}`);
        console.log(`ENS 地址: ${network.ensAddress || '未设置'}`);
    } catch (error) {
        console.error('获取网络信息失败:', error.message);
    }

    // 3. 获取区块信息
    console.log('\n3. 区块信息:');
    try {
        const blockNumber = await jsonRpcProvider.getBlockNumber();
        console.log(`当前区块号: ${blockNumber}`);

        const block = await jsonRpcProvider.getBlock(blockNumber);
        console.log(`区块哈希: ${block.hash}`);
        console.log(`区块时间: ${new Date(block.timestamp * 1000).toLocaleString()}`);
        console.log(`交易数量: ${block.transactions.length}`);
    } catch (error) {
        console.error('获取区块信息失败:', error.message);
    }

    // 4. 获取账户余额
    console.log('\n4. 账户余额查询:');
    const addresses = [
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik
        '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // Binance Hot Wallet
    ];

    for (const address of addresses) {
        try {
            const balance = await jsonRpcProvider.getBalance(address);
            const balanceInEth = ethers.formatEther(balance);
            console.log(`${address}: ${balanceInEth} ETH`);
        } catch (error) {
            console.error(`查询 ${address} 余额失败:`, error.message);
        }
    }

    // 5. 获取 Gas 价格
    console.log('\n5. Gas 价格:');
    try {
        const feeData = await jsonRpcProvider.getFeeData();
        console.log(`Gas 价格: ${ethers.formatUnits(feeData.gasPrice, 'gwei')} Gwei`);
        if (feeData.maxFeePerGas) {
            console.log(`最大费用: ${ethers.formatUnits(feeData.maxFeePerGas, 'gwei')} Gwei`);
        }
        if (feeData.maxPriorityFeePerGas) {
            console.log(`优先费用: ${ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei')} Gwei`);
        }
    } catch (error) {
        console.error('获取 Gas 价格失败:', error.message);
    }

    console.log('\n' + '='.repeat(40));
    console.log('Provider 示例完成! 🎉');
}

// 浏览器环境导出函数
window.providerExamples = providerExamples;

// ES6 模块导出 - 确保默认导出
export default providerExamples;

// 同时导出命名导出，以防万一
export { providerExamples };
