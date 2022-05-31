import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorCard from '../components/errorCard/ErrorCard';
import ScheduleCardsWayA from '../components/scheduleCardsWayA/ScheduleCardsWayA';
import ScheduleCardsWayR from '../components/scheduleCardsWayR/ScheduleCardsWayR';
import './home.scss';

const Home = () => {
	const [subwayStationNumber, setSubwayStationNumber] = useState([]);
	const [uniqueStationNumber, setUniqueStationNumber] = useState('default');
	const [uniqueStationName, setUniqueStationName] = useState('default');
	const [allStationNames, setAllStationNames] = useState([]);
	const [schedulesWayA, setSchedulesWayA] = useState([]);
	const [schedulesWayR, setSchedulesWayR] = useState([]);
	const [errorWayA, setErrorWayA] = useState(false);
	const [errorWayR, setErrorWayR] = useState(false);

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
			setUniqueStationNumber(e.target.value);
			setSearchParams({ line: e.target.value });
		} catch (err) {
			console.log(err);
		}
	};

	// Recupération du nom des stations
	useEffect(() => {
		const getStationNames = async () => {
			if (line !== 'default') {
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
			setUniqueStationName(e.target.value);
			searchParams.set('station', e.target.value);
			setSearchParams(searchParams);
		} catch (err) {
			console.log(err);
		}
	};

	// Recupération des horraires d'une station voie A
	useEffect(() => {
		const getSchedulesWayA = async () => {
			if (station !== 'default') {
				try {
					const { data } = await axios.get(
						`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${line}/${station}/A`,
					);
					setSchedulesWayA(data.result.schedules);
					setErrorWayA(false);
				} catch (err) {
					setErrorWayA(true);
					console.log(err);
				}
			}
		};
		getSchedulesWayA();
	}, [station]);

	// Recupération des horraires d'une station voie R
	useEffect(() => {
		const getSchedulesWayR = async () => {
			if (station !== 'default') {
				try {
					const { data } = await axios.get(
						`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${line}/${station}/R`,
					);
					setSchedulesWayR(data.result.schedules);
					setErrorWayR(false);
				} catch (err) {
					setErrorWayR(true);
					console.log(err);
				}
			}
		};
		getSchedulesWayR();
	}, [station]);

	return (
		<div className="home">
			<div className="mainContainer">
				<div className="container">
					<form>
						<select
							defaultValue={uniqueStationNumber}
							onChange={e => handleSubwayNumber(e)}
						>
							<option value="default">Sélectionner une ligne...</option>
							{filterOnlySubwayNumbers?.map(subwayNumber => (
								<option value={subwayNumber} key={subwayNumber}>
									{subwayNumber}
								</option>
							))}
						</select>
						{line !== 'default' && uniqueStationNumber !== 'default' && (
							<select
								defaultValue={uniqueStationName}
								onChange={e => handleStationName(e)}
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
							uniqueStationNumber !== 'default' &&
							uniqueStationName !== 'default' &&
							station !== 'default' && (
								<>
									{errorWayA ? (
										<ErrorCard className="scheduleCards error" />
									) : (
										<>
											{schedulesWayA?.map(scheduleWayA => (
												<ScheduleCardsWayA
													key={scheduleWayA.message}
													scheduleWayA={scheduleWayA}
													className="scheduleCards"
												/>
											))}
										</>
									)}
									{errorWayR ? (
										<ErrorCard className="scheduleCards error" />
									) : (
										<>
											{schedulesWayR?.map(scheduleWayR => (
												<ScheduleCardsWayR
													key={scheduleWayR.message}
													scheduleWayR={scheduleWayR}
													className="scheduleCards"
												/>
											))}
										</>
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
