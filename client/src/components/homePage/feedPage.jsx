// Dependencies
import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";


// Project dependencies
import { AuthUserContext, withAuthorization } from '../SessionHandler'
import request from "superagent";
import debounce from "lodash.debounce";

import axios from 'axios';
import APIClient from '../apiClient';
import Table from '../Table/table'
// import { Microblog } from '../microblog/microblog'
import Microblog from '../microblog/microblog';
var fuzzy = require("fuzzy");


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
        this.state = {
          userid: this.props.firebase.doGetCurrentUserId(),
          twist:"",
          searchWord:"",
          searchMatches:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.createTwist = this.createTwist.bind(this);
        // this.searchChange = this.searchChange.bind(this);
        // this.getUsernames = this.getUsernames.bind(this);
      }

      componentDidMount(){
        this.getUsernames();
      }

      createTwist(e){
        console.log("create: " + this.state.twist);
        let path = '/feed';
        axios({
          method: 'post',
          url: BASE_URI + path,
          headers: {}, 
          data: {
            user_id: this.state.userid, 
            text: this.state.twist,
            link: "NONE",
            reply: "NONE"
          }
        }).then((result) => {
          document.getElementById("twist").value=""
        }).catch((err) =>{
          console.log(err.message)
        })

      }

      handleChange(e){
        this.setState({
          twist: e.target.value
        })
      }

      // searchChange(event) {
      //   this.setState({ searchWord: event.target.value });
      // }

      async getUsernames(){
        let path = "/feed/users"
        await APIClient.get(path).then((result) => {
          // return result.data;
          console.log(result)
        })
        // .catch((err) => {
        //   console.log("error: " + err)
        // })
        // let path = BASE_URI + "/feed/users"
        // axios.get(path)
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
      }
    
      render() {
        const { searchWord } = this.state;
        // this.getUsernames();
        // console.log(list);
        var options = {
          pre: "<b>",
          post: "</b>",
          extract: function(el) {
            console.log(el);
            return el.username;
          }
        };

        // var results = fuzzy.filter(searchWord, list, options);
        // var results = results.map(e => e.original);

        return (
          <div>
            <div className="form">
                <input type="text" placeholder="Search for users" name="searchWord" value={this.state.searchWord} onChange={this.searchChange}/>
                {/* <Table searchMatches={results}/> */}
            </div>
            <div style={{marginTop:30}}>
              <textarea id="twist" rows="15" cols="100" placeholder="Twist here..." font-size="30" onChange={this.handleChange}></textarea>
              <button type="submit" className="btn" onClick={this.createTwist}>
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
    // );
  }
// }

const condition = authUser => !!authUser;
export const FeedPageForm = withAuthorization(condition)(FeedPageBase);
