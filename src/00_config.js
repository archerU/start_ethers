import { PRIVATE_KEYS, NETWORKS, CONTRACTS } from '../privateKeys.js';


const main = async () => {

    // 打印
    console.log('钱包开发私钥：', PRIVATE_KEYS.dev)
    console.log('ETH测试网络：', NETWORKS.sepolia)
    console.log('测试合约地址：', CONTRACTS.erc20)
}

export default main;