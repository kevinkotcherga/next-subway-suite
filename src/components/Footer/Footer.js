import React from 'react';
import './footer.scss';
import Logo from '../../img/logo_ratp_8.svg';
import {
	AiFillFacebook,
	AiOutlineInstagram,
	AiOutlineTwitter,
	AiOutlineLinkedin,
} from 'react-icons/ai';

const Footer = () => {
	return (
		<div className="footer">
			<div className="footerTop">
				<img src={Logo} alt="" />
				<div className="footerNav">
					<p>Accès direct</p>
					<p>Aide & Contact</p>
					<p>Médiateur de la RATP</p>
					<p>Télépaiement d'amende</p>
					<p>Le Groupe Ratp</p>
					<p>Les avantages maRATP</p>
				</div>
				<div className="footerMedias">
					<div className="title">Restons connectés</div>
					<div className="footerMediasLogos">
						<AiFillFacebook
							size={15}
							style={{ cursor: 'pointer', marginRight: '20px' }}
						/>
						<AiOutlineInstagram
							size={15}
							style={{ cursor: 'pointer', marginRight: '20px' }}
						/>
						<AiOutlineTwitter
							size={15}
							style={{ cursor: 'pointer', marginRight: '20px' }}
						/>
						<AiOutlineLinkedin
							size={15}
							style={{ cursor: 'pointer', marginRight: '20px' }}
						/>
					</div>
					<p>Plan du site</p>
					<p>Accesibilité web</p>
					<p>Données personnelles</p>
					<p>Mentions légales</p>
					<p>Tout savoir sur les cookies</p>
					<p>Politique générale de confidentialité</p>
					<p>Gérer vos cookies</p>
				</div>
			</div>
			<div className="footerBottom">
				<div className="footerBottomContainer">
					<p>A découvrir :</p>
					<ul>
						<li>Accès à l’aéroport CDG</li>|<li>Accès à l’aéroport Orly</li>|
						<li>Accès à l’aéroport Beauvais</li>|
						<li>Voir le plan des lignes</li>|
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
