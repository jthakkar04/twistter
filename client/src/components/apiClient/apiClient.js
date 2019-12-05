import axios from 'axios';
import * as apiConsts from '../../constants/api';

const BASE_URI = 'http://localhost:5000/todo/api/v1.0';

const devEnv = true;
export default axios.create({
  baseURL: devEnv == true ? BASE_URI : apiConsts.AWS_CONST,
  responseType: "json",
  headers: {
    'Content-Type': 'application/json',
  }
});

// export class APIClient {

//   constructor(/* include auth token, credentials if needed for server */) { }

//   // LOGIN 
//   /*
//   * Gets user id of the user who just logged in to create specific instance for user
//   * @param: username - username of user who just logged in
//   * @return - 200 status, userID for user who just logged in
//   */
//   getSessionUser(username) {
//     let path = '/login/' + username;
//     return this.perform('get', path);
//   }

//   // REGISTRATION
//   /*
//   * Adds new user id of the user who just logged in to create specific instance for user
//   * @param: userinfo - data for user signing 
//   * @return 200 status if successful, 400 level if not
//   */
//   putUser(userInfo) {
//     return this.perform('put', '/register', userInfo);
//   }

//   // MicroBlogs
//   /*
//   * Add new microblog to db associated with specific user
//   * @param - metadata for microblog
//   * @return - 200 status, none
//   */
//   putPost(userID, metadata) {
//     let path = '/feed/' + userID;
//     return this.perform('put', path, metadata);
//   }

//   /*
//   * Get metadata for tweet specified by the tweetId
//   * @param - userID: data for microblog that will be displayed
//   * @param - tweetId: id of specifc tweet that is being requested
//   * @return - 200 status, metadata for the tweet specified by tweetID
//   */
//   getPost(userID, tweetId) {
//     let path = '/profile/' + userID + "/" + tweetId;
//     return this.perform('get', path);
//   }

//   // Feed
//   /*
//   * Get all microblogs in specified users feed
//   * @param userID - id of current user
//   * @return 200 status, List of microblog ids that meet topics specifications of user and followers
//     */
//   getFeed(userID) {
//     let path = '/feed/' + userID;
//     return this.perform('get', path)
//   }

//   // User Profile
//   /*
//   * Put updated user information in the database
//   * @param userID - id of current user
//   * @return 200 status, None
//   */
//   putProfileData(userID, userInfo) {
//     let path = '/profile/' + userID;
//     return this.perform('put', path, userInfo);
//   }

//   /*
//   * Get specified user information in the database
//   * @param userID - id of current user
//   * @return 200 status, metadata for the user
//   */
//   getProfileData(userID, userInfo) {
//     let path = '/profile/' + userID;
//     return this.perform('get', path);
//   }


//   async perform(method, resource, data) {
//     return client({
//       method,
//       url: resource,
//       data: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     }).then(resp => {
//       console.log(resp.data)
//       return resp.data;
//     });
//   }
// }