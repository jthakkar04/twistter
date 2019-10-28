import React from 'react';
import troll from "../../images/TrollFace.jpg";

export class Profile extends React.Component {

    // Set state so it can be redirected if not logged in
    state = {
        redirectToReferrer: false
    }

    render() {

        return (
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

        );
    }
}