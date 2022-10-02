import logo from '../../assets/ModernLogoConcept.png';
import twitter from '../../assets/tw-social-icon.png'
import tiktok from '../../assets/tt-social-icon.png'
import youtube from '../../assets/yt-social-icon.png'
import './footer.css';

function Footer() {
    return (
        <div className="footerbackground dflex">
            <div className="container footercontainer dflex">
                <div>
                    <img src={logo} alt="up-on-jacks-logo" className="footerLogo" />
                    <ul className="container footerlist dflex">
                        <li>Legal</li>
                        <li>About</li>
                        <li>FAQ</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div>
                    <h2 className="">Follow Us!</h2>
                    <ul className="footersocial dflex">
                        <li><img src={twitter} alt="" /></li>
                        <li><img src={tiktok} alt="" /></li>
                        <li><img src={youtube} alt="" /></li>
                    </ul>
                </div>
            </div>

        </div>

    );
}

export default Footer;
