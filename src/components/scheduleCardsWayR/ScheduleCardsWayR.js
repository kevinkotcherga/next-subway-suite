import React from 'react';

const ScheduleCardsWayR = ( { scheduleWayR }) => {
  return (
		<div className="scheduleCards">
			<p>Direction : {scheduleWayR.destination}</p>
			<p>Informations : {scheduleWayR.message}</p>
		</div>
	);
};

export default ScheduleCardsWayR;
