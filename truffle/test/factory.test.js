const { expect } = require('chai');

const CampaignFactory = artifacts.require('CampaignFactory');

// Start test block
contract('CampaignFactory', function () {
    beforeEach(async function () {
      // Deploy a new Box contract for each test
      this.factory = await CampaignFactory.deployed();
    });
  
    // Test case
    it('test', async function () {
      await this.factory.createCampaign(1000);

      const res = await this.factory.getDeployedCampaigns();

      console.log(res)
    });
  });