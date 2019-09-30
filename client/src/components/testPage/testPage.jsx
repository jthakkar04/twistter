// Dependencies
import React from 'react';

export class TestPage extends React.Component {

    // Set state so it can be redirected if not logged in
    state = {
        redirectToReferrer: false
    }

    render() {

        return (
            <div>
                <h1>WE'RE WORKING BITCHES</h1>
            </div>

        );
    }
}
