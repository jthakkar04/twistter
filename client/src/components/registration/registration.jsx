// Dependencies
import React from 'react';
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import * as bad_words from "bad-words";
import * as firebase from "firebase/app";
import "firebase/auth";

// import "./style.scss";

export class Registration extends React.Component {

  render() {
    return (

      <Formik
        initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
        onSubmit= { async (values, actions) => {

            //Firebase user registration
            var valid = false;
            firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then(function(firebaseUser) {
              console.log("Successful registration!");
              valid = true;
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/email-already-in-use') {
                alert('Email already in use!');
              }
              else if (errorCode === 'auth/invalid-email') {
                alert('Invalid email!')
              }
              else {
                alert(errorMessage);
              }
            })
            .then(() => {
              if (valid === true) {
                console.log('Success!');
                this.props.history.push("/testpage");
              }
            });

            actions.setSubmitting(false);
        }}

        const validationSchema={
          Yup.object().shape({
            username: Yup.string()
              .required("Required")
              .test('safe-username', 'Profanity not allowed in usernames', function (value) {
                var filter = new bad_words();
                return filter.isProfane(value) === false;
              }),
            email: Yup.string()
              .email('Invalid email')
              .required('Required'),
            password: Yup.string()
              .min(8, "Invalid Password") // Keeps the min length of password to be 8 characters
              .required("Required")
              .matches(/(?=.*[0-9])/, "Invalid Password"), // Makes sure the password has a number in there
            confirmPassword: Yup.string()
              .required('Required')
              .test('passwords-match', 'Passwords must match ya fool', function (value) {
                return this.parent.password === value;
              }),
          })}
      >

        {props => {
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
              <div className="registration">
              <div className="base-container" ref={props.containerRef}>
                <div className="header">Registration</div>
                <div className="content">
                  <div className="form">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.username}
                      />
                      {errors.username && touched.username && (
                        <div className="input-feedback">{errors.username}</div>
                      )}
                    </div>


                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
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
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                      />
                      {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-type your Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.confirmPassword && touched.confirmPassword && "error"}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="input-feedback">{errors.confirmPassword}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    Sign Up
              </button>
                  <Link to="/">
                    <button type="button" className="btn">
                      Login
                    </button>
                  </Link>

                </div>
              </div>
              </div>
            </form>
          );
        }
        }
      </Formik >
    );
  }
}