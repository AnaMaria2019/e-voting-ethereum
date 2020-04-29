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
    this.state = { isOwner: false, started: false, ended: false, title: null, web3: null, account: null, contract: null, candidates: [], candidatesCount: 0, voted: ''};
    this.vote = this.vote.bind(this);
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

      this.setState({ web3, account: accounts[0], contract: instance }, this.electionStarted);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  electionStarted = async () => {
    try {
      const { account, contract } = this.state;

      const started = await contract.methods.started().call();
      const title = await contract.methods.electionName().call();
      const isOwner = await contract.methods.owner().call() === account;
      const voted = await contract.methods.voters(account).call();
      const ended = await contract.methods.ended().call();

      this.setState({ isOwner, started, ended, title, voted });

    } catch (error) {
      alert(
        `Failed to fetch election data. Check console for details.`,
      );
      console.error(error);
    }
  }

  beginElection = async() => {
    try {
      const { account, contract } = this.state;

      await contract.methods.beginElection("Vote for the next Headmaster of Hogwarts").send({ from: account });

      const electionName = await contract.methods.electionName().call();
      const candidatesCount = await contract.methods.candidatesCount().call();

      this.setState({ title: electionName, candidatesCount });
      // Load candidates
      for (var i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        this.setState({
          candidates: [...this.state.candidates, candidate]
        });
      }
      const started = await contract.methods.started().call();
      this.setState({ started });

    } catch (error) {
      alert(
        `Failed to begin election. Check console for details.`,
      );
      console.error(error);
    }
  }

  endElection = async() => {
    try {
      const { account, contract } = this.state;
      await contract.methods.endElection().send({ from: account });
      const ended = await contract.methods.ended().call();

      this.setState({ ended });
    } catch (error) {
      alert(
        `Failed to end election. Check console for details.`,
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

  vote = async(id, account) => {
    try{
      const { contract } = this.state;
      await contract.methods.vote(id, account).send({from: account});

      this.setState({ voted: true });
    } catch (error) {
      alert(
        `Failed to vote Candidate. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    if (!this.state.web3) {
      return <h2>Loading Web3, accounts, and contract...</h2>;
    }
    let button, text;

    if (this.state.ended) {
      text = <p className="lead"><strong>Election</strong> ended</p>
      if (this.state.candidates.length === 0 && this.state.candidatesCount === 0) {
        this.loadCandidates();
      }
    } else {
      if (this.state.started) {
        if (this.state.candidates.length === 0 && this.state.candidatesCount === 0) {
          this.loadCandidates();
        }
        if (this.state.isOwner) {
          text = <p className="lead">Press <strong>button</strong> to end Election</p>
          button = <button type="button" className="btn btn-danger" onClick={this.endElection}>End Election</button>
        }
      } else if (this.state.isOwner) {
        text = <p className="lead">Press <strong>button</strong> to begin Election</p>
        button = <button type="button" className="btn btn-info" onClick={this.beginElection}>Begin Election</button>
      } else {
        text = <p className="lead"><strong>Election</strong> not started yet</p>
      }
    }

    return (
      <Router>
        <div className="App container-fluid">
          <Switch>
            <Route exact path="/">
              <div className="jumbotron">
                <h1 className="display-4"> Election </h1>
                <p className="lead">Current account address: <strong>{this.state.account}</strong></p>
                {text}
                {button}
                <h3 className="mt-4">{this.state.title}</h3>
              </div>

              <div className="container">
                <div className="row">
                  <main role="main" className="col-lg-12 d-flex">
                      <Main
                        candidates={this.state.candidates}
                        account={this.state.account}
                        vote={this.vote}
                        voted={this.state.voted}
                        ended={this.state.ended}
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
