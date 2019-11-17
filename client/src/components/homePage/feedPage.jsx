// Dependencies
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";



// import * as APIClient from '../../apiClient/apiClient';
// import * as clients from '../apiClient/apiClient';

// Project dependencies
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/app_routing';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { render } from "react-dom";
import request from "superagent";
import debounce from "lodash.debounce";

import axios from 'axios';
import APIClient from '../apiClient/apiClient';
// import * as apiConsts from '../../../constants/api';

export const FeedPage = () => (
    <div>
        <FeedPageForm />
    </div>
);

const BASE_URI = 'http://localhost:5000/todo/api/v1.0';
const AWS_CONST = 'http:13.58.22.129:5000/'

const devEnv = true;
const client = axios.create({
  baseURL: devEnv == true ? BASE_URI : AWS_CONST,
  json: true
});
class FeedPageBase extends React.Component {

    // constructor(props){ 
    //     super(props)
    //     this.state = {
    //         redirectToReferrer: false,
    //     }
    // }

    constructor(props) {
        super(props);
    
        // Sets up our initial state
        this.state = {
          error: false,
          hasMore: true,
          isLoading: false,
          users: [],
          userid: this.props.firebase.doGetCurrentUserId()
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
        // this.loadUsers();
        console.log("feed: " + this.state.userid)
        // clients.getFeed(this.state.userid)
        // console.log(this.props.clients.getFeed(this.state.userid))
        // axios.get('http://localhost:5000/todo/api/v1.0/timeline/${this.state.userid}')
        //   .then(res => {
        //     console.log(res);
        //   })
        this.getTimelineData().then((result =>{
          console.log("data");
          let data = result.data;
          console.log(data);
        }));
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
          
          <div style={{marginTop:30}}>
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
        );
      }
      async getTimelineData(){
        let path = '/timeline/' + this.state.userid;
        let json = await APIClient.get(path);
        console.log(json);
        return json;
      }
    }

export const FeedPageForm = withRouter(withFirebase(FeedPageBase));
