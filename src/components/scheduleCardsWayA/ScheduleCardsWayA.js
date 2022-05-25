import React from 'react';

const ScheduleCardsWayA = ({ scheduleWayA }) => {
  return (
		<div className="scheduleCards">
			<p>Direction : {scheduleWayA.destination}</p>
			<p>Informations : {scheduleWayA.message}</p>
		</div>
	);
};

export default ScheduleCardsWayA;
