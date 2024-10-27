import React from 'react';
import { FaBold, FaStrikethrough, FaItalic, FaList, FaListOl, FaUnderline, FaQuot, FaUndoAlt, FaRedo, facod } from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";

const Toolbar = ({editor, content}) => {
    if(!editor) {
        return null
    }
    
    const toolmenuItems = [
        {
            name: 'bold',
            icon: <FaBold/>
        },
        {
            name: 'italic',
            icon: <FaItalic/>
        },
        {
            name: 'underline',
            icon: <FaUnderline/>
        },
        {
            name: 'strikethrough',
            icon: <FaStrikethrough/>
        },
        {
            name: 'heading',
            icon: <LuHeading2/>
        },
        {
            name: 'bulletList',
            icon: <FaList/>
        },
        {
            name: 'orderedList',
            icon: <FaListOl/>
        },
        {
            name: 'blockquote',
            icon: <FaQuot/>
        },
        {
            name: 'codeBlock',
            icon: <FaCode/>
        }
    ]

    return (
        <div className='flex justify-start items-center gap-2'>
            <button 
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBold().run()
                }}
                className={`${editor.isActive('bold') ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <FaBold/> 
            </button>

            <button 
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleItalic().run()
                }}
                className={`${editor.isActive('italic') ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <FaItalic/> 
            </button>

            <button 
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleUnderline().run()
                }}
                className={`${editor.isActive('underline') ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <FaUnderline/> 
            </button>

            <button 
                onClick={(e) => {
                    e.preventDefault()
                    if (editor.isActive('strike')) {
                        editor.chain().focus().unsetStrike().run()
                    }
                    else{
                        editor.chain().focus().setStrike().run()
                    }
                }}
                className={`${editor.isActive('strike') ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <FaStrikethrough/> 
            </button>

            {/* <button 
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`${editor.isActive('heading', { level: 1 }) ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <LuHeading1/> 
            </button> */}

            <button 
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`${editor.isActive('heading', { level: 2 }) ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <LuHeading2/> 
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${editor.isActive('bulletList') ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <FaList/> 
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`${editor.isActive('orderedList') ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <FaListOl/> 
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`${editor.isActive('blockquote') ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <FaQuoteLeft/> 
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`${editor.isActive('codeBlock') ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded-md select-none`}
                > <FaCode/> 
            </button>
        </div>
    );
};

export default Toolbar;