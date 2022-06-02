import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorCard from '../components/ErrorCard';
import ScheduleCard from '../components/ScheduleCard';
import './home.scss';

const Home = () => {
	const [subwayStationNumber, setSubwayStationNumber] = useState([]);
	const [allStationNames, setAllStationNames] = useState([]);
	const [schedulesWayA, setSchedulesWayA] = useState([]);
	const [schedulesWayR, setSchedulesWayR] = useState([]);
	const [errorWayA, setErrorWayA] = useState(false);
	const [errorWayR, setErrorWayR] = useState(false);

  // Chargement des éléments
  const [loading, setLoading] = useState(false);

	// useSearchParams envoie les paramètres à l'url
	const [searchParams, setSearchParams] = useSearchParams();
	// La valeur est récupéré avec onChange dans handleSubwayNumber et handleStationName
	const line = searchParams.get('line');
	const station = searchParams.get('station');

	// Récupération du numéro des stations de métro depuis l'API
	useEffect(() => {
		const getSubwayStationNumbers = async () => {
			try {
				const { data } = await axios.get(
					'https://api-ratp.pierre-grimaud.fr/v4/lines/metros',
				);
				setSubwayStationNumber(data.result.metros);
			} catch (err) {
				console.log(err);
			}
		};
		getSubwayStationNumbers();
	}, []);

	// Map des numéros de stations de métro pour ne récupérer que les nombres
	const mapSubwayNames = subwayStationNumber.map(subwayName => subwayName.code);
	const filterOnlySubwayNumbers = mapSubwayNames.filter(Number);

	// Récupération du numéro d'une ligne de métro avec onChange
	const handleSubwayNumber = e => {
		try {
			setSearchParams({ line: e.target.value });
		} catch (err) {
			console.log(err);
		}
	};

	// Recupération du nom des stations
	useEffect(() => {
		const getStationNames = async () => {
			if (line !== 'default' && line !== null) {
				try {
					const { data } = await axios.get(
						`https://api-ratp.pierre-grimaud.fr/v4/stations/metros/${line}`,
					);
					setAllStationNames(data.result.stations);
				} catch (err) {
					console.log(err);
				}
			}
		};
		getStationNames();
	}, [line]);

	// Récupération du nom d'une station avec onChange
	const handleStationName = e => {
		try {
			searchParams.set('station', e.target.value);
			setSearchParams(searchParams);
      setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	// Recupération des horraires d'une station voie A
	useEffect(() => {
		const getSchedulesWayA = async () => {
			if (station !== 'default' && station !== null) {
				try {
					const { data } = await axios.get(
						`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${line}/${station}/A`,
					);
					setSchedulesWayA(data.result.schedules);
					setErrorWayA(false);
					setLoading(true);
				} catch (err) {
          setLoading(true);
					setErrorWayA(true);
					console.log(err);
				}
			}
		};
		getSchedulesWayA();
	}, [line, station]);

	// Recupération des horraires d'une station voie R
	useEffect(() => {
		const getSchedulesWayR = async () => {
			if (station !== 'default' && station !== null) {
				try {
					const { data } = await axios.get(
						`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${line}/${station}/R`,
					);
					setSchedulesWayR(data.result.schedules);
					setErrorWayR(false);
					setLoading(true);
				} catch (err) {
          setLoading(true);
					setErrorWayR(true);
					console.log(err);
				}
			}
		};
		getSchedulesWayR();
	}, [line, station]);

	return (
		<div className="home">
			<div className="mainContainer">
				<div className="container">
					<form>
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
					</form>

					<div className="results">
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
			</div>
		</div>
	);
};

export default Home;
