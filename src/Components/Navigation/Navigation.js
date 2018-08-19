import React from 'react';
import 'tachyons';
import './Navigation.css'
import Logo from '../Logo/Logo.js'

const Navigation = ({isSignedIn , onRouteChange}) => {

	if(isSignedIn) {
		return (
			<div className='container headerCss pa4 br3 shadow-5'>
				<div style={{float: 'left'}}>
					<Logo />
				</div>
				<div style={{float: 'right'}}>
					<p 
						onClick = { () => onRouteChange('signIn') } 
						className='f3 link dim black underline pa3 pointer' 
						style={{color: 'white'}}
					>
						Sign Out
					</p>
				</div>
			</div>
		);
	}
	else {
		return(
			<div className='headerCss pa4 br3 shadow-5'>
				<div style={{float: 'left'}}>
					<Logo />
				</div>
				<nav style={{display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', height:'150px'}}>
						<p  onClick={() => onRouteChange('signIn')} 
							className='f3 link dim black underline pa3 pointer' 
							style={{color: 'white'}}
						>
							Sign In
						</p>
						<p  onClick={() => onRouteChange('register')} 
							className='f3 link dim black underline pa3 pointer' 
							style={{color: 'white'}}
						>
							Register
						</p>
				</nav>
			</div>
		);
	}

}


export default Navigation;