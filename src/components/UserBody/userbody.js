import BuildCard from "../buildcard/buildcard";
import '../HomeBody/HomeBody.css';
import './userbody.css';

function UserBody() {
    return (
        <>
            <div className="container">
                <div className="sectionbox">
                    <BuildCard />
                    <BuildCard />
                </div>
            </div>
        </>
    );
}

export default UserBody;