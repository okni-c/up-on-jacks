import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LOGIN_USER } from "../../utils/mutations";

import Auth from '../../utils/auth';

import './login.css';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

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
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <Header />
            <motion.div initial={{ width: 0 }} animate={{ width: "100%", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}>
                <div className='userHeroBackground'>
                </div>
                <div className="container">
                    <div className="loginBox">
                        <h3>Login</h3>
                        <form onSubmit={handleFormSubmit}>
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
                                Submit
                            </button>
                        </form>

                        {error && <div>Login failed</div>}
                        <p>Not a member yet? <Link to='/signup'>Sign Up!</Link></p>
                    </div>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>
            </motion.div>
            <Footer />
        </motion.div>
    );
}

export default Login;