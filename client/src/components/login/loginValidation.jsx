import React from "react";
import loginImg from "../../login.svg";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

const loginValidation = () => (
    <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={ (values, {setSubmitting }) => {
            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        }}

        validationSchema = { Yup.object().shape({
            email: Yup.string()
								.required("Required")
								.matches(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid Email"), // Makes sure the password has a number in there
            password: Yup.string()
                .min(8, "Invalid Password") // Keeps the min length of password to be 8 characters
                .required("Required")
                .matches(/(?=.*[0-9])/, "Invalid Password") // Makes sure the password has a number in there
        })}
    >
    {
    props => {
        const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <form onSubmit={handleSubmit}>
            <div className="base-container" ref={props.containerRef}>
              <div className="header">Login</div>
              <div className="content">
                {/* <div className="image">
                  <img src={loginImg} />
                </div> */}
                <div className="form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="Email"
                    placeholder="Enter your Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    className = {errors.email && touched.email && "error"}
                  />
									{errors.email && touched.email && (
											<div className="input-feedback">{errors.email}</div>
									)}
                </div>
      
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password" 
                      name="password" 
                      placeholder="Enter your Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur = {handleBlur}
                      />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
              	 </div>
            	 </div>
              </div>
              <div className="footer">
                <button type="button" className="btn" disabled={isSubmitting}>
                  Login
                </button>
                <button type="button" className="btn">
                  Register
                </button>
              </div>
            </div>
            </form>
          )
    }
    }
    </Formik>
);

export default loginValidation; 