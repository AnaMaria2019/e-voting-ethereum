# e-voting-ethereum
E-Voting small app with ethereum smart contracts

<strong> Setup steps: </strong>
1. Clone repository on local: 
    git clone git@github.com:Ninjseal/e-voting-ethereum.git
2. Open Ganache and add this project to personal workspace:
    NEW WORKSPACE -> ADD PROJECT -> Find truffle-config.js file -> SAVE WORKSPACE
3. Navigate to e-voting-ethereum folder on local
4. Compile truffle contracts and make migrations:
    truffle compile
    truffle migrate
5. Build node modules
    cd client && npm install
6. Start react application (inside client folder)
    npm run start
7. Go to localhost:3000 inside browser


<strong> Other notable commands: </strong>
  - truffle console (here you can run any truffle command and manually test stuff)
  - truffle test (for running unit tests of contracts)
  - npm run test (inside client folder, for running automated tests of application)
  - npm run build (inside client folder, for building the application for production)
  
<strong> Tips & Tricks: </strong>
  - In order to use a newly created contract inside React you need to deploy it in migrations folder then run truffle compile && truffle migrate commands
  - Example:
  I created a new contract named MyContract.sol inside contracts folder. My migrations/2_deploy_contracts.js file will look like this:
  ```
  var SimpleStorage = artifacts.require("./SimpleStorage.sol");
  var MyContract = artifacts.require("./MyContract.sol");

  module.exports = function(deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(MyContract);
  };
  ```
  truffle compile && truffle migrate
