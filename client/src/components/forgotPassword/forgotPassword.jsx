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

}

export const ForgotPasswordForm = withRouter(withFirebase(ForgotPasswordBase));
