import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import BuildCard from "../buildcard/buildcard";
import { motion } from 'framer-motion';

import close from '../../assets/webp/closebutton.webp';
import addimage from '../../assets/webp/add-image.webp';
//import plus from '../../assets/webp/add.webp';

import { useState } from 'react';

import Modal from 'react-modal';

import './userbuilds.scss';
import { ADD_BUILD } from '../../utils/mutations';

function UserBuilds() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modsFields, setModsFields] = useState([{modtitle: ''}])
    const [imgsFields, setImgsFields] = useState([{image: ''}])

    const [addBuild] = useMutation(ADD_BUILD);

    const [formState, setFormState] = useState({
        buildDescription: '',
        year: '',
        manufacturer: '',
        model: '',
        mods: modsFields,
        buildimages: imgsFields
    });

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const addModFields = (e) => {
        e.preventDefault();
        let newMod = { modtitle: '' };
        setModsFields([...modsFields, newMod]);
    }

    const removeModFields = (index, event) => {
        event.preventDefault();
        let modsData = [...modsFields];
        modsData.splice(index, 1)
        setModsFields(modsData)
    }

    const addImgFields = (e) => {
        e.preventDefault();
        let newImage = { image: '' };
        setImgsFields([...imgsFields, newImage]);
    }

    const removeImgFields = (index, event) => {
        event.preventDefault();
        let imgsData = [...imgsFields];
        imgsData.splice(index, 1)
        setImgsFields(imgsData)
    }

    // update state of mods array with object(s)
    const handleChangeMods = (index, event) => {
        let modsData = [...modsFields];
        modsData[index][event.target.name] = event.target.value;
        setModsFields(modsData);
        setFormState({...formState, mods: modsData})
    };

    // update state of buildimages array with object(s)
    const handleChangeImages = (index, event) => {
        let imgsData = [...imgsFields];
        imgsData[index][event.target.name] = event.target.value;
        setImgsFields(imgsData);
        setFormState({...formState, buildimages: imgsData})
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
                    <button onClick={addImgFields}>Add img</button>
                    <ul>
                    {imgsFields.map((inputImg, index) => {
                            return (
                                <li key={index}>
                                    <input
                                        placeholder="Enter image url..."
                                        name="image"
                                        type="text"
                                        value={inputImg.image}
                                        onChange={event => handleChangeImages(index, event)} />
                                        <button onClick={event => removeImgFields(index, event)}>Remove</button>
                                </li>)
                        })}
                    </ul>
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
                    <button onClick={addModFields}>Add mod</button>
                    <ul>
                        {modsFields.map((inputMod, index) => {
                            return (
                                <li key={index}>
                                    <input
                                        placeholder="Enter mod here..."
                                        name="modtitle"
                                        type="text"
                                        value={inputMod.modtitle}
                                        onChange={event => handleChangeMods(index, event)} />
                                        <button onClick={event => removeModFields(index, event)}>Remove</button>
                                </li>)
                        })}

                        {/* <li>Engine/Transmission/Exhaust</li>
                        <li><img src={plus} alt="plus-sign" /><input placeholder="Enter mod here..."
                            name="modtitle"
                            type="text"
                            id="modtitle1"
                            value={formState.modtitle}
                            onChange={handleChangeMods} /></li>
                        <li>Wheels/Tires</li>
                        <li><img src={plus} alt="plus-sign" /><input placeholder="Enter mod here..."
                            name="modtitle"
                            type="text"
                            id="modtitle2"
                            value={formState.modtitle}
                            onChange={handleChangeMods} /></li>
                        <li>Interior/Exterior</li>
                        <li><img src={plus} alt="plus-sign" /><input placeholder="Enter mod here..."
                            name="modtitle"
                            type="text"
                            id="modtitle3"
                            value={formState.modtitle}
                            onChange={handleChangeMods} /></li> */}
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