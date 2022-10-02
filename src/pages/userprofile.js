import logo from '../assets/LogoConcept.png';
import userprofback from '../assets/userprofback.png'
import BuildCard from '../components/buildcard/buildcard';
import Footer from '../components/footer/footer';
import './userprofile.css';

function Userprofile() {
    return (
        <>
            <div className="userBackground">
                <div className="headerBoxBull container">
                    <img src={logo} alt="up-on-jacks-logo" className="userLogo" />
                    <ul className="headerList">
                        <li><a href="#">Sign Up</a></li>
                        <li><a href="#">Log In</a></li>
                    </ul>
                </div>
                <div className="userhero container"><img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" />
                    <div className="userinfo">
                        <h2>Anita Mazda</h2>
                        <p>Mazda Driver</p>
                        <p>Mazdatown, TN</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="sectionbox">
            <BuildCard />
            <BuildCard />
            </div>
            </div>
            <Footer />
        </>
    );
}

export default Userprofile;
