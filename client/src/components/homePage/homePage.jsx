// Dependencies
import React from 'react';

export class HomePage extends React.Component {

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
