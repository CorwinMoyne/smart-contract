let CrowdFundingWithDeadline = artifacts.require(
    './CrowdFundingWithDeadline'
);

contract('CrowdFundingWithDeadline', (accounts) => {

    let contract;
    let contractCreator = accounts[0];
    let beneficiary = accounts[1];

    const ONE_ETH = 1000000000000000000;

    const ONGOING_STATE = 0;
    const FAILED_STATE = '1';
    const SUCCEEDED_STATE = '2';
    const PAID_OUT_STATE = '3';

    beforeEach(async () => {
        contract = await CrowdFundingWithDeadline.new(
            'funding',
            1,
            10,
            beneficiary,
            {
                from: contractCreator,
                gas: 2000000
            }
        )
    });

    it('contract is initialised', async () => {
        let campaignName = await contract.name.call();
        expect(campaignName).to.equal('funding');

        let targetAmount = await contract.targetAmount.call();        
        expect(targetAmount.toString()).to.equal(ONE_ETH.toString());

        let actualBeneficiary = await contract.beneficiary.call();
        expect(actualBeneficiary).to.equal(beneficiary);

        let state = await contract.state.call();        
        expect(state.valueOf().toNumber()).to.equal(ONGOING_STATE);
    });
});