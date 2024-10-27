'use client'
import React, { useState } from 'react';
import Tiptap from './Tiptap';

const MakePost = () => {
    const [content, setContent] = useState("")
    return (
        <div className='p-10'>
            <Tiptap 
                content={content}
                onChange={(newContent) => setContent(newContent)}
            ></Tiptap>
        </div>
    );
};

export default MakePost;