import { useQuery, useMutation } from '@apollo/client';
import { redirect, useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import BuildCard from "../buildcard/buildcard";
import { motion } from 'framer-motion';

import Auth from '../../utils/auth';

import './userbuilds.scss';

function UserBuilds() {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    // redirect to personal profile page if username is the logged-in user's
    // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    //     return redirect("/profile");
    // }

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

    // const handleClick = async () => {
    //     try {
    //         await addFollower({
    //             variables: { id: user._id }
    //         });
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className='userHeroBackground'></div>
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

export default UserBuilds;