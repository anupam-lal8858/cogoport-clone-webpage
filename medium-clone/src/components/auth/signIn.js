import React from "react";
import { useFormik } from "formik";
import { signInSchema } from "../form_validation/signin_validation";
import '../../styles/form.css'
import { Link, useNavigate } from "react-router-dom";
import image from './signup.png';
import axios from "axios";


const SignUp = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      onSubmit:(values, action) => {
        if (values) {
            axios
            .post('http://127.0.0.1:3000/login', values)
            .then((response) => {
              // Handle success response here
              const token = response.data.token;
              localStorage.setItem('token', token);
              console.log('SignIn', token);
              alert('SignIn succeccful!');
              navigate('/');
              window.location.reload();



            })
            .catch((error) => {
              // Handle error here
              alert('Invalid credentials!');
              console.error(error);
            });
        }

        action.resetForm();
      },

    });



  return (
    <>
      <div className="container ">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-right">
              <img src={image} alt="girl-reading-a-book" />
            </div>
            <div className="modal-left">
              <h1 className="modal-title">Welcome!</h1>
              <p className="modal-desc">
                To the Sign In page.
              </p>

              <form onSubmit={handleSubmit}>

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
                </div>

                <div className="modal-buttons">
                  <button className="input-button" type="submit">
                    Sign In
                  </button>
                </div>
              </form>
              <p className="sign-up">
                Don't have an account? <Link to='/signup'>Sign up </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;