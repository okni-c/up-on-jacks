import logo from '../../assets/LogoConcept.png';
import './userheader.css';
import '../header/header.css';

import { Link } from 'react-router-dom';

function UserHeader() {
  return (
    <div className="userBackground">
      <div className="headerBoxBull container">
      <Link to='/' className="headerLink"><img src={logo} alt="up-on-jacks-logo" className="headerLogo" /></Link>
        <ul className="headerList">
          <li><a href="/">Sign Up</a></li>
          <li><a href="/">Log In</a></li>
        </ul>
      </div>
      <div className="userhero container"><img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt='User Profile'/>
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
