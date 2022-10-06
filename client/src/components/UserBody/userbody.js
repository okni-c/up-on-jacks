import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';

import BuildCard from "../buildcard/buildcard";
import '../HomeBody/HomeBody.css';
import './userbody.css';

function UserBody() {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    });

    const user = data?.user || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='userHeroBackground'>
                <div className="userhero container"><img src="https://pm1.narvii.com/6311/dfa4b3ca3ad2c29eacb0b3d540ae4d6258066d24_hq.jpg" alt='User Profile' />
                    <div className="userinfo">
                        <h2>{user.username}</h2>
                        <p>Mazda Driver</p>
                        <p>Mazdatown, TN</p>
                    </div>
                </div>
            </div>
            <section className="userbodybackground">
                <div className="container">
                    <div className="sectionbox userbodybackground">
                        <BuildCard builds={user.builds} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserBody;