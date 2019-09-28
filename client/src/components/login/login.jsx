// Dependencies
import React from 'react';
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Registration } from '../registration';
import * as Yup from "yup";

// Formatting
import "./style.scss";


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("Logging in", values);
            setSubmitting(false);
          }, 500);
        }}

        // validate={values => {
        //   let errors = {};
        //   if (!values.values.email) {
        //     errors.email = "Required";
        //   } else if (!EmailValidator.validate(values.email)) {
        //     errors.email = "Invalid Email Address";
        //   }
        //   return errors;
        // }}

        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required")
            .matches(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid Email"),
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
                        //value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
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