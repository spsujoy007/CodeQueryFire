import React from 'react';
import ModalBody from './ModalBody';
import useModal from './useModal';
import { IoIosClose } from "react-icons/io";

const Modal = ({children, handleCloseModal, size}) => {
    // const {showModal, closeModal, modal} = useModal()
    
    const dynamicStyle = `
    .dynamicWidth {
      width: 90%;
    }
    /* Media query for tablet (≥768px) */
    @media (min-width: 768px) {
      .dynamicWidth {
        width: 50%;
      }
    }
    /* Media query for large screens (≥1024px) */
    @media (min-width: 1024px) {
      .dynamicWidth {
        width: ${size ? size : 40}%;
      }
    }
  `;
    return (
            <>
            <style>{dynamicStyle}</style>
                <div className='w-full h-screen flex justify-center items-center z-100 fixed top-0 overflow-y-scroll bg-[#ebebebbe] backdrop-blur-md'>
                <div  
                
                className=' bg-white border-[1px] border-gray-200 p-3 rounded-xl dynamicWidth'>
                    <div className='flex justify-end'>
                        <button onClick={() => handleCloseModal(false)} className='px-2 py-1 rounded-full text-black hover:bg-black hover:text-white hover:duration-200 duration-500 flex items-center '><IoIosClose className='text-2xl' /> close</button>
                    </div>
                    {children}
                </div>
            </div>
            </>
    );
};

export default Modal;