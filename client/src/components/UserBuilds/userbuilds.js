import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import BuildCard from "../buildcard/buildcard";
import { motion } from 'framer-motion';

import close from '../../assets/webp/closebutton.webp';
import addimage from '../../assets/webp/add-image.webp';
import plus from '../../assets/webp/add.webp';

import { useState } from 'react';

import Modal from 'react-modal';

import './userbuilds.scss';
import { ADD_BUILD } from '../../utils/mutations';

function UserBuilds() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addBuild] = useMutation(ADD_BUILD);

    const [formState, setFormState] = useState({
        buildDescription: '',
        year: '',
        manufacturer: '',
        model: ''
    });

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
        try {
            await addBuild({
                variables: { ...formState },
            });
        } catch (e) {
            console.error(e);
        }
    };

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

    const handleClick = async () => {
        setModalIsOpen(true);
    }

    return (
        <>
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
                <div className='userHeroBackground'></div>
                <section className="userbodybackground">
                    <div className="container">
                        <ul className="buildsOptions">
                            <li><button onClick={handleClick}>+Add New Build</button></li>
                        </ul>
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
                <h3>Build Form</h3>
                <form onSubmit={handleFormSubmit} className="buildForm">
                    <div className="userInputs">
                        <input
                            placeholder="Year"
                            name="year"
                            type="text"
                            id="year"
                            value={formState.year}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Manufacturer"
                            name="manufacturer"
                            type="text"
                            id="manufacturer"
                            value={formState.manufacturer}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Model"
                            name="model"
                            type="text"
                            id="model"
                            value={formState.model}
                            onChange={handleChange}
                        />
                    </div>
                    <img src={addimage} alt="add" />
                    <h4>Description</h4>
                    <textarea
                        placeholder="Enter Description Here..."
                        name="buildDescription"
                        type="text"
                        id="buildDescription"
                        rows="4" cols="50"
                        value={formState.buildDescription}
                        onChange={handleChange}
                    />
                    <h4>Mods</h4>
                    <ul>
                        <li>Engine/Transmission/Exhaust</li>
                        <li><img src={plus} alt="plus-sign" /><input placeholder="Enter mod here..."
                            name="model"
                            type="text"
                            id="model"
                            value={formState.model}
                            onChange={handleChange} /></li>
                        <li>Wheels/Tires</li>
                        <li><img src={plus} alt="plus-sign" /><input placeholder="Enter mod here..."
                            name="model"
                            type="text"
                            id="model"
                            value={formState.model}
                            onChange={handleChange} /></li>
                        <li>Interior/Exterior</li>
                        <li><img src={plus} alt="plus-sign" /><input placeholder="Enter mod here..."
                            name="model"
                            type="text"
                            id="model"
                            value={formState.model}
                            onChange={handleChange} /></li>
                    </ul>
                    <button type="submit">
                        Submit
                    </button>
                </form>

            </Modal>
        </>
    );
}

export default UserBuilds;