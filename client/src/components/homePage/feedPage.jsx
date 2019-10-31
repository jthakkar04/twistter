// Dependencies
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Project dependencies
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';

export const FeedPage = () => (
    <div>
        <FeedPageForm />
    </div>
);

class FeedPageBase extends React.Component {

    // Set state so it can be redirected if not logged in
    state = {
        redirectToReferrer: false
    }

    render() {

        return (
            <div>
                <h1>Home Page</h1>
            </div>

        );
    }
}

export const FeedPageForm = withRouter(withFirebase(FeedPageBase));