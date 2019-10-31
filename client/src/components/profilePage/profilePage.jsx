// Dependencies
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Project dependencies
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';


import troll from "../../images/TrollFace.jpg";

export const ProfilePage = () => (
    <div>
        <ProfileForm />
    </div>
);

class ProfilePageBase extends React.Component {

    // Set state so it can be redirected if not logged in
    state = {
        redirectToReferrer: false
    }

    render() {

        return (
            <div>
                <div className="profile">
                    <div id="main">

                        <div className="userImg">
                            <img src={troll} alt= {"No Image set"} />
                        </div>
                        <div className="usrInfo">
                            <div className="userName">
                                <text id="fullName"> Full Name </text>
                                <text id="tag"> @userName </text>
                            </div>
                            <div className="usrBio">
                                <text>Bio </text>
                            </div>
                        </div>
                    </div>
                    
                    <div class="userStats">
                        <table>
                            <tr>
                                <td > Followers: {"1-----"} </td>
                                <td > Following: {"100000"}</td>
                            </tr>
                            <tr>
                                <td> Location: {"Cupertinto,CA"} </td>
                                <td> Birthday: {'MM/DD/YEAR'}</td>
                            </tr>
                        </table>

                    </div>
                    <div className="editButtons">
                        <button id="editFile" type="button">Edit Profile</button>
                        <div className="spacer" />
                        <button id="signOut" type="button">Sign Out</button>
                    </div>
                </div>

                <div class="personalFeed">
                    <div class="microblog">
                        Fill with code from feed/microblogs
                    </div>
                </div>
            </div>

        );
    }
}

export const ProfileForm = withRouter(withFirebase(ProfilePageBase));