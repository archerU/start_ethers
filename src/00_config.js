import { WALLETS, NETWORKS, CONTRACTS } from '../privateKeys.js';


const main = async () => {
    // ethers.js 文档地址：
    // https://docs.ethers.io/v6/
    // https://docs.ethers.io/v6/api/
    // https://docs.ethers.io/v6/api/utils/
    // https://docs.ethers.io/v6/api/utils/wallet/
    // https://docs.ethers.io/v6/api/utils/wallet/
    // 打印
    console.log('钱包开发私钥：', WALLETS)
    console.log('ETH测试网络：', NETWORKS.sepolia)
    console.log('ETH测试合约：', CONTRACTS.erc20)
}

export default main;