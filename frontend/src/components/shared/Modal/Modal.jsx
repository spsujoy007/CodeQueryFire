import React from 'react';
import ModalBody from './ModalBody';
import useModal from './useModal';
import { IoIosClose } from "react-icons/io";

const Modal = ({children, handleCloseModal}) => {
    // const {showModal, closeModal, modal} = useModal()

    return (
            <div className='w-full h-screen flex justify-center items-center z-100 fixed top-0 overflow-y-scroll bg-[#ebebebbe] backdrop-blur-md'>
                <div className='w-[90%] md:w-[70%] lg:w-[40%] bg-white border-[1px] border-gray-200 p-3 rounded-xl'>
                    <div className='flex justify-end'>
                        <button onClick={() => handleCloseModal(false)} className='px-2 py-1 rounded-full text-black hover:bg-black hover:text-white hover:duration-200 duration-500 flex items-center '><IoIosClose className='text-2xl' /> close</button>
                    </div>
                    {children}
                </div>
            </div>
    );
};

export default Modal;