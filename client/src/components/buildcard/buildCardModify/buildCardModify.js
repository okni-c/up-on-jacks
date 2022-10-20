import '../buildcard.scss';
import BuildImage from '../buildImage/buildImage';
import { motion } from 'framer-motion';
import { useMutation } from '@apollo/client';

import { MOD_BUILD, DELETE_BUILD } from '../../../utils/mutations';

import close from '../../../assets/webp/closebutton.webp';
import plus from '../../../assets/webp/add.webp';
import trash from '../../../assets/webp/trash.webp';

import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import './buildCardModify.scss';

// Modal.setAppElement('#modal');

function BuildCardModify({ builds }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [buildUID, setBuildUID] = useState('');

    const [modsFields, setModsFields] = useState([]);
    const [imgsFields, setImgsFields] = useState([]);

    const [formState, setFormState] = useState({
        buildId: buildUID,
        buildDescription: '',
        year: '',
        manufacturer: '',
        model: '',
        mods: modsFields,
        buildimages: imgsFields
    });

    const [modifyBuild] = useMutation(MOD_BUILD);
    const [deleteBuild] = useMutation(DELETE_BUILD);

    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [modalIsOpen])

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
        setFormState({ ...formState, mods: modsData });
    };

    // update state of buildimages array with object(s)
    const handleChangeImages = (index, event) => {
        let imgsData = [...imgsFields];
        imgsData[index][event.target.name] = event.target.value;
        setImgsFields(imgsData);
        setFormState({ ...formState, buildimages: imgsData });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //if you dont change it, it wont send it
        if (formState.mods.length === 0) {
            delete formState.mods;
        }

        if (formState.buildimages.length === 0) {
            delete formState.buildimages;
        }

        try {
            await modifyBuild({
                variables: { ...formState },
            });
        } catch (e) {
            console.error(e);
        }
        alert("modified!");
    };

    //delete build
    const handleDeleteBuild = async (event) => {
        event.preventDefault();

        const buildId = buildUID;

        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete this build?\n" + formState.year + ' ' + formState.manufacturer + ' ' + formState.model)) {
            try {
                await deleteBuild({ variables: { buildId } });
            } catch (e) {
                console.error(e);
            }
            window.location.reload(false);
        }
    }

    const handleClick = async (index) => {
        const reduxImages = [...builds[index].buildimages];
        const reduxMods = [...builds[index].mods];
        const currentBuildUID = builds[index]._id;

        const imgKey = ['image'];
        const modKey = ['modtitle'];

        const reduxImg = array => array.map(o => imgKey.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;
        }, {}));

        const reduxMod = array => array.map(o => modKey.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;
        }, {}));

        const returnImgArray = reduxImg(reduxImages);

        const returnModArray = reduxMod(reduxMods);

        setBuildUID(currentBuildUID);

        setImgsFields([...imgsFields, ...returnImgArray]);
        setModsFields([...modsFields, ...returnModArray]);

        setFormState({
            buildId: currentBuildUID,
            buildDescription: builds[index].buildDescription,
            year: builds[index].year,
            manufacturer: builds[index].manufacturer,
            model: builds[index].model,
            mods: modsFields,
            buildimages: imgsFields
        });

        setModalIsOpen(true);
    }

    const handleClose = () => {
        setModalIsOpen(false);
        setImgsFields([]);
        setModsFields([]);
        setFormState({
            buildId: '',
            buildDescription: '',
            year: '',
            manufacturer: '',
            model: '',
            mods: modsFields,
            buildimages: imgsFields
        })
    }

    return (
        <>{builds && builds.map((build, index) => (
            <motion.div key={index} className="buildcardcontainer" onClick={() => {
                handleClick(index);
            }} initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    default: {
                        duration: 0.1,
                        ease: "linear"
                    },
                    scale: {
                        type: "spring"
                    }
                }}>
                <div className="buildcardinfo">
                    <h3 className="buildcardheader">{build.username}'s</h3>
                    <BuildImage buildimages={build.buildimages} />
                    <h3 className="buildcardheader">{build.year} {build.manufacturer} {build.model}</h3>
                </div>
            </motion.div>))}
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
                    <button onClick={handleClose}>
                        <img src={close} alt="Close Button" />
                    </button>
                </div>


                <h3 className="formHeader">Modify This Build</h3>

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
                                        required />
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
                                        onChange={event => handleChangeMods(index, event)} />
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
                <button onClick={handleDeleteBuild}>
                    <img src={trash} alt="Delete Button" id='deleteBuild'/>
                </button>
            </Modal>
        </>
    );
}

export default BuildCardModify;
