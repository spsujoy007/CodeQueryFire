import React, { useState } from 'react';

const useModal = () => {
    const [modal, setModal] = useState(false)
    console.log(modal)
    const showModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    return {modal, showModal, closeModal}
};

export default useModal;