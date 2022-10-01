import logo from '../../assets/LogoConcept.png';
import './footer.css';

function Footer() {
    return (
        <div className="footercontainer">
            <div className="container dflex">
                <img src={logo} alt="up-on-jacks-logo" className="footerLogo" />
                <ul className="footerlist">
                    <li>About</li>
                    <li>FAQ</li>
                    <li>Careers</li>
                </ul>
            </div>
        </div>

    );
}

export default Footer;
