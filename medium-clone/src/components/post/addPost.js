import React from 'react'
import { PostSchema } from '../form_validation/post_validation';
import { useFormik } from 'formik';
import axios from 'axios';

export default function AddPost() {

  // const [formData , setFormData] = useState('')

  const initialValues = {
    title: "",
    genre: "",
    image_url: "",
    Date: "",
    Time: "",
    author: "",
    description: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: PostSchema,
      onSubmit: (values, action) => {
        if (values) {
          axios
            .post('http://127.0.0.1:3000/articles/create', values)
            .then((response) => {
              // Handle success response here
              alert("Post Added!")
              console.log(response.data);
            })
            .catch((error) => {
              // Handle error here
              console.error(error);
            });
        }

        action.resetForm();

      },
    });


  return (
    <div className='p-5 mt-10'>
      <div className="h-auto flex ai-ce  m-auto w-3/5 p-5 rounded-xl shadow-2xl">
        <div><h1 className=" border-b-2 pb-4 border-yellow-400 px-10 m-10 text-4xl mt-10 text-black text-center">
          New Post
        </h1></div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="title" className="input-label">
                title
              </label>
              <input
                type="text"
                autoComplete="off"
                name="title"
                id="title"
                placeholder="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && touched.title ? (
                <p className="form-error">{errors.title}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="genre" className="input-label">
                genre
              </label>
              <input
                type="text"
                autoComplete="off"
                name="genre"
                id="genre"
                placeholder="genre"
                value={values.genre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.genre && touched.genre ? (
                <p className="form-error">{errors.genre}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="image_url" className="input-label">
                Featured Image
              </label>
              <input
                type="file"
                autoComplete="off"
                name="image_url"
                id="image_url"
                placeholder="Featured Image"
                value={values.image_url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.image_url && touched.image_url ? (
                <p className="form-error">{errors.image_url}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="author" className="input-label">
                author
              </label>
              <input
                type="text"
                autoComplete="off"
                name="author"
                id="author"
                placeholder="author"
                value={values.author}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.author && touched.author ? (
                <p className="form-error">{errors.author}</p>
              ) : null}
            </div>

            <div className="input-block">
              <label htmlFor="description" className="input-label">
                description
              </label>
              <input
                type="text"
                autoComplete="off"
                name="description"
                id="description"
                placeholder="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.description && touched.description ? (
                <p className="form-error">{errors.description}</p>
              ) : null}
            </div>
            {/* <div className="input-block">
                    <label htmlFor="postText" className="input-label">
                    Post Text
                    </label>
                    <CKEditor editor={ClassicEditor} onChange={handleEditorChange}  value={values.PostData}/>
                    
                    {errors.postText && touched.postText ? (
                      <p className="form-error">{errors.postText}</p>
                    ) : null}
                    
                  </div> */}


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
