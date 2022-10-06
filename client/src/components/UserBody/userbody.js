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
                <div className="userhero container"><img src={user.profileimg} alt='User Profile' />
                    <div className="userinfo">
                        <h2>{user.username}</h2>
                        <p>{user.usertitle}</p>
                        <p>{user.city}, {user.state}</p>
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