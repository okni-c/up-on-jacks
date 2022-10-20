import { useQuery, useMutation } from '@apollo/client';
// import { useParams } from 'react-router-dom';
import { QUERY_ME } from '../../utils/queries';
import { ADD_BUILD } from '../../utils/mutations';

import BuildCardModify from "../buildcard/buildCardModify/buildCardModify";
import { motion } from 'framer-motion';

import close from '../../assets/webp/closebutton.webp';
import plus from '../../assets/webp/add.webp';
import trash from '../../assets/webp/trash.webp';

import { useState, useEffect } from 'react';

import Modal from 'react-modal';

import './buildsBody.scss';

function BuildsBody() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modsFields, setModsFields] = useState([{ modtitle: '' }]);
    const [imgsFields, setImgsFields] = useState([{ image: '' }]);

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || {};

    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [modalIsOpen]);

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
        if (modsData.length > 1) {
            modsData.splice(index, 1);
            setModsFields(modsData);
        }
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
        if (imgsData.length > 1) {
            imgsData.splice(index, 1);
            setImgsFields(imgsData);
        }
    }

    // update state of mods array with object(s)
    const handleChangeMods = (index, event) => {
        let modsData = [...modsFields];
        modsData[index][event.target.name] = event.target.value;
        setModsFields(modsData);
        setFormState({ ...formState, mods: modsData })
    };

    // update state of buildimages array with object(s)
    const handleChangeImages = (index, event) => {
        let imgsData = [...imgsFields];
        imgsData[index][event.target.name] = event.target.value;
        setImgsFields(imgsData);
        setFormState({ ...formState, buildimages: imgsData })
    };

    // submit form
    const handleFormSubmit = async () => {
        try {
            await addBuild({
                variables: { ...formState },
            });
        } catch (e) {
            console.error(e);
        }
    };

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
                <div className='userHeroBackground'>
                    <div className="hero container">
                        <h1>Manage Builds</h1>
                    </div>
                </div>
                <section className="userbodybackground">
                    <div className="container">

                        <button onClick={handleClick}>+Add New Build</button>

                        <div className="sectionbox userbodybackground">
                            <div className='buildCardsBox'>
                                <BuildCardModify builds={user.builds} />
                            </div>
                        </div>

                    </div>
                </section>
            </motion.div>

            <Modal
                isOpen={modalIsOpen}
                closeTimeoutMS={200}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
                className="Modal buildModal"
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <div className='closebuttoncontainer'>
                    <button onClick={() => setModalIsOpen(false)}>
                        <img src={close} alt="Close Button" />
                    </button>
                </div>


                <h3 className="formHeader">Create a new build</h3>

                <form onSubmit={handleFormSubmit} className="buildForm">

                    <div className="topInputs">
                        <div>
                            <label htmlFor="year">Year*</label>
                            <input
                                placeholder="1997"
                                name="year"
                                type="text"
                                id="year"
                                value={formState.year}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="manufacturer">Make*</label>
                            <input
                                placeholder="Mazda"
                                name="manufacturer"
                                type="text"
                                id="manufacturer"
                                value={formState.manufacturer}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="model">Model*</label>
                            <input
                                placeholder="MX-5"
                                name="model"
                                type="text"
                                id="model"
                                value={formState.model}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <h4>Add your images*</h4>
                    <div className='buildformbox'>

                        <div className='imageDivTop'>
                            <button onClick={addImgFields} className="addBtn">Click to add more Images
                                <img src={plus} alt="plus-sign" />
                            </button>
                        </div>

                        {imgsFields.map((inputImg, index) => {
                            return (
                                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <input
                                        placeholder="Enter img url..."
                                        name="image"
                                        type="text"
                                        value={inputImg.image}
                                        onChange={event => handleChangeImages(index, event)} 
                                         />
                                    <button onClick={event => removeImgFields(index, event)} className="removeBtn buildFrmBtn"><img src={trash} alt="trashcan" /></button>
                                </motion.div>
                            )
                        })}

                    </div>

                    <h4>Biography*</h4>
                    <textarea
                        placeholder="I’ve had this car since......"
                        name="buildDescription"
                        type="text"
                        id="buildDescription"
                        value={formState.buildDescription}
                        onChange={handleChange}
                        required
                    />

                    <h4>Mod List*</h4>
                    <div className='buildformbox'>

                        <div className='imageDivTop'>
                            <button onClick={addModFields} className="addBtn">Click to add more Mods
                                <img src={plus} alt="plus-sign" />
                            </button>
                        </div>

                        {modsFields.map((inputMod, index) => {
                            return (
                                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <input
                                        placeholder="Enter mod here..."
                                        name="modtitle"
                                        type="text"
                                        value={inputMod.modtitle}
                                        onChange={event => handleChangeMods(index, event)} 
                                        />
                                    <button onClick={event => removeModFields(index, event)} className="removeBtn buildFrmBtn"><img src={trash} alt="trashcan" /></button>
                                </motion.div>)
                        })}
                    </div>
                    <div className='submitFormBox'>
                        <button className="submitFormBtn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default BuildsBody;