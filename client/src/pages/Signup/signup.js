import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { Link } from 'react-router-dom';


function SignUp() {
    return (
        <>
            <Header />
            <div className='userHeroBackground'>
            </div>
            <div className="backgroundcolor">
            <div className="container">
                <div className="loginBox">
                    <h3>Sign Up</h3>
                    <form>
                        <input type="text" placeholder="Enter your email" />
                        <input type="text" placeholder="Enter your password" />
                    </form>
                    <button type="button">Sign Up</button>
                    <p>Already have an account? <Link to='/login'>Log In!</Link></p>
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;