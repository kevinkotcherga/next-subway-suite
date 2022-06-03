import React from 'react';
import ErrorCard from './ErrorCard';
import ScheduleCard from './ScheduleCard';

const Results = ({
	line,
	station,
	loading,
	errorWayA,
	schedulesWayA,
	errorWayR,
	schedulesWayR,
	className,
}) => {
	return (
		<div>
			<div className={className}>
				<p>Résultats</p>
				{line !== 'default' &&
					line !== null &&
					station !== 'default' &&
					station !== null && (
						<>
							{loading ? (
								<>
									{errorWayA ? (
										<ErrorCard className="scheduleCards error" />
									) : (
										<>
											{schedulesWayA?.map(schedule => (
												<ScheduleCard
													key={schedule.message}
													schedule={schedule}
													className="scheduleCards"
												/>
											))}
										</>
									)}
									{errorWayR ? (
										<ErrorCard className="scheduleCards error" />
									) : (
										<>
											{schedulesWayR?.map(schedule => (
												<ScheduleCard
													key={schedule.message}
													schedule={schedule}
													className="scheduleCards"
												/>
											))}
										</>
									)}
								</>
							) : (
								'Chargement...'
							)}
						</>
					)}
			</div>
		</div>
	);
};

export default Results;
