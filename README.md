# e-voting-ethereum
E-Voting small app with ethereum smart contracts

### Prerequisites
* Ganache - verison 2.1.2.0
* MetaMask - Chrome extension
* Truffle - version v5.1.20
* Solidity - version v0.5.16 (solc-js)
* Node - version v12.16.1
* Web3.js - version v1.2.1

<strong> Setup steps: </strong>
1. Clone repository on local: 
    `git clone git@github.com:Ninjseal/e-voting-ethereum.git`
2. Open Ganache and add this project to personal workspace:
    NEW WORKSPACE -> ADD PROJECT -> Find truffle-config.js file -> SAVE WORKSPACE
3. Add in MetaMask the local network: Custom RPC -> Network Name: <name> -> New RPC URL: http://127.0.0.1:7545 -> Chain ID: <chain_id>
4. Select in MetaMask your local netword and import the accounts from Ganache
5. Navigate to e-voting-ethereum folder on local
6. Compile truffle contracts and make migrations:
    `truffle compile && truffle migrate`
7. Build node modules:
    `cd client && npm install`
8. Start react application (inside client folder):
    `npm run start`
9. Go to <strong>localhost:3000</strong> inside browser and you're <strong>DONE!</strong> :)


<strong> Other notable commands: </strong>
  - `truffle console` (here you can run any truffle command and manually test stuff)
  - `truffle test` (for running unit tests of contracts)
  - `npm run test` (inside client folder, for running automated tests of application)
  - `npm run build` (inside client folder, for building the application for production)
  
<strong> Tips & Tricks: </strong>
  - In order to use a newly created contract inside `React` you need to deploy it in migrations folder then run `truffle compile && truffle migrate` commands
  - Example:
  I created a new contract named `MyContract.sol` inside contracts folder. My `migrations/2_deploy_contracts.js` file will look like this:
  ```
  var SimpleStorage = artifacts.require("./SimpleStorage.sol");
  var MyContract = artifacts.require("./MyContract.sol");

  module.exports = function(deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(MyContract);
  };
  ```
  `truffle compile && truffle migrate`
