import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './settingsBody.scss';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { MOD_USER } from '../../utils/mutations';

import { useQuery, useMutation } from '@apollo/client';

function SettingsBody() {
    const [modifyUser] = useMutation(MOD_USER);
    const [formState, setFormState] = useState({
        userId: '',
        username: '',
        usertitle: '',
        city: '',
        state: '',
        profileimg: '',
        bio: ''
    });

    const { loading, data } = useQuery(QUERY_ME_BASIC);

    const user = data?.me || {};

    useEffect(() => {
        setFormState({
            userId: user._id || '',
            username: user.username || '',
            usertitle: user.usertitle || '',
            city: user.city || '',
            state: user.state || '',
            profileimg: user.profileimg || '',
            bio: user.bio || ''
        })
    },[user.username, user.usertitle, user.city, user.state, user.profileimg, user.bio, user._id]);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            await modifyUser({
                variables: { ...formState },
            });
        } catch (e) {
            console.error(e);
        }
        
    }

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
            <div className='userHeroBackground'>
                <div className="hero container">
                    <h1>Settings</h1>
                </div>
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit} className="settings-form" id="settings-form">
                    <label htmlFor="settings-form">Account Info</label>
                    <label htmlFor='profileimg'>Profile Picture URL</label>
                    <input placeholder="profileimg"
                        name="profileimg"
                        type="text"
                        id="profileimg"
                        value={formState.profileimg}
                        onChange={handleChange}
                         />
                    <label htmlFor='username'>Username</label>
                    <input placeholder="username"
                        name="username"
                        type="text"
                        id="username"
                        value={formState.username}
                        onChange={handleChange}
                        required />
                    <label htmlFor='usertitle'>Title</label>
                    <input placeholder="usertitle"
                        name="usertitle"
                        type="text"
                        id="usertitle"
                        value={formState.usertitle}
                        onChange={handleChange} />
                    <label htmlFor='city'>City</label>
                    <input placeholder="city"
                        name="city"
                        type="text"
                        id="city"
                        value={formState.city}
                        onChange={handleChange}/>
                    <label htmlFor='state'>State</label>
                    <input placeholder="state"
                        name="state"
                        type="text"
                        id="state"
                        value={formState.state}
                        onChange={handleChange}/>
                    <label htmlFor='bio'>Bio</label>
                    <input placeholder="bio"
                        name="bio"
                        type="text"
                        id="bio"
                        value={formState.bio}
                        onChange={handleChange}/>
                    <button type='submit'>Save Changes</button>
                </form>
            </div>

        </motion.div>
    );
}

export default SettingsBody;