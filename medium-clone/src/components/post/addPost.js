import React from 'react'
import { useState } from 'react';
import { PostSchema } from '../form_validation/post_validation';
import { useFormik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function AddPost() {

    const [postdata , setPostdata] = useState('')
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setPostdata(data)
      };
    


    const [formData , setFormData] = useState('')

    const initialValues = {
        Title: "",
        Topic: "",
        FeaturedImage: "",
        Date:"",
        Time:"",
        Author:""
      };

      const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues,
        validationSchema: PostSchema,
        onSubmit: (values, action) => {
          setFormData(values);
          action.resetForm();
         
        },
      });

     

   console.log(formData) ;


  return (
    <div className='p-5 mt-10'>
    <div className="h-auto flex ai-ce  m-auto w-3/5 p-5 rounded-xl shadow-2xl">
       <div><h1 className=" border-b-2 pb-4 border-yellow-400 px-10 m-10 text-4xl mt-10 text-black text-center">
            New Post 
        </h1></div>
    <div>
        <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="Title" className="input-label">
                    Title
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Title"
                      id="Title"
                      placeholder="Title"
                      value={values.Title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Title && touched.Title ? (
                      <p className="form-error">{errors.Title}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="Topic" className="input-label">
                    Topic
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Topic"
                      id="Topic"
                      placeholder="Topic"
                      value={values.Topic}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Topic && touched.Topic ? (
                      <p className="form-error">{errors.Topic}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="FeaturedImage" className="input-label">
                    Featured Image
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="FeaturedImage"
                      id="FeaturedImage"
                      placeholder="Featured Image"
                      value={values.FeaturedImage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.FeaturedImage && touched.FeaturedImage ? (
                      <p className="form-error">{errors.FeaturedImage}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="Author" className="input-label">
                    Author 
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Author"
                      id="Author"
                      placeholder="Author"
                      value={values.Author}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Author && touched.Author ? (
                      <p className="form-error">{errors.Author}</p>
                    ) : null}
                  </div>

                  <div className="input-block">
                    <label htmlFor="postText" className="input-label">
                    Post Text
                    </label>
                    <CKEditor editor={ClassicEditor} onChange={handleEditorChange} />
                    {errors.postText && touched.postText ? (
                      <p className="form-error">{errors.postText}</p>
                    ) : null}
                    
                  </div>


                  <div className="modal-buttons">
                    <button className="input-button" type="submit">
                      Add Post
                    </button>
                  </div>
                </form>
        </div>


    </div>
    </div>
  )
}
