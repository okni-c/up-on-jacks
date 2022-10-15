import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import BuildCard from "../buildcard/buildcard";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import './userbuilds.scss';

function UserBuilds() {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className='userHeroBackground'></div>
            <section className="userbodybackground">
                <div className="container">
                    <ul className="buildsOptions">
                        <li><Link to="/">+Add New Build</Link></li>
                    </ul>
                    <div className="sectionbox userbodybackground">
                        <BuildCard builds={user.builds} />
                    </div>
                </div>
            </section>
        </motion.div>
    );
}

export default UserBuilds;