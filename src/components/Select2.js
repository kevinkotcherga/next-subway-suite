import React from 'react';

const Select2 = ({
	setSearchParams,
	searchParams,
	setLoading,
	station,
	allStationNames,
	line,
}) => {
	const handleStationName = e => {
		try {
			searchParams.set('station', e.target.value);
			setSearchParams(searchParams);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			{line !== 'default' && line !== null && (
				<select
					onChange={e => handleStationName(e)}
					value={station == null ? '' : station}
				>
					<option value="default">Sélectionner une station...</option>
					{allStationNames?.map(stationName => (
						<option value={stationName.name} key={stationName.name}>
							{stationName.name}
						</option>
					))}
				</select>
			)}
		</>
	);
};

export default Select2;
