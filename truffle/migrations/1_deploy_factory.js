const CampaignFactory = artifacts.require('CampaignFactory');

module.exports = async function (deployer, network, accounts) {
    // const accounts = await web3.eth.getAccounts();

    await deployer.deploy(CampaignFactory);

    const instance = await CampaignFactory.deployed();

    // instance.address
    
}