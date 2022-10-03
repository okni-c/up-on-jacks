import BuildCard from "../buildcard/buildcard";
import '../HomeBody/HomeBody.css';
import './userbody.css';

function UserBody() {
    return (
        <>
        <section className="userbodybackground">
            <div className="container">
                <div className="sectionbox userbodybackground">
                    <BuildCard />
                    <BuildCard />
                </div>
            </div>
            </section>
        </>
    );
}

export default UserBody;