// Dependencies
import React from 'react';
// import { useState } from 'react-dom';
import { withRouter } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

// Project dependencies
import { withFirebase } from '../Firebase';
import APIClient from '../apiClient';
import * as ROUTES from '../../constants/app_routing';

import styled from "@emotion/styled";
import { useTheme } from "../../ThemeContext";

export const SettingsPage = () => (
    <div>
        <SettingBase />
    </div>
);



class SettingPageBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
        }


        this.handleClose = () => {
            this.setState({ show: true });
        };
        this.handleShow = () => {
            this.setState({ show: true });
        };

        this.changeColor = () => {
            console.log("changing color");
            console.log(props);

            /* INSER MAYURI'S CODE */
        }

        this.deleteProfile = () => {
            console.log("deleteing client");
            var didDelete = false

            // Wrap in Call to delete user from database

            this.props.firebase.doDeleteCurrentUser().then(
                (resp) => {
                    didDelete = true;
                }).catch((err) => {
                    if (err.code == "auth/requires-recent-login") {
                        alert("Must have recently signed in to delete account. Redirecting to Login");
                        this.props.firebase.doSignOut();
                        this.props.history.push(ROUTES.LOGIN);
                    }
                }).then(() => {
                    if (didDelete === true) {

                        this.props.history.push(ROUTES.LOGIN);
                    }
                });

        }
    }


    render() {
        return (

            <div className="settings">
                <div className="settingOption" >
                    <p id="label">Delete Profile</p>
                    <Button variant="danger" size="sm" onClick={this.deleteProfile}>Delete Profile</Button>
                </div>
                <ThemeButton />
                <div className="topicEditor">
                </div >
            </div >

        );

    }

}

const ThemeButton = () => {
    const themeState = useTheme();
        return (
            <div className="settingOption">
                <p id="label">Toggle Color Scheme</p>
                <Button variant="primary" size="sm" onClick={() => themeState.toggle()}>
                    {themeState.dark ? "Light Mode" : "Dark Mode"}</Button>
            </div>
    );
}


export const SettingBase = withRouter(withFirebase(SettingPageBase));