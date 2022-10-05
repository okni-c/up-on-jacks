import logo from '../../assets/ModernLogoConcept.png';
import './userheader.css';
import '../header/header.css';

import { Link } from 'react-router-dom';

function UserHeader() {
  return (
    <div className="userBackground">
      <div className="headerBoxBull container">
        <Link to='/' className="headerLink"><img src={logo} alt="up-on-jacks-logo" className="headerLogo" /></Link>
        <ul className="headerList">
          <li><a href="/">About</a></li>
          <li><a href="/">Sign Up</a></li>
          <li><a href="/">Log In</a></li>
        </ul>
      </div>
      <div className="userhero container"><img src="https://pm1.narvii.com/6311/dfa4b3ca3ad2c29eacb0b3d540ae4d6258066d24_hq.jpg" alt='User Profile' />
        <div className="userinfo">
          <h2>Anita Mazda</h2>
          <p>Mazda Driver</p>
          <p>Mazdatown, TN</p>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
