import './buildcard.css';
import logo from '../../assets/fiat.jpg';

function BuildCard() {
    return (
        <div className="buildcardcontainer">
            <img src={logo} alt="" className="buildcardimage" />
            <div className="buildcardinfo">
                <h3 className="buildcardheader">Jack Mehoff's 1993 Fiat Multipa</h3>
                <div className="buildcardbody">
                <div className="buildcardlist">
                <ul>
                    <li>Engine: ---</li>
                    <li>HP: ---</li>
                    <li>Torque: ---</li>
                </ul>
                </div>
                <div className="buildcarddesc">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo odio at sem pretium interdum. Quisque eleifend euismod viverra. Donec scelerisque metus eros, nec fermentum nunc tempor at. Duis ultrices risus nec mollis viverra. Donec et nibh commodo, viverra urna eget, luctus enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo odio at sem pretium interdum. Quisque eleifend euismod viverra. Donec scelerisque metus eros, nec fermentum nunc tempor at. Duis ultrices risus nec mollis viverra. Donec et nibh commodo, viverra urna eget viverra urna eget viverra urna eget viverra urna eget viverra urna eget viverra urna eget</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default BuildCard;
