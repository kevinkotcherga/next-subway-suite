import React from 'react';
import Logo from '../../img/logo_ratp_5.svg';
import './header.scss';
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';

const Header = () => {
	return (
		<div className="header">
			<div className="headerContainer">
				<div className="headerText">
					<img src={Logo} alt="" />
					<p>Préparez votre séjour à Paris</p>
				</div>
				<div className="headerLogos">
					<BsInstagram size={22} style={{ cursor: 'pointer' }} />
					<BsFacebook
						size={22}
						style={{ marginLeft: '30px', cursor: 'pointer' }}
					/>
					<BsTwitter
						size={22}
						style={{ marginLeft: '30px', cursor: 'pointer' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
