import React from 'react';

const ScheduleCard= ({ schedule }) => {
  return (
		<div className="scheduleCards">
			<p>Direction : {schedule.destination}</p>
			<p>Informations : {schedule.message}</p>
		</div>
	);
};

export default ScheduleCard;
