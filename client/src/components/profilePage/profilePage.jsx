// Dependencies
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import * as bad_words from "bad-words";


// Project dependencies
import { withAuthorization } from '../SessionHandler';
import troll from "../../images/TrollFace.jpg";
import APIClient from '../apiClient';
import { PersonalFeed } from '../personalFeed';

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
            loggedInUser: this.props.firebase.doGetCurrentUserId(),
            userData: {
                bio: "NONE",
                email: "",
                fullName: "Julian Haresco",
                followers: parseInt("0"),
                following: parseInt("0"),
                profile_pic: null,
                username: "",
                verified: true,
                // Set it to parse -- just in case we don't know how database will
                //  pull the data
            }
        }
    }

    componentDidMount() {
        this.getUserData();
    }

    profileValidation = Yup.object().shape({
        bio: Yup.string()
            .min(2, "Please enter something in the bio")
            .max(250, "Too long of a bio")
        // birthday: Yup.string()
        //     .matches(/^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[12])\1(?:19|20)\d\d$/,
        //         'Please enter in "dd/mm/yyyy"'),
        // location: Yup.string()
        //     .test('safe-location', 'Please give your actual location', function (value) {
        //         var filter = new bad_words();
        //         return filter.isProfane(value) === false;
        //     })
        //     .matches(/[,][ ]/, 'Please specify a location as "City, State"')
    })

    render() {
        return (
            <Formik
                enableReinitialize
                initialValues={{
                    fullName: this.state.userData.fullName,
                    username: this.state.userData.username,
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
                        this.updateProfile(values);
                        console.log("sending edit")
                    }

                    setSubmitting(true);
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
                                <div className="profile">
                                    <div id="main">

                                        {/* <div className="userImg">
                                            {/* <img src={troll} alt={"No Image set"} />
                                         </div> */}
                                        <div className="usrInfo">
                                            <div className="username">

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
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                            </div>
                                            {/* Bio */}
                                            <div className="usrBio">
                                                <h4> Bio</h4>
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
                                            {/* <tbody>
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
                                            </tbody> */}
                                        </table>

                                    </div>
                                    <div className="editButtons">
                                        <button id="editFile" type="submit"> {values.editState} Profile</button>
                                    </div>
                                </div>

                                <div className="container">
                                    <PersonalFeed p={this.props}/>
                                </div>
                        </form>
                    );
                }
                }
            </Formik >


        );
    };

    async getUserData() {
        let path = '/profile/' + this.state.loggedInUser;

        await APIClient.get(path).then(
            (result) => {
                let data = result.data
                console.log(data)
                this.setState({
                    userData: {
                        fullName: data.first_name + " " + data.last_name,
                        username: data.username,
                        email: data.email,
                        bio: data.bio,
                        followers: parseInt(data.num_followers),
                        following: parseInt(data.num_following),
                    }
                });
            });
    }

    async updateProfile(data) {
        let path = '/profile/' + this.state.loggedInUser;
        let nameSplit = data.fullName.split(" ");
        console.log(data)
        let json = await APIClient.put(path, {

            username: data.username,
            email: this.state.userData.email,
            first_name: nameSplit[0],
            last_name: nameSplit[1],
            num_followers: data.followers,
            num_following: data.following,
            profile_pic: null,
            verified: true,
            bio: data.bio,
        });
        return json;
    }


}

const condition = authUser => !!authUser;
export const ProfileForm = withAuthorization(condition)(ProfilePageBase);
