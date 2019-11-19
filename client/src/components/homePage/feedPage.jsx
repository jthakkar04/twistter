// Dependencies
import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Project dependencies
import { AuthUserContext, withAuthorization } from '../SessionHandler'
import request from "superagent";
import debounce from "lodash.debounce";

export const FeedPage = () => (
  <div>
    <FeedPageForm />
  </div>
);

class FeedPageBase extends React.Component {

  // Set state so it can be redirected if not logged in
  state = {
    redirectToReferrer: false
  }

  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
    };

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadUsers();
      }
    }, 1000);
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get('https://randomuser.me/api/?results=10')
        .then((results) => {
          // Creates a massaged array of user data
          const nextUsers = results.body.results.map(user => ({
            email: user.email,
            name: Object.values(user.name).join(' '),
            photo: user.picture.medium,
            username: user.login.username,
            uuid: user.login.uuid,
          }));

          // Merges the next users into our existing users
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: (this.state.users.length < 1000),
            isLoading: false,
            users: [
              ...this.state.users,
              ...nextUsers,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
          });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      users,
    } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div style={{ marginTop: 30 }}>
            {/* <input placeholder="hi" marginTop="10"  height= "390" padding= "5" margin-top= "6" */}
            <textarea rows="15" cols="100" placeholder="Twist here..." font-size="30"></textarea>
            <button type="submit" className="btn">
              Twist!
            </button>
            {/* min-width="18em"
          height="37"
          padding=" 0 10"
          font-size= "16"></input> */}
            <h1>Infinite Users!</h1>
            <p>Scroll down to load more!!</p>
            {users.map(user => (
              <Fragment key={user.username}>
                <hr />
                <div style={{ display: 'flex' }}>
                  <img
                    alt={user.username}
                    src={user.photo}
                    style={{
                      borderRadius: '50%',
                      height: 72,
                      marginRight: 20,
                      width: 72,
                    }}
                  />
                  <div>
                    <h2 style={{ marginTop: 0 }}>
                      @{user.username}
                    </h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                  </div>
                </div>
              </Fragment>
            ))}
            <hr />
            {error &&
              <div style={{ color: '#900' }}>
                {error}
              </div>
            }
            {isLoading &&
              <div>Loading...</div>
            }
            {!hasMore &&
              <div>You did it! You reached the end!</div>
            }
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;
export const FeedPageForm = withAuthorization(condition)(FeedPageBase);
