import { PRIVATE_KEYS, NETWORKS, CONTRACTS } from '../privateKeys.js';


const main = async () => {

    // 打印
    console.log('钱包开发私钥：', PRIVATE_KEYS.dev)
    console.log('ETH测试网络：', NETWORKS.sepolia)
    console.log('ETH测试合约：', CONTRACTS.erc20)
}

export default main;