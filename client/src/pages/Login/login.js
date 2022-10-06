import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

function Login() {
    return (
        <>
            <Header />
            <div className="container">
                <h3>Login</h3>
                <form>
                    <input type="text" placeholder="Enter your email." />
                    <input type="text" placeholder="Enter your password." />
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;