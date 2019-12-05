// Dependencies
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Project dependencies
import { AuthUserContext, withAuthorization } from '../SessionHandler'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';

export const LoginPage = () => (
  <div>
    <LoginForm />
  </div>
);



class LoginFormBase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          // console.log("Logging in", values);
          setSubmitting(false);

          // Firebase log-in auth
          var valid = false;
          this.props.firebase.doSignInWithEmailAndPassword(values.email, values.password)
            .then(function () {
              // console.log('Succesful login! Redirecting to main page!');
              valid = true;
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/wrong-password') {
                alert('Wrong password!');
              }
              else if (errorCode === 'auth/invalid-email') {
                alert('Invalid email!');
              }
              else if (errorCode === 'user-not-found') {
                alert('Profile with given email not found!');
              }
              else {
                alert(errorMessage);
              }
            })
            .then(() => {
              if (valid === true) {
                // console.log('Success!');

                // Outputs user UID to console
                var user = this.props.firebase.doGetCurrentUser()
                // console.log("userid: " + user.uid)

                this.props.history.push({ pathname: '/feed' });
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
            handleSubmit,
          } = props;
          return (

            <form onSubmit={handleSubmit}>
              <div className="login">
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
                      <Link to="/forgot">
                        <div className="forgotPassword">Forgot Password?</div>
                      </Link>
                    </div>
                  </div>
                  <div className="footer">
                    <button type="submit" className="btn" disabled={isSubmitting}>
                      Login
                    </button>
                    <Link to={ROUTES.REGISTER}>
                      <button type="button" className="btn">
                        Sign-up
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

export const LoginForm = withRouter(withFirebase(LoginFormBase));