const CampaignFactory = artifacts.require('CampaignFactory');

module.exports = async function (deployer, network, accounts) {
    // const accounts = await web3.eth.getAccounts();

    await deployer.deploy(CampaignFactory, {
        from: accounts[0]
    });

    const instance = await CampaignFactory.deployed(); // default first account to deploy

    // instance.address
    
}