import React from 'react';
import Tilt from 'react-tilt'
import logo from './Logo.png'

const Logo = () => {
	return(
		<div>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 30}} style={{ height: 100, width: 100 }} >
			 	<div className="Tilt-inner pa3"> 
			 		<img alt='logo' src={logo}></img>
			 	</div>
			</Tilt>
		</div>
	);
}

export default Logo;