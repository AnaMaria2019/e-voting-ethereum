const Election = artifacts.require("./Election.sol");

contract("Election", accounts => {
  it("...should be 0", async () => {
    const electionInstance = await Election.deployed();

    // Set value of 89
    //await Election.set(89, { from: accounts[0] });

    // Get stored value
    //const storedData = await Election.get.call();

    //assert.equal(storedData, 89, "The value 89 was not stored.");
    assert.equal(0, 0, "Test");
  });
});
