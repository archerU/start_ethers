// 私钥配置文件
// 注意：此文件包含敏感信息，请确保不要提交到git仓库

const PRIVATE_KEYS = {
    // 主私钥
    main: "0x你的主私钥",
    
    // 测试私钥
    test: "0x你的测试私钥",
    
    // 开发私钥
    dev: "0x你的开发私钥"
};

// 网络配置
const NETWORKS = {
    // 以太坊主网
    mainnet: {
        rpcUrl: "https://eth.llamarpc.com",
        chainId: 1,
        name: "Ethereum Mainnet"
    },
    
    // Sepolia测试网
    sepolia: {
        rpcUrl: "https://eth.llamarpc.com",
        chainId: 11155111,
        name: "Sepolia Testnet"
    },
    
    // Goerli测试网
    // goerli: {
    //     rpcUrl: "https://goerli.infura.io/v3/YOUR_INFURA_KEY",
    //     chainId: 5,
    //     name: "Goerli Testnet"
    // },
    
    // Polygon主网
    polygon: {
        rpcUrl: "https://polygon-rpc.com",
        chainId: 137,
        name: "Polygon Mainnet"
    },
    
    // BSC主网
    bsc: {
        rpcUrl: "https://bsc-dataseed.binance.org",
        chainId: 56,
        name: "BSC Mainnet"
    }
};

// 合约地址配置
const CONTRACTS = {
    // ERC20代币合约
    erc20: {
        mainnet: "0x合约地址",
        sepolia: "0x测试网合约地址",
    },
    
    // NFT合约
    nft: {
        mainnet: "0xNFT合约地址",
        sepolia: "0x测试网NFT合约地址",
    },
    
    // DeFi协议合约
    uniswap: {
        mainnet: "0xUNI合约地址", // UNI代币
        sepolia: "0x测试网Uniswap合约地址"
    },
    
    // 其他合约
    other: {
        mainnet: "0x其他合约地址",
        sepolia: "0x测试网其他合约地址"
    }
};

// Gas配置
const GAS_CONFIG = {
    // 基础Gas配置
    gasLimit: 21000,
    
    // Gas价格配置（Gwei）
    gasPrice: {
        slow: "10",      // 慢速
        standard: "20",  // 标准
        fast: "30",      // 快速
        instant: "50"    // 即时
    },
    
    // EIP-1559 Gas配置
    maxFeePerGas: {
        slow: "15",      // 慢速
        standard: "25",  // 标准
        fast: "40",      // 快速
        instant: "60"    // 即时
    },
    
    maxPriorityFeePerGas: {
        slow: "1",       // 慢速
        standard: "2",   // 标准
        fast: "5",       // 快速
        instant: "10"    // 即时
    },
    
    // 不同网络的Gas配置
    networkGas: {
        mainnet: {
            gasLimit: 21000,
            gasPrice: "20"
        },
        sepolia: {
            gasLimit: 21000,
            gasPrice: "1"
        },
        polygon: {
            gasLimit: 21000,
            gasPrice: "30"
        },
        bsc: {
            gasLimit: 21000,
            gasPrice: "5"
        }
    }
};

// 导出配置
export { PRIVATE_KEYS, NETWORKS, CONTRACTS, GAS_CONFIG };
