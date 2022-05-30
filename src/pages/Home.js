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

  const [searchParams, setSearchParams] = useSearchParams();

  const subwayNumber = searchParams.get('subwayNumber');
  const stationName = searchParams.get('stationName');

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
      setSearchParams({ subwayNumber: e.target.value });
		} catch (err) {
			console.log(err);
		};
	};

	// Recupération du nom des stations
	useEffect(() => {
		const getStationNames = async () => {
      if (uniqueStationNumber !== 'default') {
        try {
          const { data } = await axios.get(
            `https://api-ratp.pierre-grimaud.fr/v4/stations/metros/${uniqueStationNumber}`,
          );
          setAllStationNames(data.result.stations);
        } catch (err) {
          console.log(err);
        };
      };
		};
		getStationNames();
	}, [uniqueStationNumber]);

	// Récupération du nom d'une station avec onChange
	const handleStationName = e => {
		try {
			setUniqueStationName(e.target.value);
     searchParams.set('subwayName', e.target.value);
     setSearchParams(searchParams);
		} catch (err) {
			console.log(err);
		};
	};

	// Recupération des horraires d'une station voie A
	useEffect(() => {
		const getSchedulesWayA = async () => {
			if (uniqueStationName !== 'default') {
				try {
					const { data } = await axios.get(
						`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${uniqueStationNumber}/${uniqueStationName}/A`,
					);
					setSchedulesWayA(data.result.schedules);
          setErrorWayA(false);
				} catch (err) {
          setErrorWayA(true);
					console.log(err);
				}
			};
		};
		getSchedulesWayA();
	}, [uniqueStationName]);

	// Recupération des horraires d'une station voie R
	useEffect(() => {
		const getSchedulesWayR = async () => {
			if (uniqueStationName !== 'default') {
				try {
					const { data } = await axios.get(
						`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${uniqueStationNumber}/${uniqueStationName}/R`,
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
	}, [uniqueStationName]);

	return (
		<div className="home">
			<div className="mainContainer">
				<div className="container">
					<form>
						<select
							defaultValue={uniqueStationNumber}
							value={subwayNumber}
							onChange={e => handleSubwayNumber(e)}
						>
							<option value="default">Sélectionner une ligne...</option>
							{filterOnlySubwayNumbers?.map(subwayNumber => (
								<option value={subwayNumber} key={subwayNumber}>
									{subwayNumber}
								</option>
							))}
						</select>
						{uniqueStationNumber !== 'default' && (
							<select
								defaultValue={uniqueStationName}
								value={stationName}
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
						{uniqueStationNumber !== 'default' &&
							uniqueStationName !== 'default' && (
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
