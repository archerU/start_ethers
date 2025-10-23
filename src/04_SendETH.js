// 利用Wallet类发送ETH
// 由于playcode不支持ethers.Wallet.createRandom()函数，我们只能用VScode运行这一讲代码
import { ethers } from "ethers";
import md5 from 'md5';
import { NETWORKS, WALLETS } from '../privateKeys.js';

const SEPOLIA_URL = NETWORKS.sepolia.rpcUrl;
// 利用公共RPC节点连接以太坊测试网络
const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);

// 创建随机的wallet对象
// const wallet1 = ethers.Wallet.createRandom()
// const wallet1WithProvider = wallet1.connect(provider)
// const mnemonic = wallet1.mnemonic // 获取助记词

// 利用私钥和provider创建wallet对象
// const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
// const wallet2 = new ethers.Wallet(privateKey, provider)

// 从助记词创建wallet对象
// const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)

// 创建随机的wallet对象
const wallet1 = new ethers.Wallet(WALLETS.dev.privateKey, provider);
const wallet2 = new ethers.Wallet(WALLETS.test.privateKey, provider);
const wallet3 = new ethers.Wallet(WALLETS.main.privateKey, provider);

const wallet1WithProvider = wallet1.connect(provider);

const main = async () => {
    // 1. 获取钱包地址
    const address1 = await wallet1.getAddress()
    const address2 = await wallet2.getAddress() 
    const address3 = await wallet3.getAddress() // 获取地址
    console.log(`1. 获取钱包地址`);
    console.log(`钱包1地址: ${address1}`);
    console.log(`钱包2地址: ${address2}`);
    console.log(`钱包3地址: ${address3}`);
    console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`);
    
    // 2. 获取助记词
    console.log(`\n2. 获取助记词`);
    console.log(`钱包3助记词: ${wallet3?.mnemonic?.phrase}`)
    // 注意：从private key生成的钱包没有助记词
    // console.log(wallet2.mnemonic.phrase)
    //v6 Wallet 不自动保留 mnemonic → 安全设计
    //fromMnemonic 创建的钱包可以访问 mnemonic
    // 私钥生成的钱包无法反推 mnemonic
    // 最佳实践：创建钱包时保存 mnemonic 字符串，后续引用即可

    // 3. 获取私钥
    console.log(`\n3. 获取私钥`);
    console.log(`钱包1私钥: ${md5(wallet1.privateKey)}`)
    console.log(`钱包2私钥: ${md5(wallet2.privateKey)}`)
    console.log(`钱包3私钥: ${md5(wallet3.privateKey)}`)

    // 4. 获取链上发送交易次数    
    console.log(`\n4. 获取链上交易次数`);
    const txCount1 = await provider.getTransactionCount(wallet1WithProvider)
    const txCount2 = await provider.getTransactionCount(wallet2)
    const txCount3 = await provider.getTransactionCount(wallet3)
    console.log(`钱包1发送交易次数: ${txCount1}`)
    console.log(`钱包2发送交易次数: ${txCount2}`)
    console.log(`钱包3发送交易次数: ${txCount3}`)

    // 5. 发送ETH
    // 如果这个钱包没goerli测试网ETH了，去水龙头领一些，钱包地址: 0xe16C1623c1AA7D919cd2241d8b36d9E79C1Be2A2
    // 1. chainlink水龙头: https://faucets.chain.link/goerli
    // 2. paradigm水龙头: https://faucet.paradigm.xyz/
    console.log(`\n5. 发送ETH（测试网）`);
    // i. 打印交易前余额
    console.log(`i. 发送前余额`)
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
    console.log(`钱包3: ${ethers.formatEther(await provider.getBalance(wallet3))} ETH`)
    // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
        to: address1,
        value: ethers.parseEther("0.001")
    }
    // iii. 发送交易，获得收据
    console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
    const receipt = await wallet3.sendTransaction(tx)
    await receipt.wait() // 等待链上确认交易
    console.log(receipt) // 打印交易详情
    // iv. 打印交易后余额
    console.log(`\niii. 发送后余额`)
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
    console.log(`钱包3: ${ethers.formatEther(await provider.getBalance(wallet3))} ETH`)
}

export default main;