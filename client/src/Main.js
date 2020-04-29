import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Main extends Component {
	render () {
		return (
			<div id="content">
				<table class="table">
				  	<thead class="thead-dark">
				    	<tr>
				      		<th scope="col">#</th>
				      		<th scope="col">Name</th>
				      		<th scope="col"></th>
				    	</tr>
				  	</thead>
				  	<tbody id="candidatesList">
						{
							this.props.candidates.map((candidate, key) => {
								let url = "/candidate-" + candidate.id.toString();
								return (
									<tr key={key}>
										<th scope="row">{candidate.id.toString()}</th>
										<th scope="row"><Link to={url}>{candidate.name}</Link></th>
										<td>
										{	
											!this.props.voted
											?	<button name={candidate.id}
														value={this.props.account}
														className="btn btn-success"
														onClick={(event) => {
															this.props.vote(event.target.name, event.target.value)
														}}
												>
													Vote
												</button>
											: null
										}
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Main;
