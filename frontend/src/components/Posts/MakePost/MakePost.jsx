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
        // Most commonly used languages and frameworks
        { name: "JavaScript", id: 1 },
        { name: "HTML", id: 2 },
        { name: "CSS", id: 3 },
        { name: "Python", id: 4 },
        { name: "Java", id: 5 },
        { name: "C#", id: 6 },
        { name: "C++", id: 7 },
        { name: "TypeScript", id: 8 },
        { name: "PHP", id: 9 },
        { name: "Swift", id: 10 },
        { name: "Ruby", id: 11 },
        { name: "Go", id: 12 },
        { name: "Rust", id: 13 },
        { name: "Kotlin", id: 14 },
        { name: "SQL", id: 15 },
        { name: "R", id: 16 },
        { name: "MATLAB", id: 17 },
    
        // Popular frameworks and libraries
        { name: "React", id: 18 },
        { name: "Angular", id: 19 },
        { name: "Vue", id: 20 },
        { name: "Django", id: 21 },
        { name: "Flask", id: 22 },
        { name: "Spring", id: 23 },
        { name: "Express", id: 24 },
        { name: "ASP.NET", id: 25 },
        { name: "Laravel", id: 26 },
        { name: "Ruby on Rails", id: 27 },
        { name: "Bootstrap", id: 28 },
        { name: "Svelte", id: 29 },
        { name: "TensorFlow", id: 30 },
        { name: "Pandas", id: 31 },
    
        // Other programming languages
        { name: "Objective-C", id: 32 },
        { name: "Scala", id: 33 },
        { name: "Shell", id: 34 },
        { name: "Dart", id: 35 },
        { name: "Perl", id: 36 },
        { name: "Haskell", id: 37 },
        { name: "Lua", id: 38 },
        { name: "Groovy", id: 39 },
        { name: "Visual Basic", id: 40 },
        { name: "Elixir", id: 41 },
        { name: "Julia", id: 42 },
        { name: "F#", id: 43 },
        { name: "Clojure", id: 44 },
        { name: "Fortran", id: 45 },
        { name: "Erlang", id: 46 },
        { name: "Ada", id: 47 },
        { name: "COBOL", id: 48 },
        { name: "Lisp", id: 49 },
        { name: "Prolog", id: 50 },
        { name: "Solidity", id: 51 },
        { name: "Tcl", id: 52 },
        { name: "Hack", id: 53 },
        { name: "Crystal", id: 54 },
        { name: "Nim", id: 55 },
        { name: "Smalltalk", id: 56 },
        { name: "VBScript", id: 57 },
        { name: "Racket", id: 58 },
        { name: "ActionScript", id: 59 },
        { name: "Q#", id: 60 },
        { name: "Assembly", id: 61 },
        { name: "Bash", id: 62 },
        { name: "SAS", id: 63 },
        { name: "APL", id: 64 },
        { name: "Forth", id: 65 },
        { name: "ABAP", id: 66 },
        { name: "VHDL", id: 67 }
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

                    {/* details rich text editor ------------------- */}
                    <div className='mt-2 p-2 border-[1px] border-gray-200 rounded-lg'>
                        <label className='text-sm ml-1 text-primary' htmlFor="details">Details</label><br />
                        <div className='border-[1px] border-gray-200 rounded-lg'>
                            <Tiptap 
                                id="details"
                                content={content}
                                onChange={(newContent) => setContent(newContent)}
                            ></Tiptap>
                            {/* {content} */}
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

                                <optgroup label="Most Commonly Used Languages">
                                    {
                                        programming_languages.slice(0, 17).map(({id, name}) => (
                                            <option value={name} key={id}>{name}</option>
                                        ))
                                    }
                                </optgroup>

                                <optgroup label="Popular Frameworks and Libraries">
                                    {
                                        programming_languages.slice(17, 31).map(({id, name}) => (
                                            <option value={name} key={id}>{name}</option>
                                        ))
                                    }
                                </optgroup>

                                <optgroup label="Other Programming Languages">
                                    {
                                        programming_languages.slice(31).map(({id, name}) => (
                                            <option value={name} key={id}>{name}</option>
                                        ))
                                    }
                                </optgroup>

                            </select>
                        </div>
                        <div className='mt-3'>
                            <label className='text-sm ml-1 text-primary' htmlFor="code">Code</label><br />
                            <code>
                                <textarea rows={'8'} className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md' id='code' name='code' placeholder='type your code here...' type="text" />
                            </code>
                        </div>
                    </div>
                </div>
                
                
                
                {/* <div dangerouslySetInnerHTML={{__html: content}}></div> */}
            </ContainMargin>
        </section>
    );
};

export default MakePost;