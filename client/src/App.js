import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import CandidateProfile from "./CandidateProfile.js";
import Main from './Main.js';

import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: null, web3: null, account: null, contract: null, candidates: [], candidatesCount: 0 };
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

      this.setState({ web3, account: accounts[0], contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  beginElection = async() => {
    try {
      const { account, contract } = this.state;

      await contract.methods.beginElection("Voting Test").send({ from: account });

      const electionName = await contract.methods.electionName().call();
      const candidatesCount = await contract.methods.candidatesCount().call();

      this.setState({ value: "Election name: " + electionName, candidatesCount });
      // Load candidates
      for (var i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        this.setState({
          candidates: [...this.state.candidates, candidate]
        });
      }
    } catch (error) {
      alert(
        `Failed to begin election. Check console for details.`,
      );
      console.error(error);
    }
  }

  electionStarted = async() => {
    try {
      const { contract } = this.state;
      const response = await contract.methods.started().call();
      return (response);
    } catch (error) {
      alert(
        `Failed to check if election started. Check console for details.`,
      );
      console.error(error);
    }
  }

  loadCandidates = async() => {
    try {
      const { contract } = this.state;
      const candidatesCount = await contract.methods.candidatesCount().call();

      this.setState({ candidatesCount });
      // Load candidates
      for (var i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        this.setState({
          candidates: [...this.state.candidates, candidate]
        });
      }
    } catch (error) {
      alert(
        `Failed to load Candidates. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    if (!this.state.web3) {
      return <h2>Loading Web3, accounts, and contract...</h2>;
    }
    if (electionStarted) {
      button = null;
      text = null;
      if (this.state.candidates == [] && this.state.candidatesCount == 0) {
        loadCandidates();
      }
    } else {
      text = <p className="lead">Press <strong>button</strong> to begin Election</p>
      button = <button type="button" className="btn btn-info" onClick={this.beginElection}>Begin Election</button>
    }
    return (
      <Router>
        <div className="App container-fluid">
          <Switch>
            <Route exact path="/">
              <div className="jumbotron">
                <h1 className="display-4"> Election </h1>
                {text}
                {button}
                <p className="lead">Current account address: <strong>{this.state.account}</strong></p>
              </div>

              <div className="container">
                <div className="row">
                  <main role="main" className="col-lg-12 d-flex">
                      <Main
                        candidates={this.state.candidates}
                      />
                  </main>
                </div>
              </div>
            </Route>
            <Route path="/candidate-:id" children={<CandidateProfile contract={ this.state.contract }/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
