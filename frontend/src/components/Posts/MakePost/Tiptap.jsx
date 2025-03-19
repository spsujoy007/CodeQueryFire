'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Toolbar from './Toolbar'
import Strike from '@tiptap/extension-strike'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'

const Tiptap = ({content, onChange}) => {
  const editor = useEditor({
    extensions: [
      StarterKit, 
      Underline, 
      Strike,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock
    ],
    editorProps: {
      attributes: {
        class: 'bg-gray-100 p-2 outline-none min-h-[200px] max-h-[400px] overflow-y-scroll appearance-none tiptap-style',
      }
    },
    onUpdate: ({editor}) => {
      onChange(editor.getHTML())
    }
  })

  return <div>
    <div className='p-2'>
      <Toolbar editor={editor} content={content}></Toolbar>
    </div>
    <EditorContent  style={{whiteSpace: 'pre-line'}} editor={editor} />
  </div>
}

export default Tiptap
