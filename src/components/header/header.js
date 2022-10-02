import logo from '../../assets/ModernLogoConcept.png';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <div className="headerBackground">
      <div className="headerBoxBull container">
          <Link to='/' className="headerLink"><img src={logo} alt="up-on-jacks-logo" className="headerLogo" /></Link>
        <ul className="headerList">
          <li><a href="/">Sign Up</a></li>
          <li><a href="/">Log In</a></li>
        </ul>
      </div>
      <div className="hero container"><h2>Within cells, interLinked</h2></div>
    </div>
  );
}

export default Header;
