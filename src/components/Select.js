import React from 'react';

const Select = ({ filterOnlySubwayNumbers, line, setSearchParams }) => {
	const handleSubwayNumber = e => {
		try {
			setSearchParams({ line: e.target.value });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<select
			onChange={e => handleSubwayNumber(e)}
			value={line == null ? '' : line}
		>
			<option value="default">Sélectionner une ligne...</option>
			{filterOnlySubwayNumbers?.map(subwayNumber => (
				<option value={subwayNumber} key={subwayNumber}>
					{subwayNumber}
				</option>
			))}
		</select>
	);
};

export default Select;
