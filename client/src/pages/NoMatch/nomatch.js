import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

function NoMatch() {
    return (
        <>
            <Header />
            <div className="container">
                <h3>Sorry, this page does not exist. 404 Error.</h3>
            </div>
            <Footer />
        </>
    );
}

export default NoMatch;