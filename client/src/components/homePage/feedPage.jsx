// Dependencies
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

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
// import { Microblog } from '../microblog/microblog'
import Microblog from '../microblog/microblog';

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

      constructor(props){
        super(props);
      }
    
      render() {
        return (
          <div>
            <div style={{marginTop:30}}>
              <textarea rows="15" cols="100" placeholder="Twist here..." font-size="30"></textarea>
              <button type="submit" className="btn">
                      Twist!
              </button>
            </div>

            <h1>Microblogs</h1>

            <div className="container">
              <Microblog p={this.props}/>
            </div>
             
          </div>
        );
      }
    }

export const FeedPageForm = withRouter(withFirebase(FeedPageBase));
