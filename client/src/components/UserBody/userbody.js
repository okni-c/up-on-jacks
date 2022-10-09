import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';

import BuildCard from "../buildcard/buildcard";
import FollowerList from './FollowerList/FollowerList';
import { motion } from 'framer-motion';

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
        <motion.div initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: { duration: 0.1 }}}>
            <div className='userHeroBackground'>
                <div className="userhero container"><img src={user.profileimg} alt='User Profile' />
                    <div className="userinfo">
                        <h2>{user.username}</h2>
                        <p>{user.usertitle}</p>
                        <p>{user.city}, {user.state}</p>
                        <FollowerList username={user.username}
                        profileimg={user.profileimg}
                        followerCount={user.followerCount}
                        followers={user.followers} />
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
        </motion.div>
    );
}

export default UserBody;