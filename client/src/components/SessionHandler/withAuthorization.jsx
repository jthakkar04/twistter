import React from 'react';
import AuthUserContext from './context';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';
const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.LOGIN);
                    }
                },
            );
        }
        componentWillUnmount() {
            this.listener();
        }
        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }
    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization);
};
export default withAuthorization;