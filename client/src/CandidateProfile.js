import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

class CandidateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { name: null, bio: null, photo: null }
    }

    componentDidMount = async () => {
        const id = this.props.match.params.id;
        this.fetchData(id);
    }

    fetchData = async(id) => {
        const candidateName = await this.props.contract.methods.getCandidateName(id).call();
        const candidateBio = await this.props.contract.methods.getCandidateBio(id).call();
        const candidatePhoto = await this.props.contract.methods.getCandidatePhoto(id).call();
        this.setState({ name: candidateName, bio: candidateBio, photo: candidatePhoto });
    }

    render () {
        return (
            <React.Fragment>
                <Container>
                    <Link className="text-dark h5" style={{float: "left"}} to="/">Back</Link>
                    <h2 className="my-3">Candidate Profile</h2>
                    <Row>
                        <Col>
                            <h3 className="mb-3">{this.state.name}</h3>
                            <p>{this.state.bio}</p>
                        </Col>
                        <Col>
                            <img className="fluid" height="500" float="right" src={this.state.photo} alt="photo"/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(CandidateProfile);
