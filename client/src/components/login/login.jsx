// Dependencies
import React from 'react';
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import * as firebase from "firebase/app";
import "firebase/auth";

// Formatting

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {

    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={ async (values, { setSubmitting }) => {
            console.log("Logging in", values);
            setSubmitting(false);

            // Firebase log-in auth
            /**
             * 
             * 
             * 
             */
            var valid = false
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(function(firebaseUser) {
              console.log('Succesful login! Redirecting to main page!');
              valid = true
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/wrong-password') {
                alert('Wrong password!');
              }
              else if (errorCode == 'auth/invalid-email') {
                alert('Invalid email!')
              }
              else {
                alert(errorMessage);
              }
            })
            .then(() => {
              if (valid === true){
                console.log('Success!');
                this.props.history.push("/testpage");
              }
            })
            
            
            
            
        }}

        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid email')
            .required('Required'),
          password: Yup.string()
            .min(8, "Invalid Password") // Keeps the min length of password to be 8 characters
            .required("Required")
            .matches(/(?=.*[0-9])/, "Invalid Password") // Makes sure the password has a number in there
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
              <div className="base-container" ref={props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                  <div className="form">
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
                  </div>
                </div>
                <div className="footer">
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    Login
                    </button>
                  <Link to="/register">
                    <button type="button" className="btn">
                      Sign-up
                    </button>
                  </Link>
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