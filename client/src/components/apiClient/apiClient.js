import axios from 'axios';
import * as apiConsts from '../../../constants/api';

const BASE_URI = 'http://localhost:5000/todo/api/v1.0';

const devEnv = True;
const client = axios.create({
  baseURL: devEnv == True ? BASE_URI : apiConsts.AWS_CONST,
  json: true
});

class APIClient {
  
  constructor(/* include auth token, credentials if needed for server */){}

    // LOGIN 
    /*
    * Gets user id of the user who just logged in to create specific instance for user
    * @param: username - username of user who just logged in
    * @return - 200 status, userID for user who just logged in
    */
    getSessionUser(username){
        return this.perform('get', '/login/${username}');
    }

    // REGISTRATION
    /*
    * Adds new user id of the user who just logged in to create specific instance for user
    * @param: userinfo - data for user signing 
    * @return 200 status if successful, 400 level if not
    */
    putUser(userInfo){
        return this.perform('put', '/register',userInfo);
    }

    // MicroBlogs
    /*
    * Add new microblog to db associated with specific user
    * @param - metadata for microblog
    * @return - 200 status, none
    */
    putPost(userID, metadata){
      return this.perform('put','/feed/${userID}', metadata);
    }

    /*
    * Get metadata for tweet specified by the tweetId
    * @param - userID: data for microblog that will be displayed
    * @param - tweetId: id of specifc tweet that is being requested
    * @return - 200 status, metadata for the tweet specified by tweetID
    */
    getPost(userID,tweetId){
      return this.perform('get','/feed/${userID}/${tweetId}');
    }

    // Feed
    /*
    * Get all microblogs in specified users feed
    * @param userID - id of current user
    * @return 200 status, List of microblog ids that meet topics specifications of user and followers
    */
    getFeed(userID){
      return this.perform('get', '/feed/${userID}')
    }

    // User Profile
    /*
    * Put updated user information in the database
    * @param userID - id of current user
    * @return 200 status, None
    */
    putProfileData(userID, userInfo){
      return this.perform('put', '/profile/${userID}', userInfo);
    }

    /*
    * Get specified user information in the database
    * @param userID - id of current user
    * @return 200 status, metadata for the user
    */
    getProfileData(userID, userInfo){
      return this.perform('get', '/profile/${userID}');
    }


  async perform (method, resource, data) {
    return client({
      method,
      url: resource,
      data: JSON.stringify(data),
      headers: {
        // Authorization: `Bearer ${this.accessToken}`
      }
    }).then(resp => {
      return resp.data ? resp.data : [];
    })
  }
}

export default APIClient;