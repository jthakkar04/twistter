// Dependencies
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import * as bad_words from "bad-words";

import axios from "axios";

// Project dependencies
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../SessionHandler';
import SignOutButton from '../SignOut';
import troll from "../../images/TrollFace.jpg";
import APIClient from '../apiClient';

export const ProfilePage = () => (
    <div>
        <ProfileForm />
    </div>
);

class ProfilePageBase extends React.Component {

    // Set state so it can be redirected if not logged in
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            disable: true,
            // currentUserID: 1,
            userData: {
                fullName: "Julian Haresco",
                userName: "",
                location: "",
                birthday: "",
                bio: "",
                // Set it to parse -- just in case we don't know how database will
                //  pull the data
                followers: parseInt("0"),
                following: parseInt("0"),
            }
        }
    }

    componentDidMount() {


        this.getUserData().then((result) => {
            console.log("data");
            let data = result.data;
            console.log(data);
            this.renderUserData(data);
        });
    }

    profileValidation = Yup.object().shape({
        // fullName: Yup.string()
        // .required("Required")
        // .test('safe-name', 'Please give your actual name', function (value) {
        //     var filter = new bad_words();
        //     return filter.isProfane(value) === false;
        // }),
        bio: Yup.string()
            .min(2, "Please enter something in the bio")
            .max(250, "Too long of a bio"),
        birthday: Yup.string()
            .matches(/^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[12])\1(?:19|20)\d\d$/,
                'Please enter in "dd/mm/yyyy"'),
        location: Yup.string()
            .test('safe-location', 'Please give your actual location', function (value) {
                var filter = new bad_words();
                return filter.isProfane(value) === false;
            })
            .matches(/[,][ ]/, 'Please specify a location as "City, State"')
    })

    render() {
        return (
            <Formik
                enableReinitialize
                initialValues={{
                    // fullName: "",
                    // userName: "",
                    // location: "",
                    // bio: "",
                    // followers: "",
                    // following: "",
                    // birthday: "",
                    fullName: this.state.userData.fullName,
                    userName: this.state.userData.userName,
                    location: this.state.userData.location,
                    bio: this.state.userData.bio,
                    followers: this.state.userData.followers,
                    following: this.state.userData.following,
                    birthday: this.state.userData.birthday,
                    editable: false,
                    editState: "Edit"
                }}

                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);

                    if (values.editable === false) {
                        values.editable = true;
                        values.editState = "Save";
                        console.log("making edits")

                    } else {
                        // Create JSON string for values and send request
                        values.editable = false
                        values.editState = "Edit";
                        this.updateProfile(values).then((response) => {
                            console.log(response);
                        });
                        console.log("sending edit")
                    }

                    setSubmitting(true);
                    // dispatchEvent(

                    // )
                }}
                validationSchema={this.profileValidation}
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
                            <div>
                                <div className="profile">
                                    <div id="main">

                                        <div className="userImg">
                                            {/* <img src={troll} alt={"No Image set"} /> */}
                                        </div>
                                        <div className="usrInfo">
                                            <div className="userName">

                                                {/* Full Name */}
                                                <text type="text"
                                                    id="fullName"
                                                    name="fullName"
                                                    // disabled={!values.editable}
                                                    value={values.fullName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} >
                                                    {values.fullName}
                                                </text>

                                                {/*UserName */}
                                                <input type="text"
                                                    id="tag"
                                                    name="username"
                                                    disabled={!values.editable}
                                                    value={values.userName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                            </div>
                                            {/* Bio */}
                                            <div className="usrBio">
                                                <input
                                                    type="text"
                                                    name="bio"
                                                    disabled={!values.editable}
                                                    value={values.bio}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.bio}
                                                    className="placeholder"
                                                />
                                                {errors.bio && touched.bio && (
                                                    <div className="input-feedback">{errors.bio}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="userStats">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td > Followers:
                                                        <text className="follower" type="number" name="followers" onChange={handleChange} onBlur={handleBlur} >
                                                            {values.followers}
                                                        </text>
                                                    </td>

                                                    <td > Following:
                                                        <text className="follower" type="number" name="following" onChange={handleChange} onBlur={handleBlur}>
                                                            {values.following}
                                                        </text>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td> Location:
                                                        <input
                                                            type="text"
                                                            name="location"
                                                            disabled={!values.editable}
                                                            value={values.location}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={errors.location}
                                                        />
                                                        {errors.location && touched.location && (
                                                            <div className="input-feedback">{errors.location}</div>
                                                        )}
                                                    </td>
                                                    <td> Birthdate:
                                                        <input
                                                            type="text"
                                                            name="birthday"
                                                            disabled={!values.editable}
                                                            value={values.birthday}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={errors.birthday && touched.birthday && "Error"}
                                                        />
                                                        {errors.birthday && touched.birthday && (
                                                            <div className="input-feedback">{errors.birthday}</div>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="editButtons">
                                        <button id="editFile" type="submit"> {values.editState} Profile</button>
                                    </div>
                                </div>

                                {/* <div className="personalFeed">
                                    <div className="microblog">
                                        Fill with code from feed/microblogs
                                    </div>
                                </div> */}
                            </div>
                        </form>
                    );
                }
                }
            </Formik >


        );
    };

    async getUserData() {
        let path = '/profile/' + this.state.currentUserID;
        let json = await APIClient.get(path);
        return json;
    }

    renderUserData(data) {
        this.setState({
            userData: {
                fullName: data.first_name + " " + data.last_name,
                userName: data.username,
                location: data.location,
                bio: data.bio,
                followers: data.followers,
                following: data.following,
                birthday: data.birthday,
            }
        });
    }

    async updateProfile(data) {
        let path = '/profile/' + this.state.currentUserID;
        let nameSplit = data.fullName.split(" ");
        // console.log(nameSplit)
        let json = await APIClient.post(path, {
            first_name: nameSplit[0],
            last_name: nameSplit[1],
            userName: data.username,
            location: data.location,
            bio: data.bio,
            followers: data.followers,
            following: data.following,
            birthday: data.birthday,
        });
        return json;
    }


}


export const ProfileForm = withRouter(withFirebase(ProfilePageBase));
