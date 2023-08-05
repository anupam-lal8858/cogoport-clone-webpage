import React from 'react'
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function Comments() {


    const [name , setName] = useState('')
    const [comment , setComment ] = useState('');

    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setComment(data)
    };


   const handleComment = (e) =>{
      e.preventDefault();
      console.log(name , comment)
   }
    


  return (
    <div className='p-5 mt-10'>
    <div className="h-auto flex m-auto w-3/5 p-5 rounded-xl shadow-2xl">
    <div className='w-full'>
        <form>
                  <div className="input-block">
                    <label htmlFor="Title" className="input-label">
                    Name:
                    </label>
                    <input
                      value={name}
                      onChange={(e) =>{setName(e.target.value)}}
                    />
                  </div>

                  <div className="input-block">
                    <label htmlFor="postText" className="input-label">
                    Comment:
                    </label>
                    <CKEditor editor={ClassicEditor} value={comment} onChange={handleEditorChange} />      
                  </div>


                  <div className="modal-buttons">
                    <button className="input-button" onClick={handleComment}>
                      Add Comment
                    </button>
                  </div>
                </form>
        </div>


    </div>
    </div>
  )
}
