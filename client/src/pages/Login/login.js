import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { Link } from 'react-router-dom';

import './login.css';

function Login() {
    return (
        <>
            <Header />
            <div className='userHeroBackground'>
            </div>
            <div className="container">
                <div className="loginBox">
                    <h3>Login</h3>
                    <form>
                        <input type="text" placeholder="Enter your email" />
                        <input type="text" placeholder="Enter your password" />
                    </form>
                    <button type="button">Log In</button>
                    <p>Not a member yet? <Link to='/signup'>Sign Up!</Link></p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;