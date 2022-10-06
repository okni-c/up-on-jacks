import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

function SignUp() {
    return (
        <>
            <Header />
            <div className="container">
                <h3>Sign Up</h3>
                <form>
                    <input type="text" placeholder="Enter your username." />
                    <input type="text" placeholder="Enter your password." />
                </form>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;