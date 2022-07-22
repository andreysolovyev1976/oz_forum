const {BN, singletons } = require('@openzeppelin/test-helpers');
require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });

const Token = artifacts.require('ERC20VotesMock');
const GovernorMock = artifacts.require('GovernorMock');
const CallReceiver = artifacts.require('CallReceiverMock');
const ERC721Mock = artifacts.require('ERC721Mock');
const ERC1155Mock = artifacts.require('ERC1155Mock');

module.exports = async (deployer, network, accounts) => {

    const name = 'OZ-Governor';
    const tokenName = 'MockToken';
    const tokenSymbol = 'MTKN';
    const votingDelay = new BN(4);
    const votingPeriod = new BN(16);

    if (network === 'development') {
        // In a test environment an ERC777 token requires deploying an ERC1820 registry
        await singletons.ERC1820Registry(accounts[0]);
    }

    await deployer.deploy(
        Token,
        tokenName, tokenSymbol
    );
    const token = await Token.deployed();

    await deployer.deploy(
        GovernorMock,
        name, token.address, votingDelay, votingPeriod, 10
    );
    await deployer.deploy(
        CallReceiver
    );
}
