import React from 'react';
import ModalBody from './ModalBody';
import useModal from './useModal';

const Modal = ({children}) => {
    const {showModal, closeModal, modal} = useModal()

    return (
        <>
        {
            modal &&
            <div className='w-full max-h-screen min-h-screen flex justify-center items-center z-100 absolute top-0 overflow-hidden bg-[#ebebebbe] backdrop-blur-md'>
                <div className='w-[90%] md:w-[70%] lg:w-[40%] bg-white border-[1px] border-gray-200 p-3 rounded-xl'>
                    <div>
                        <button onClick={() => closeModal()} className='px-5 py-1 text-black border-2'>close</button>
                    </div>
                    {children}
                </div>
            </div>
        }
        </>
    );
};

export default Modal;