import React from 'react';
import Tilt from 'react-tilt'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange , onButtonSubmit }) => {

	return (
		<div>
			<p className='f3'>
				{'This App will detect a Face in your pictures.'}
			</p>
			<Tilt className='center'>
				<div className='Tilt-inner form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-black' onClick={onButtonSubmit} >
 						{'Detect'}
					</button>
				</div>
			</Tilt>	
		</div>		
	);

}

export default ImageLinkForm;