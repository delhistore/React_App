import React from 'react';
import 'tachyons';

const Rank = ({name,entries}) => {

	return (
		<div>
			<div className='center f2'>
				{`${name} , Your score is ... `}
			</div>
			<div className="center white f1 pa-3">
				{entries}
			</div>
		</div>
	);

}

export default Rank;