import React from 'react';

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			registerEmail: '',
			registerPassword: '',
			registerName: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
		console.log(this.state.signInEmail);
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
		console.log(this.state.signInPassword);	
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	};

	onRegistration = () => {
		fetch('http://13.250.116.199:3001/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'email': this.state.registerEmail,
				'password': this.state.registerPassword,
				'name': this.state.registerName
			})
		})
		.then( response => response.json() )
		.then( user => {
			console.log(user);
			if( user.id ) {
				this.props.loadUser(user);  // for loading the user that whole app needs so should be defined in App.js
				this.props.onRouteChange('home');				
			}
		})
	};

	handleSubmitRefreshIssue = (event) => {
		event.preventDefault();
		/*The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
		For example, this can be useful when:
		Clicking on a "Submit" button, prevent it from submitting a form
		Clicking on a link, prevent the link from following the URL*/
	};

	render() {
		return (
			<div>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
					  <form className="measure" onSubmit={this.handleSubmitRefreshIssue}>
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input 
					        	onChange = {this.onNameChange}
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="name" name="name"  id="name" 
					        />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
					        	onChange = {this.onEmailChange}
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="text" name="email-address"  id="email-address" 
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
					        	onChange = {this.onPasswordChange}
					        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="password" name="password"  id="password" 
					        />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
					      	onClick = { this.onRegistration }
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Register" 
					      />
					    </div>
					  </form>
					</main>
				</article>
			</div>		
		);

	};

}

export default Register;