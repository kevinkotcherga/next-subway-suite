import React from 'react';
import Select from './Select';

const Form = ({ filterOnlySubwayNumbers, line, setSearchParams }) => {
	return (
		<div>
			<Select
				filterOnlySubwayNumbers={filterOnlySubwayNumbers}
				line={line}
				setSearchParams={setSearchParams}
			/>
		</div>
	);
};

export default Form;
