require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 * 
 */
const ALCHEMY_API_KEY = "v-X5XjgicGy-5HzpBRyLPTZTcuDh91-N";

const ROPSTEN_PRIVATE_KEY = "a906a48b7b62a03289635ba4480231f209c9fad4ba615ee058e583ee03e3e5ca";

module.exports = {
    solidity: "0.7.3",
    defaultNetwork: "ropsten",
    networks: {
        hardhat: {
        },
        ropsten: {
            url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
        }
    }
};

