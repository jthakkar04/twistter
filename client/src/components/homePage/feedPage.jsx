// Dependencies
import React from 'react';
import { MicroBlog } from "../microblog";
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

    constructor(props){ 
        super(props)
        this.state = {
            redirectToReferrer: false,
        }
    }

    // Set state so it can be redirected if not logged in
    // state = {
    //     redirectToReferrer: false
    // }

    render() {
        const data = ['one', 'two', 'three']
        return (
            <div>
                <h1>Home Page: {data}</h1>
                <div>
                    {/* < MicroBlog data={data} /> */}
                    <ul class="flex-container column">
                        {/* <MicroBlog data={data}/> */}
                        <li className="flex-item">1</li>
                        <li className="flex-item">2</li>
                        <li className="flex-item">3</li>
                        <li className="flex-item">4</li>
                        <li className="flex-item">5</li>
                    </ul>
                </div>
            </div>

        );
    }
}

export const FeedPageForm = withRouter(withFirebase(FeedPageBase));