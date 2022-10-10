import React, { useState } from 'react';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Auth from '../../utils/auth';


function SignUp() {

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error }] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />
            <motion.div initial={{ width: 0 }} animate={{ width: "100%", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}>
                <div className='userHeroBackground'>
                </div>
                <div className="backgroundcolor">
                    <div className="container">
                        <div className="loginBox">
                            <h3>Sign Up</h3>
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    placeholder="Your username"
                                    name="username"
                                    type="username"
                                    id="username"
                                    value={formState.username}
                                    onChange={handleChange}
                                />
                                <input
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <input
                                    placeholder="Your password"
                                    name="password"
                                    type="password"
                                    id="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <button className="btn d-block w-100" type="submit">
                                    Sign Up
                                </button>
                            </form>

                            {error && <div>Signup failed</div>}
                            <p>Already have an account? <Link to='/login'>Log In!</Link></p>
                        </div>
                    </div>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>
            </motion.div>
            <Footer />
        </motion.div>
    );
}
export default SignUp;