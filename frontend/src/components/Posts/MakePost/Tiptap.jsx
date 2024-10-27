'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Toolbar from './Toolbar'

const Tiptap = ({content, onChange}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: 'border-2',
      }
    },
    onUpdate: ({editor}) => {
      onChange(editor.getHTML())
    }
  })

  return <div>
    <Toolbar editor={editor} content={content}></Toolbar>
    <EditorContent style={{whiteSpace: 'pre-line'}} editor={editor} />
  </div>
}

export default Tiptap
