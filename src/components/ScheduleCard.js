import React from 'react';

const ScheduleCard = ({ schedule, className }) => {
	return (
		<div className={className}>
			<p>Direction : {schedule.destination}</p>
			<p>Informations : {schedule.message}</p>
		</div>
	);
};

export default ScheduleCard;
