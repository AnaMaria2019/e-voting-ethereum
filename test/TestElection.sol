pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Election.sol";

contract TestElection {

  function testValue() public {
    uint expected = 0;

    Assert.equal(0, expected, "It should be 0.");
  }

}
