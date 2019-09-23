import React from "react";
import loginImg from "../../login.svg";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

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
    return(
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
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

        validationSchema = {Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required"),
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
                    className = {errors.password && touched.password && "error"}
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
              <button type="button" className="btn">
                Register
              </button>
            </div>
            {/* <div className="container">
            <tr>
              <td>Don't Have an Account?</td>
              <td><a href={"localhost:3000/register"}>Sign Up Here</a></td>
            </tr>
            </div> */}
          </div>
          </form>
        );
  }
  }
  </Formik>
    );
}
}