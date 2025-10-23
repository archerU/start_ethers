// 导入ethers包
import { ethers } from "ethers";



// import { PRIVATE_KEYS, NETWORKS, CONTRACTS, GAS_CONFIG } from '@config/config.js';
// playcode免费版不能安装ethers，用这条命令，需要从网络上import包（把上面这行注释掉）
// import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";

// 利用ethers默认的Provider连接以太坊网络
// const provider = new ethers.getDefaultProvider();
// 使用公共RPC端点
// const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/9ab5e4638c3e4dee938dfd785b938218');

const main = async () => {
    // 查询vitalik的ETH余额
    const balance = await provider.getBalance(`vitalik.eth`);
    // 将余额输出在console
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);

}

export default main;