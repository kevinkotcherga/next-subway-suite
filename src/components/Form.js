import React from 'react';
import Select from './Select';
import Select2 from './Select2';

const Form = ({
	filterOnlySubwayNumbers,
	line,
	setSearchParams,
	searchParams,
	setLoading,
	station,
	allStationNames,
	className,
}) => {
	return (
		<div className={className}>
			<Select
				filterOnlySubwayNumbers={filterOnlySubwayNumbers}
				line={line}
				setSearchParams={setSearchParams}
				station={station}
			/>
			<Select2
				allStationNames={allStationNames}
				line={line}
				searchParams={searchParams}
				setSearchParams={setSearchParams}
				setLoading={setLoading}
				station={station}
			/>
		</div>
	);
};

export default Form;
