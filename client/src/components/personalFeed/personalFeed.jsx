// Dependencies
import React, { Fragment } from 'react';

// Project dependencies
import debounce from "lodash.debounce";
import moment from 'moment';

import axios from 'axios';
import APIClient from '../apiClient/apiClient';

const BASE_URI = 'http://localhost:5000/todo/api/v1.0';
const AWS_CONST = 'http:13.58.22.129:5000/'

const devEnv = true;
const client = axios.create({
  baseURL: devEnv == true ? BASE_URI : AWS_CONST,
  json: true
});

export class PersonalFeed extends React.Component {
    
    constructor(props) {
        super(props);
    
        // Sets up our initial state
        this.state = {
          error:false,
          hasMore: true,
          isLoading:false,
          microblogs:[],
          currentTwists: [],
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
            this.getTimelineData();
          }
        }, 100);
      }
    
      componentDidMount() {
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
            <Fragment key={microblog.twistId}>
                <div style={{ display: 'flex' }} className="microblogs">
                {/* <img
                    alt={microblog.photo}
                    src={microblog.photo}
                    style={{
                    borderRadius: '50%',
                    height: 72,
                    marginRight: 20,
                    width: 72,
                    }}
                /> */}
                <div className="twist" id = {microblog.twistId}>
                    <h2 style ={{ textAlign:"center" }}>
                    {microblog.text}
                    </h2>
                    <div className="microBody" style={{ flexDirection: "column"}}>
                        <p style={{ color:"#067096", fontSize: 15, fontWeight: "bold" }}>{microblog.user}</p>
                        <p style={{ color:"#067096" }}>{microblog.time}</p>
                    </div>
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
        let path = '/feed/' + this.state.userid;

        // let json = await APIClient.get(path);
        this.setState({
          isLoading:true
        })
        await APIClient.get(path).then((result) =>{

          const nextMicroblogs = result.data.map(microblog => ({
            user: microblog.username,
            // user:microblog.user_id,
            time: this.getTime(microblog.timestamp).toString(),
            photo: microblog.link,
            text: microblog.text,
            twistId: microblog.twist_id

          }));

          let nonRepeatedBlogs = []

          for (let i = 0; i < nextMicroblogs.length; i++){
            if (!this.state.currentTwists.includes(nextMicroblogs[i].twistId)){
              this.state.currentTwists.push(nextMicroblogs[i].twistId);
              nonRepeatedBlogs.push(nextMicroblogs[i]);
            }
          }

          this.setState({
            hasMore: (this.state.microblogs.length < 10 && nonRepeatedBlogs != 0),
            isLoading: false,
            microblogs: [
              ...this.state.microblogs,
              ...nonRepeatedBlogs
            ],
          });
        }).catch((err) => {

          this.setState({
            error: err.message,
            isLoading:false,
          })
        })

        // await APIClient.get(path).then((res) => {
        //   console.log(res);
        // })

      }

      getTime(timestamp){
        var newDate = moment(new Date(timestamp * 1000)).format('MM/DD/YYYY hh:MM');
        return newDate;
      }

}

export default PersonalFeed