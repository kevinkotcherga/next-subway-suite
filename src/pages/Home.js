import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import Form from '../components/Form';
import Header from '../components/Header/Header';
import Results from '../components/Results';
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

	// Get schedules way A
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

	// Get schedules way R
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

	useEffect(() => {
		const getSchedules = async () => {};
		if (station !== 'default' && station !== null) {
		}
		getSchedules();
	}, [station]);

	return (
		<div className="home">
			<div className="mainContainer">
				<Header />
				<Banner />
				<div className="container">
					<h1>Les horraires du métro en direct :</h1>
					<p>
						La RATP vous transporte à Paris et en Ile-de-France de jour comme de
						nuit.
					</p>
					<Form
						line={line}
						station={station}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
						filterOnlySubwayNumbers={filterOnlySubwayNumbers}
						allStationNames={allStationNames}
						setLoading={setLoading}
						className="formClass"
					/>
					<Results
						line={line}
						station={station}
						loading={loading}
						errorWayA={errorWayA}
						schedulesWayA={schedulesWayA}
						errorWayR={errorWayR}
						schedulesWayR={schedulesWayR}
						className="results"
					/>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Home;
