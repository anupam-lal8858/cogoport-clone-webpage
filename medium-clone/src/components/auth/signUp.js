import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../form_validation";
import '../../styles/form.css'
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
  const navigate= useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    interests:"",
    specializations:"",
  };
  
  // const [formData , setFormData] = useState('')

  const { values, errors, touched, handleBlur, handleChange,handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
          // setFormData(values)
          if (values) {
               axios
              .post('http://127.0.0.1:3000/users', values)
              .then((response) => {
                // Handle success response here
                const token=response.data.token;
                console.log('Registered token',token);
                alert('Login succeccfully');
                navigate('/signin');
               
                
              })
              .catch((error) => {
                // Handle error here
                console.error(error);
                alert('Please try again!');
              });
          }
        // alert(formData.name);  
        action.resetForm();
      },
     
    });

   
  return (
    <>
        <div className="container ">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <h1 className="modal-title">Welcome!</h1>
                <p className="modal-desc">
                  To the Medium.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="name" className="input-label">
                      Name
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="confirm_password" className="input-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error">{errors.confirm_password}</p>
                    ) : null}
                  </div>

                  <div className="input-block">
                    <label htmlFor="interests" className="input-label">
                      Interests
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="interests"
                      id="interests"
                      placeholder="interests"
                      value={values.interests}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    
                  </div>

                  <div className="input-block">
                    <label htmlFor="specializations" className="input-label">
                     Specializations
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="specializations"
                      id="specializations"
                      placeholder="specializations"
                      value={values.specializations}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                   
                  </div>
                  <div className="modal-buttons">
                    <button className="input-button" type="submit">
                      Registration
                    </button>
                  </div>
                </form>
                <p className="sign-up">
                  Already have an account? <Link to='/signin'>Sign In now</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default SignUp;