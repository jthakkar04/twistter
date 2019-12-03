// Dependencies
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Project dependencies
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';



export const ForgotPasswordPage = () => (
    <div>
        <ForgotPasswordForm />
    </div>
);

class ForgotPasswordBase extends React.Component{
    constructor(props) {
        super(props);
      }
    
      // TODO CHANGE LOGIN TO FORGOT PASSWORD ON FIREBASE
      render() {
    
        return (
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={ async (values, { setSubmitting }) => {

                // console.log("Logging in", values);
                setSubmitting(false);
    
                // Firebase log-in auth
                var valid = false;
                this.props.firebase.doPasswordReset(values.email).then(function() {
                  // Email sent.
                }).catch(function(error) {
                  // An error happened.
                });

                
            }}
    
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email')
                .required('Required'),
              
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
                  <div className="login">
                  <div className="base-container" ref={props.containerRef}>
                    <div className="header">Forgot Password</div>
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
                        <button type="submit" className="btn" disabled={isSubmitting}>
                          Send Reset Email
                        </button>
                      </div>
                    </div>
                    <div className="footer">
                      <Link to={ROUTES.LOGIN}>
                      <button type="submit" className="btn">
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

export const ForgotPasswordForm = withRouter(withFirebase(ForgotPasswordBase));
