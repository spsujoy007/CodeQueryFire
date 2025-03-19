"use client"
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import ToolbarDetailsPage from './ToolbarDetailsPage'
import { EditorContent, useEditor } from '@tiptap/react'
import '../postdesign.css'
import { useEffect } from 'react'

const TiptapDetailsPage = ({content, onChange}) => {

  const editor = useEditor({
    extensions: [
      StarterKit, 
      Underline, 
      Strike,
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock.configure({
        languageClassPrefix: 'language-javascript', // Required for Prism.js to detect the language
        HTMLAttributes: {
          class: 'language-javascript', // Default language
        }
      })
    ],
    editorProps: {
      attributes: {
        class: 'bg-white p-2 outline-none min-h-[200px] max-h-[400px] rounded-md overflow-y-scroll  tiptap-style',
      }
    },
    onUpdate: ({editor}) => {
      onChange(editor.getHTML());
    },
    
  })

  return <div>
    <div className='p-2'>
      <EditorContent  style={{whiteSpace: 'pre-line'}} editor={editor} />
      <ToolbarDetailsPage editor={editor} content={content}></ToolbarDetailsPage>
    </div>
  </div>
}

export default TiptapDetailsPage
