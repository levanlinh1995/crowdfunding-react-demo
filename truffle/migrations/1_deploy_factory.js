const CampaignFactory = artifacts.require('CampaignFactory');

module.exports = async function (deployer) {
    await deployer.deploy(CampaignFactory);

    const instance = await CampaignFactory.deployed();

    const accounts = await web3.eth.getAccounts();

    await web3.eth.sendTransaction({to: instance.address, from: accounts[0], value: web3.utils.toWei('1', 'ether')});

    // await deployer.deploy(Campaign, '1000', accounts[0]);
}