'use client'
import React, { useRef, useState } from 'react';
import Tiptap from './Tiptap';
import ContainMargin from '@/components/shared/ContainMargin';
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { LuSend } from 'react-icons/lu';
import { FaAngleDown, FaPlus } from 'react-icons/fa6';
import Image from 'next/image';
import axios from 'axios';
import ServerUrl from '@/Hooks/useServerUrl';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const MakePost = () => {
    const router = useRouter()

    // #### details of post #### //
    const [content, setContent] = useState("") // ** details ** //
    const [coding_language, setCodingLanguage] = useState(null)
    const [activeOptional, setActiveOptional] = useState(false)

    // #### topics of post #### //
    const [loading, setLoading] = useState(false)
    const [topics, setTopics] = useState([]) // ** topics ** //
    const [topicError, setTopicError] = useState(false)
    const [topicErrorMsg, setTopicErrorMsg] = useState('')

    // #### images of post #### //
    const [tempImageFile, setTempImageFile] = useState([])
    const [tempImageLink, setTempImageLink] = useState([])
    const [imageError, setImageError] = useState(false)
    const [imageErrorMsg, setImageErrorMsg] = useState('')

    // **** coding language and frameworks **** //
    const programming_languages_list = [
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



    // -- Select Topic Method -- //
    const handleSelectTopic = (e) => {
        setTopicError(false)
        if(e.key === 'Enter'){
            e.preventDefault()

            if(topics.length < 5) {
                // validate same topic 
                const isSameTopic = topics.find( selected_topic  => selected_topic.toLowerCase() === e.target.value.toLowerCase() )

                if (isSameTopic) {
                    setTopicError(true)
                    setTopicErrorMsg("This topic has already been added. Please enter a different topic.")
                }
                else{
                    if(e.target.value.trim() !== "") {
                        const newTopic = e.target.value.trim()
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

    // -- Delete Topic Method -- //
    const handleDeselectTopic = (name) => {
        const deselectedTopics = topics.filter( selected_topic  => selected_topic !== name )
        setTopics(deselectedTopics)
    }
    
    // -- Select Images Method -- //
    const handleSelectImages = (e) => {
        e.preventDefault()
        if(tempImageFile.length <= 2) {
            const file = e.target.files[0]
            if(file) {
                const url = URL.createObjectURL(file)
                setTempImageFile([...tempImageFile, file])
                setTempImageLink([...tempImageLink, {url, name: file.name}])
            }
        }
        else{
            setImageError(true)
            setImageErrorMsg('Limit exceeded! Only 3 images can be uploaded.')
        }
    }
    
    // -- Deselect Image Method -- //
    const handleRemoveSelectedImage = (name) => {
        setImageError(false)
        const removeImage = tempImageLink.filter(img => img.name !== name)
        const removeFiles = tempImageFile.filter(img => img.name !== name)
        if(removeImage && removeFiles) {
            setTempImageFile(removeFiles)
            setTempImageLink(removeImage)
        }
        else{
            setTempImageLink([])
            setTempImageLink([])
        }
    }

    const [serverError, setServerError] = useState(false)
    const [serverErrorMsg, setServerErrorMsg] = useState("")
    // the biggest one submit post  ////////////////////////////////////////////////////////////////
    const handleSubmitPost = (e) => {
        e.preventDefault()
        setLoading(true)
        if(topics.length < 1) {
            setTopicError(true)
            setTopicErrorMsg("You need to choose at least one topic.")
            return
        }

        if (topicError || imageError) {
            return alert('An error founded')
        }
        else{
            const {title, source, code, images} = e.target
            const formData = new FormData();
            
            const post_object = {
                "title": title?.value || null,
                "details": content,
                "images": tempImageFile,
                "code": code?.value || null,
                "topic": topics,
                "programming_language": coding_language,
                "source": source?.value || null, 
            }
            
            console.log(topics)
            
            tempImageFile.forEach((file) => {
                formData.append("images", file); // 'images' should match the field name in multer setup
            });
            
            // Append other data fields from `post_object`
            formData.append("title", post_object.title);
            formData.append("details", post_object.details);
            formData.append("code", post_object.code);
            formData.append("programming_language", post_object.programming_language);
            formData.append("source", post_object.source);
            post_object.topic.forEach((topic, index) => {
                formData.append(`topics[${index}]`,topic); // For arrays, append each item separately
            });

            // Send the FormData with axios
            axios.post(`${ServerUrl()}/post/makepost`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure axios uses the correct encoding
                },
                withCredentials: true,
            })
            .then(res => {
                console.log(res);
                setServerError(false)
                setLoading(false)
                toast.success(res.data?.data?.message || 'Post uploaded successfully')
                return router.push("/")
            })
            .catch(err => {
                const errorMessage = err.response.data.message
                setServerError(true)
                setServerErrorMsg(errorMessage)
                setLoading(false)
                return
            });
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const disableEnterKey = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Disable Enter key
        }
    };
      
    return (
        <section className='py-10 bg-background min-h-screen'>
            <ContainMargin box_width={''}>
                <form onSubmit={handleSubmitPost} className='mb-10 bg-white p-2 rounded-lg'>
                    
                    <div className='p-2 border-[1px] border-gray-200 rounded-lg'>
                        <label className='text-sm ml-1 text-primary' htmlFor="title">Title</label><br />
                        <input 
                        required
                        autoFocus
                        id='title'
                        name='title'
                        placeholder='create a title'
                        type="text"
                        onKeyDown={disableEnterKey}
                        className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md border-[1px] border-gray-200'/>
                    </div>

                    {/* // choose topics ------------------ */}
                    <div className='p-2 mt-3 border-[1px] border-gray-200 rounded-lg'>
                        <div className=''>
                                <label className='text-sm ml-1 text-primary' htmlFor="topics">Topics</label><br />
                                <input 
                                onKeyDown={handleSelectTopic}
                                className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md border-[1px] border-gray-200' id='topics' name='topics' placeholder='type a topic and click enter' type="text" />
                        </div>
                        <div className='mt-1 flex flex-wrap gap-1 items-center'>
                            {
                                topics.map((name, id) => 
                                <div key={id} className='px-2 py-1 bg-gray-100 flex items-center gap-1 rounded-md w-fit'>
                                    <span className='' >{name}</span>
                                    <button onClick={() => handleDeselectTopic(name)}><IoClose /></button>
                                </div>
                            )}
                        </div>
                    
                        {/* validation message for select only 5 topics  */}
                        {topicError && <p className='text-red-500 text-sm mt-1'>{topicErrorMsg}</p>}
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
                        </div>
                    </div>

                    {/* optional details of post but important for SEO  */}
                    {
                       activeOptional &&
                        <section>
                            <p className='mt-5 ml-2 font-bold mb-1'>Optionals</p>

                            {/* select image section  */}
                            <section className='mt-3 space-y-1 p-2 border-[1px] border-gray-200 rounded-lg'>
                                <p className='text-sm ml-1 text-primary'>Images</p>
                                <div className='flex flex-wrap space-x-2 md:space-y-0 space-y-2 items-center'>
                                    {/* validate show and hide for select only 3 images  */}
                                    {
                                        tempImageFile.length <= 2 &&
                                        <div className='border-[1px] border-gray-200 rounded-xl'>
                                            <label htmlFor="images" className={`w-[200px] h-[110px] bg-gray-100 text-black flex justify-center items-center rounded-xl`}>
                                                <FaPlus className='text-2xl' />
                                            </label>
                                            <input 
                                            onChange={handleSelectImages} 
                                            id='images' 
                                            className='hidden none' 
                                            onKeyDown={disableEnterKey}
                                            name='images' type="file" accept='.jpg, .png' />
                                        </div>
                                    }
                                    <div className='flex flex-wrap items-start gap-2'>
                                        {
                                            tempImageLink.map((img, i) => 
                                                <div key={i} className='relative group duration-200'>
                                                    <div className='max-w-[200px] max-h-[110px] flex justify-center items-center overflow-hidden rounded-xl'>
                                                        <Image quality={10} width={200} height={110} className='min-w-[200px] min-h-[110px]  bg-gray-100 flex justify-center items-center rounded-xl' src={img.url} alt='images'></Image>
                                                    </div>

                                                    <button onClick={() => handleRemoveSelectedImage(img.name)} className='hidden  group-hover:flex top-0 left-0 absolute w-full h-full text-3xl text-white  rounded-xl justify-center items-center bg-[#000000b2]'>
                                                        <IoCloseCircle  />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                {/* validation msg for select images */}
                                {
                                    imageError && <p className='text-sm ml-1 text-red-500'>{imageErrorMsg}</p>
                                }
                            </section>

                            {/* source of this post  */}
                            <div className='mt-2 p-2 border-[1px] border-gray-200 rounded-lg'>
                                <label className='text-sm ml-1 text-primary' htmlFor="source">Source</label><br />
                                <input 
                                onKeyDown={disableEnterKey}
                                className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md border-[1px] border-gray-200' 
                                id='source' name='source' placeholder='type source link only' type="url" />
                            </div>

                            {/* code and language ******** */}
                            <div className='p-2 mt-3 border-[1px] border-gray-200 rounded-lg'>
                                <div className=''>
                                    <label className='text-sm ml-1 text-primary' htmlFor="coding_language">Programming language or framework</label><br />
                                    <select required id='coding_language' value={coding_language} onChange={(e) => setCodingLanguage(e.target.value)} className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-sm border-[1px] border-gray-200'>
                                        <option value="none">-- Select an language --</option>

                                        <optgroup label="Most Commonly Used Languages">
                                            {
                                                programming_languages_list.slice(0, 17).map(({id, name}) => (
                                                    <option value={name} key={id}>{name}</option>
                                                ))
                                            }
                                        </optgroup>

                                        <optgroup label="Popular Frameworks and Libraries">
                                            {
                                                programming_languages_list.slice(17, 31).map(({id, name}) => (
                                                    <option value={name} key={id}>{name}</option>
                                                ))
                                            }
                                        </optgroup>

                                        <optgroup label="Other Programming Languages">
                                            {
                                                programming_languages_list.slice(31).map(({id, name}) => (
                                                    <option value={name} key={id}>{name}</option>
                                                ))
                                            }
                                        </optgroup>

                                    </select>
                                </div>
                                <div className='mt-3'>
                                    <label className='text-sm ml-1 text-primary' htmlFor="code">Code</label><br />
                                    <code>
                                        <textarea rows={'8'} className='bg-gray-100 px-2 w-full mt-1 rounded-lg py-2 outline-none text-md border-[1px] border-gray-200 max-h-[500px]' id='code' name='code' placeholder='place your <code/> here...' type="text" />
                                    </code>
                                </div>
                            </div>
                        </section>
                    }

                    <div className='mt-3'>
                        <div className='flex justify-center'>
                            {
                                !activeOptional &&
                                <button onClick={() => setActiveOptional(true)} className='text-black hover:text-primary text-sm flex flex-col items-center gap-1'>Add more details or images <FaAngleDown /></button>
                            }
                            
                        </div>
                    </div>

                    {serverError && <p className='text-red-500 text-sm mt-1 text-center'>{serverErrorMsg}</p>}
                    <div className='mt-3 flex justify-end'>
                        <div className='flex items-center gap-2'>
                        {
                            loading ?
                            <button disabled className='bg-primary hover:bg-primary_hover w-[180px] py-1 rounded-md text-white flex items-center justify-center gap-2 cursor-default'>
                               <span>Posting</span> <div className='mini-loader'></div>
                            </button>
                            :
                            <button className='bg-primary hover:bg-primary_hover text-white w-[180px] py-1 rounded-md flex items-center justify-center gap-2'>
                                <LuSend />
                                Post
                            </button>
                        }
                        </div>
                    </div>
                </form>
                
            </ContainMargin>
        </section>
    );
};

export default MakePost;