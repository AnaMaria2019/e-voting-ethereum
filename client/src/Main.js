import React, { Component } from 'react';

class Main extends Component {
	render () {
		return (
			<div id="content">

				<table class="table">

				  	<thead class="thead-dark">
				    	<tr>
				      		<th scope="col">#</th>
				      		<th scope="col">Name</th>
				      		<th scope="col">Biography</th>
				      		<th scope="col"></th>
				    	</tr>
				  	</thead>
				  	
				  	<tbody id="candidatesList">
						{
							this.props.candidates.map((candidate, key) => {
								return (
									<tr key={key}>
										<th scope="row">{candidate.id.toString()}</th>
										<th scope="row">{candidate.name}</th>
										<th scope="row">{candidate.bio}</th>
										
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
