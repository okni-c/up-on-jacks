import logo from '../../assets/LogoConcept.png';
import './header.css';

function Header() {
  return (
    <div className="headerBackground">
      <div className="headerBoxBull container">
        <img src={logo} alt="up-on-jacks-logo" className="headerLogo" />
        <ul className="headerList">
          <li><a href="#">Sign Up</a></li>
          <li><a href="#">Log In</a></li>
        </ul>
      </div>
      <div className="hero container"><h2>Car website</h2><p>Once open, it could be closed for 30 to 45 minutes for car entries, but would not affect traffic into the mall or on the day.

        Paul Joyce, the mall's executive director of marketing and business, told</p></div>
    </div>
  );
}

export default Header;
