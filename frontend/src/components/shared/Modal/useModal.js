import React, { useEffect, useState } from 'react';

const useModal = (initialState = false) => {
    const [modal, setModal] = useState(initialState)
    const showModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    console.log(modal)
    useEffect(() => {
        if (modal) {
            document.body.style.height = '100vh'
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to reset overflow
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [modal]);
    return {modal, showModal, closeModal}
};

export default useModal;