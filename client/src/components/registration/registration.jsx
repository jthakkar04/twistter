import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import helpers from './registrationLogic'
// import loginImg from "../../login.svg";

export class Registration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Formik
        initialValues={{ username: "", email: "", password: "", verifyPassword: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log(helpers.validation(values.password, values.verifyPassword))
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}

        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required("Required"),
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
                <div className="header">Registration</div>
                <div className="content">
                  {/* <div className="image">
            <img src={loginImg} />
          </div> */}
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
                      <label htmlFor="verifyPassword">Confirm Password</label>
                      <input
                        type="password"
                        name="verifyPassword"
                        placeholder="Re-type your Password"
                        value={values.verifyPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.verifyPassword && touched.verifyPassword && "error"}
                      />
                      {errors.verifyPassword && touched.verifyPassword && (
                        <div className="input-feedback">{errors.verifyPassword}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    Sign Up
              </button>
                  <button type="button" className="btn" >
                    Login
              </button>

                </div>
              </div>
            </form>

          );
        }
        }
      </Formik>
    );
  }
}