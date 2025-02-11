// Dependencies
import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import * as bad_words from "bad-words";
import axios from 'axios';

// Project dependencies
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';

export const RegistrationPage = () => (
  <div>
    <RegistrationForm />
  </div>
);


class RegistrationFormBase extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}

        onSubmit={async (values, actions) => {

          //Firebase user registration
          var valid = false;
          var prefix = 'https://api.hunter.io/v2/email-verifier?email=';
          var email = values.email;
          var suffix = '&api_key=21d82fada636073cdda586efc5fd3151715e5aaa'

          var emailCheck = prefix + email + suffix;
          await axios.get(emailCheck).then((response) => {
            if (response.data.data.result != "undeliverable") {
              this.props.firebase.doCreateUserWithEmailAndPassword(values.email, values.password)
            // firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then(function (firebaseUser) {
              console.log("Successful registration!");
              valid = true;
            })
            .catch(function (error) {
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
                this.props.history.push(ROUTES.PROFILE);
                alert('Profile Created!\nContinue making your profile!')
                console.log("Firebase reg" + this.props.firebase.doGetCurrentUserId());
                this.props.firebase.doSignInWithEmailAndPassword(values.email, values.password);
                axios.put('http://localhost:5000/todo/api/v1.0/register', {
                  bio: "NONE",
                  first_name: values.firstname,
                  last_name: values.lastname,
                  email: values.email,
                  num_followers: 0,
                  num_following: 0,
                  profile_pic: null,
                  user_id: this.props.firebase.doGetCurrentUserId(),
                  username: values.username,
                  verfied: false
                })
                  .then(function (response) {
                    console.log(response);

                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            });
            }
            else {
              alert("Invalid email address! ")
            }
          })


          actions.setSubmitting(false);
        }}

        const validationSchema={
          Yup.object().shape({
            firstname: Yup.string().required("Required"),
            lastname: Yup.string().required("Required"),
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
              .test('passwords-match', 'Passwords must match', function (value) {
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

                        <label htmlFor="firstname">First Name</label>
                        <input
                          type="text"
                          name="firstname"
                          placeholder="First name"
                          value={values.firstname}
                          onChange={handleChange}
                          onBlur={handleBlur}

                        />
                        <label htmlFor="lastname">Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          placeholder="Last name"
                          value={values.lastname}
                          onChange={handleChange}
                          onBlur={handleBlur}

                        />
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
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
                          placeholder="Enter your password"
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
                          placeholder="Re-type your password"
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
                    <Link to={ROUTES.LOGIN}>
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

// Export Form with routing history and Firebase access
export const RegistrationForm = withRouter(withFirebase(RegistrationFormBase));


