// Dependencies
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Project dependencies
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';
import SignOutButton from '../SignOut';


import troll from "../../images/TrollFace.jpg";

export const ProfilePage = () => (
    <div>
        <ProfileForm />
    </div>
);

class ProfilePageBase extends React.Component {

    // Set state so it can be redirected if not logged in
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,
            disable: true
        }
    }
    
    render() {
        return (
        <Formik 
            initialValues={{ 
                fullName: "Julian Haresco", 
                userName: "jharesco" ,
                location: "Cupertino,CA",
                bio: "SUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUP",
                followers: "10000",
                following: "10000",
                birthday:"10/31/2019",
                editable: false,
                editState: "Edit"
            }}
            onSubmit = {(values, {setSubmitting }) => {
                setSubmitting(false);

                if (values.editable === false) {
                    values.editable = true; 
                    values.editState = "Save";
                    console.log("making edits")  
                } else{
                    // Create JSON string for values and send request
                    values.editable = false
                    values.editState = "Edit";
                    console.log("sending edit")
                }
                setSubmitting(true);
            }}
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
                <form onSubmit={handleSubmit} on>
                <div>
                        <div className="profile">
                            <div id="main">
        
                                <div className="userImg">
                                    <img src={troll} alt= {"No Image set"} />
                                </div>
                                <div className="usrInfo">
                                    <div className="userName">
                                        <input type="text" 
                                            id="fullName" 
                                            name="fullName"
                                            disabled={!values.editable} 
                                            value={values.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />

                                        <input type="text" 
                                            id="tag" 
                                            name="username"
                                            disabled={!values.editable} 
                                            value={values.userName}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    <div className="usrBio">
                                        <input type="text" 
                                            name="bio"
                                            disabled={!values.editable} 
                                            value={values.bio} 
                                            onChange={handleChange}
                                            onBlur={handleBlur}/>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="userStats">
                                <table>
                                    <tr>
                                        <td > Followers: <input type="text" name="followers" disabled={!values.editable} value={values.followers} onChange={handleChange} onBlur={handleBlur}/> </td>
                                        <td > Following: <input type="text" name="following" disabled={!values.editable} value={values.following} onChange={handleChange} onBlur={handleBlur}/> </td>
                                    </tr>
                                    <tr>
                                        <td> Location: <input type="text" name="location" disabled={!values.editable} value={values.location} onChange={handleChange} onBlur={handleBlur}/> </td>
                                        <td> Birthdate: <input type="text" name="birthday" disabled={!values.editable} value={values.birthday} onChange={handleChange} onBlur={handleBlur}/> </td>
                                    </tr>
                                </table>
        
                            </div>
                            <div className="editButtons">
                                <button id="editFile" type= "submit"> {values.editState} Profile</button>
                                <div className="spacer" />
                                <SignOutButton />
                            </div>
                        </div>
        
                        <div class="personalFeed">
                            <div class="microblog">
                                Fill with code from feed/microblogs
                            </div>
                        </div>
                    </div>
                </form>
                );
            }
        }
        </Formik >
                
    
            );
        };
    }


export const ProfileForm = withRouter(withFirebase(ProfilePageBase));