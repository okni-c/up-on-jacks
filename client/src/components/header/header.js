import logo from '../../assets/ModernLogoConcept.png';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <div className="headerBackground">
      <div className="headerBoxBull container">
        <Link to='/' className="headerLink"><img src={logo} alt="up-on-jacks-logo" className="headerLogo" /></Link>
        <ul className="headerList">
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
