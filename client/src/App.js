import React, { Component } from "react";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: null, web3: null, account: null, contract: null };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account: accounts[0], contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    try {
      const { account, contract } = this.state;

      // Get the value from the contract to prove it worked.
      //const response = await contract.methods.candidatesCount().call();
      const response = await contract.methods.getCandidateBio(1).call();

      // Update state with the result.
      this.setState({ value: response });
    } catch (error) {
      alert(
        `Failed to run example. Check console for details.`,
      );
      console.error(error);
    }
  };

  beginElection = async() => {
    try {
      const { account, contract } = this.state;

      await contract.methods.beginElection("Voting Test").send({ from: account });
      const response = await contract.methods.electionName().call();

      this.setState({ value: "Election name: " + response});
    } catch (error) {
      alert(
        `Failed to begin election. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    if (!this.state.web3) {
      return <h2>Loading Web3, accounts, and contract...</h2>;
    }
    return (
      <div className="App">
        <h2>Election Contract Test</h2>
        <p>Press <strong>left button</strong> to begin Election</p>
        <p>Press <strong>right button</strong> to run example</p>
        <button onClick={this.beginElection}>
          Begin Election
        </button>
        <button onClick={this.runExample}>
          Run Example
        </button>
        <p>
        Current account address: <strong>{this.state.account}</strong>
        </p>
        <div>{this.state.value}</div>
      </div>
    );
  }
}

export default App;
