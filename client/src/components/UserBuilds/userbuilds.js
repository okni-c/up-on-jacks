import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import BuildCard from "../buildcard/buildcard";
import { motion } from 'framer-motion';

import close from '../../assets/webp/closebutton.webp';

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
        model: '',
        mods: [{
            modtitle: ''
        }],
        buildimages: [{
            image: ''
        }]
    });

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;


        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // update state of mods object
    const handleChangeMods = (event) => {
        const { name, value } = event.target;

        setFormState ({
            ...formState,
            mods: {[name]: value}
        });
    };

    // update state of buildimages object
    const handleChangeImages = (event) => {
        const { name, value } = event.target;

        setFormState ({
            ...formState,
            buildimages: {[name]: value}
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
                <form onSubmit={handleFormSubmit}>
                    <textarea
                        placeholder="buildDescription"
                        name="buildDescription"
                        type="text"
                        id="buildDescription"
                        rows="4" cols="50"
                        value={formState.buildDescription}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="year"
                        name="year"
                        type="text"
                        id="year"
                        value={formState.year}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="manufacturer"
                        name="manufacturer"
                        type="text"
                        id="manufacturer"
                        value={formState.manufacturer}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="model"
                        name="model"
                        type="text"
                        id="model"
                        value={formState.model}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="mod"
                        name="modtitle"
                        type="text"
                        id="modtitle"
                        value={formState.modtitle}
                        onChange={handleChangeMods}
                    />
                    <input
                        placeholder="mod"
                        name="modtitle"
                        type="text"
                        id="modtitle"
                        value={formState.modtitle}
                        onChange={handleChangeMods}
                    />
                    <input
                        placeholder="mod"
                        name="modtitle"
                        type="text"
                        id="modtitle"
                        value={formState.modtitle}
                        onChange={handleChangeMods}
                    />
                    <input
                        placeholder="buildImages url"
                        name="image"
                        type="text"
                        id="image"
                        value={formState.image}
                        onChange={handleChangeImages}
                    />
                    <input
                        placeholder="buildImages url"
                        name="image"
                        type="text"
                        id="image"
                        value={formState.image}
                        onChange={handleChangeImages}
                    />
                    <input
                        placeholder="buildImages url"
                        name="image"
                        type="text"
                        id="image"
                        value={formState.image}
                        onChange={handleChangeImages}
                    />
                    <button type="submit">
                        Submit
                    </button>
                </form>

            </Modal>
        </>
    );
}

export default UserBuilds;