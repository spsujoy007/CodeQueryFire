import React from 'react';
import { FaBold, FaStrikethrough, FaItalic, FaList, FaListOl, FaUnderline, FaQuot, FaUndoAlt, FaRedo, facod } from "react-icons/fa";
import { LuHeading2 } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";

const Toolbar = ({editor, content}) => {
    if(!editor) {
        return null
    }

    return (
        <div>
            <button 
            onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleBold().run()
            }}
            className={editor.isActive('bold') ? 'bg-black text-white' : 'bg-white text-black'}
            > <FaBold/> </button>
            <button 
            onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleUnderline().run()
            }}
            className={editor.isActive('bold') ? 'bg-black text-white' : 'bg-white text-black'}
            > <FaUnderline/> </button>
        </div>
    );
};

export default Toolbar;