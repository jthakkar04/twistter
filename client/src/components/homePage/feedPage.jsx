// Dependencies
//import React from 'react';
import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";
import debounce from "lodash.debounce";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export class FeedPage extends React.Component {

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
        }, 100);
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
                hasMore: (this.state.users.length < 100),
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
          <div>
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
        );
      }    
}

const container = document.createElement("div");
document.body.appendChild(container);
//render(<InfiniteUsers />, container);