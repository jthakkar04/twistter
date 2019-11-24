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

const BASE_URI = 'http://localhost:5000/todo/api/v1.0';
const AWS_CONST = 'http:13.58.22.129:5000/'

const devEnv = true;
const client = axios.create({
  baseURL: devEnv == true ? BASE_URI : AWS_CONST,
  json: true
});

export class MicroBlog extends React.Component {

    
    constructor(props) {
        super(props);
    
        // Sets up our initial state
        this.state = {
          error:false,
          hasMore: true,
          isLoading:false,
          microblogs:[],
        //   p: this.props.p,
          userid: this.props.p.firebase.doGetCurrentUserId(),
        };
    
        window.onscroll = debounce(() =>{
          const {
            getTimelineData,
            state: {
              error, 
              isLoading, 
              hasMore
            },
          } = this;

          if(error || isLoading || !hasMore) return;

          if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
          ) {
            getTimelineData();
          }
        }, 100);
      }
    
      componentWillMount() {
        this.getTimelineData();
      }
    
      render() {
        const {
          error,
          hasMore,
          isLoading,
          microblogs,
        } = this.state;
    
        return (
            <div>
            {microblogs.map(microblog => (
            <Fragment key={microblog.user_id}>
                <div style={{ display: 'flex' }} className="microblogs">
                <img
                    alt={microblog.photo}
                    src={microblog.photo}
                    style={{
                    borderRadius: '50%',
                    height: 72,
                    marginRight: 20,
                    width: 72,
                    }}
                />
                <div>
                    <h2 style={{ marginTop: 0 }}>
                    {microblog.text}
                    </h2>
                    <p>{microblog.user}</p>
                    <p>{microblog.time}</p>
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
        // let json = await APIClient.get(path);
        this.setState({
          isLoading:true
        })
        await APIClient.get(path).then((result) =>{
          console.log(result.data);
          const nextMicroblogs = result.data.map(microblog => ({
            user: this.getUsernameData(microblog.user_id).toString(),
            // user:microblog.user_id,
            time: this.getTime(microblog.timestamp).toString(),
            photo: microblog.link,
            text: microblog.text,

          }));
          this.setState({
            hasMore: this.state.microblogs.length < 10,
            isLoading: false,
            microblogs: [
              ...this.state.microblogs,
              ...nextMicroblogs
            ],
          });
        }).catch((err) => {
          this.setState({
            error: err.message,
            isLoading:false,
          })
        })

        // return json;
      }

    //   getUsername(user_id){
    //       this.getUsernameData(user_id).then((result)=>{
    //           console.log("data")
    //           console.log(result.data)
    //           return result.data['username']
    //       });
    //   }

       async getUsernameData(user_id){
          let path = '/profile/' + user_id;
          return await APIClient.get(path).then((result) => {
              console.log("data")
              console.log(result.data)
              return result.data['username']
          });
      }

      getTime(timestamp){
        var d = new Date(0);
        d.setUTCSeconds(timestamp);
        return d;
      }

}

export default MicroBlog