'use client'
import React, { useState } from 'react';
import Tiptap from './Tiptap';
import ContainMargin from '@/components/shared/ContainMargin';
import { IoClose } from "react-icons/io5";
import InnerHTML from 'dangerously-set-html-content'
import DOMPurify from 'dompurify';

const MakePost = () => {
    const [content, setContent] = useState("")
    const [coding_language, setCodingLanguage] = useState('Nothing')
    // Table posts {
    //     _id string PK
    //     author_id string
    //     title string **
    //     details string *
    //     images strings *
    //     code string **
    //     p_language strintg **
    //     topics array **
    //     source string **
    //     createdAt timestamp
    //   }

    const programming_languages = [
        { name: "JavaScript", id: 1 },
        { name: "Python", id: 2 },
        { name: "Java", id: 3 },
        { name: "C#", id: 4 },
        { name: "C++", id: 5 },
        { name: "TypeScript", id: 6 },
        { name: "PHP", id: 7 },
        { name: "Swift", id: 8 },
        { name: "Ruby", id: 9 },
        { name: "Go", id: 10 },
        { name: "Rust", id: 11 },
        { name: "Kotlin", id: 12 },
        { name: "Objective-C", id: 13 },
        { name: "Scala", id: 14 },
        { name: "Shell", id: 15 },
        { name: "R", id: 16 },
        { name: "MATLAB", id: 17 },
        { name: "Dart", id: 18 },
        { name: "Perl", id: 19 },
        { name: "Haskell", id: 20 },
        { name: "Lua", id: 21 },
        { name: "Groovy", id: 22 },
        { name: "Visual Basic", id: 23 },
        { name: "Elixir", id: 24 },
        { name: "Julia", id: 25 },
        { name: "F#", id: 26 },
        { name: "Clojure", id: 27 },
        { name: "Fortran", id: 28 },
        { name: "Erlang", id: 29 },
        { name: "Ada", id: 30 },
        { name: "COBOL", id: 31 },
        { name: "Lisp", id: 32 },
        { name: "Prolog", id: 33 },
        { name: "Solidity", id: 34 },
        { name: "Tcl", id: 35 },
        { name: "Hack", id: 36 },
        { name: "Crystal", id: 37 },
        { name: "Nim", id: 38 },
        { name: "Smalltalk", id: 39 },
        { name: "VBScript", id: 40 },
        { name: "Racket", id: 41 },
        { name: "ActionScript", id: 42 },
        { name: "Q#", id: 43 },
        { name: "Assembly", id: 44 },
        { name: "Bash", id: 45 },
        { name: "SAS", id: 46 },
        { name: "APL", id: 47 },
        { name: "Forth", id: 48 },
        { name: "ABAP", id: 49 },
        { name: "VHDL", id: 50 },
    ];

    const [topics, setTopics] = useState([])
    const [topicError, setTopicError] = useState(false)
    const [topicErrorMsg, setTopicErrorMsg] = useState('')
    const handleSelectTopic = (e) => {
        setTopicError(false)
        if(e.key === 'Enter'){

            if(topics.length < 5) {

                // validate same topic 
                const isSameTopic = topics.find( selected_topic  => selected_topic.name.toLowerCase() === e.target.value.toLowerCase() )
                console.log(isSameTopic)
                if (isSameTopic) {
                    setTopicError(true)
                    setTopicErrorMsg("This topic has already been added. Please enter a different topic.")
                }
                else{
                    if(e.target.value.trim() !== "") {
                        const newTopic = {name: e.target.value.trim()}
                        setTopics([...topics, newTopic])
                        setTopicError(false)
                        e.target.value = ""
                    }
                }
            }
            else{
                setTopicError(true)
                setTopicErrorMsg('You can add only 5 topics')
            }
        }
    }

    const handleDeselect = (name) => {
        const deselectedTopics = topics.filter( selected_topic  => selected_topic.name !== name )
        setTopics(deselectedTopics)
    }
      
      
    return (
        <section className='pt-10 bg-background min-h-screen'>
            <ContainMargin box_width={''}>
                <div className='mb-10 bg-white p-2 rounded-lg'>
                    
                    <div className='p-2 border-[1px] border-gray-200 rounded-lg'>
                        <label className='text-sm ml-1 text-primary' htmlFor="title">Title</label><br />
                        <input className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md' id='title' name='title' placeholder='create a title' type="text" />
                    </div>

                    <div className='mt-2 p-2 border-[1px] border-gray-200 rounded-lg'>
                        <label className='text-sm ml-1 text-primary' htmlFor="details">Details</label><br />
                        <div className='border-[1px] border-gray-200 rounded-lg'>
                            <Tiptap 
                                id="details"
                                content={content}
                                onChange={(newContent) => setContent(newContent)}
                            ></Tiptap>
                        </div>
                    </div>

                    {/* // choose topics ------------------ */}
                    <div className='mt-3 p-2 border-[1px] border-gray-200 rounded-lg'>
                        <div className=''>
                                <label className='text-sm ml-1 text-primary' htmlFor="topics">Topics</label><br />
                                <input 
                                onKeyDown={handleSelectTopic}
                                className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md' id='topics' name='topics' placeholder='select topics' type="text" />
                        </div>
                        <div className='mt-1 flex flex-wrap gap-1 items-center'>
                            {
                                topics.map(({name}, id) => 
                                <div key={id} className='px-2 py-1 bg-gray-100 flex items-center gap-1 rounded-md w-fit'>
                                    <span className='' >{name}</span>
                                    <button onClick={() => handleDeselect(name)}><IoClose /></button>
                                </div>
                            )}
                        </div>

                        {/* validation message for select only 5 topics  */}
                        {topicError && <p className='text-red-500 text-sm mt-1'>{topicErrorMsg}</p>}
                    </div>

                    {/* source of this post  */}
                    <div className='mt-2 p-2 border-[1px] border-gray-200 rounded-lg'>
                        <label className='text-sm ml-1 text-primary' htmlFor="source">Source</label><br />
                        <input className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md' id='source' name='source' placeholder='type source link only' type="url" />
                    </div>

                    {/* code and language ******** */}
                    <div className='p-2 mt-3 border-[1px] border-gray-200 rounded-lg'>
                        <div className=''>
                            <label className='text-sm ml-1 text-primary' htmlFor="coding_language">Programming language</label><br />
                            <select required id='coding_language' value={coding_language} onChange={(e) => setCodingLanguage(e.target.value)} className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-sm'>
                                <option value="none">-- Select an language --</option>
                                {
                                    programming_languages.map(({id, name}) => (
                                        <option value={name} key={id}>{name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='mt-3'>
                            <label className='text-sm ml-1 text-primary' htmlFor="code">Code</label><br />
                            <textarea rows={'8'} className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md' id='code' name='code' placeholder='type your code here...' type="text" />
                        </div>
                    </div>
                </div>
                
                
                
                {/* <div dangerouslySetInnerHTML={{__html: content}}></div> */}
            </ContainMargin>
        </section>
    );
};

export default MakePost;