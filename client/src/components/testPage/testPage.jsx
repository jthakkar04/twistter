// Dependencies
import React from 'react';
import { Redirect } from 'react-router-dom';

export class TestPage extends React.Component {

    // Set state so it can be redirected if not logged in
    state = {
        redirectToReferrer: false
    }

    render() {
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return < Redirect to='/login' />
        }
        return (
            <div>
                <h1>WE'RE WORKING BITCHES</h1>
            </div>

        );
    }
}
