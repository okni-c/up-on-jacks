import { useQuery, useMutation } from '@apollo/client';
import { redirect, useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { ADD_FOLLOWER } from '../../utils/mutations';

import BuildCard from "../buildcard/buildcard";
import FollowerList from './FollowerList/FollowerList';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import close from '../../assets/webp/closebutton.webp';

import Auth from '../../utils/auth';

import '../HomeBody/HomeBody.scss';
import './userbody.scss';
import { useState } from 'react';

function UserBody() {
    const [addFollower] = useMutation(ADD_FOLLOWER);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    // redirect to personal profile page if username is the logged-in user's
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return redirect("/profile");
    }

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

    const handleClick = async () => {
        if (Auth.loggedIn() !== true) {
            setModalIsOpen(true);
        } else {
            try {
                await addFollower({
                    variables: { id: user._id }
                });
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <>
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
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
                            {userParam && (
                                <button onClick={handleClick}>
                                    Follow!
                                </button>
                            )}
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
            <Modal
                isOpen={modalIsOpen}
                closeTimeoutMS={200}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <button onClick={() => setModalIsOpen(false)}><img src={close} alt="Close Button" /></button>
                <h3>You need to login to follow users!</h3>

            </Modal>
        </>
    );
}

export default UserBody;