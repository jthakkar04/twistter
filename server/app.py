from flask import Flask, json, request, render_template, redirect, jsonify, make_response
from flask_cors import CORS
import mysql.connector

cnx=mysql.connector.connect(
    host = "twistter.cnt8cdemn92m.us-east-2.rds.amazonaws.com",
    user="admin",
    passwd="gotrainsgo",
    auth_plugin='mysql_native_password',
    database='twistter'
)
cursor=cnx.cursor(dictionary=True)


app = Flask(__name__)
CORS(app)

@app.route('/todo/api/v1.0/profile/<userId>', methods=['PUT'])
def alter_user(userId):
    userInfo=request.json

    username=userInfo['username']
    email=userInfo['email']
    firstName=userInfo['first_name']
    lastName=userInfo['last_name']
    numFollowers= userInfo['num_followers']
    numFollowing=userInfo['num_following']
    profilePic=userInfo['profile_pic']
    verified= userInfo['verified']
    bio=userInfo['bio']

    query = "UPDATE users SET username=%s, email=%s, first_name=%s, last_name=%s, num_followers=%s, num_following=%s, profile_pic=%s, verified=%s, bio=%s) WHERE user_id=%s"

    vals=(username, email, firstName, lastName, numFollowers, numFollowing, profilePic, verified, bio,userId,)

    cursor.execute(query, vals)
    cnx.commit()
    return '200'

#route for getting specific tweet
@app.route('/todo/api/v1.0/feed/<userId>/<int:tweetId>', methods=['GET'])
def get_tweet(userId, tweetId):
    query="SELECT microblogs.text, users.username FROM users, microblogs WHERE microblogs.twist_id=%s"
    val=(tweetId,)
    cursor.execute(query,val)
    result=cursor.fetchall()
    print(result)

    return jsonify({
        "username": result[0]['username'],
        "tweetText": result[0]['text']
    })

@app.route('/todo/api/v1.0/feed/<userId>', methods=['GET'])
def get_all_tweets_from_user(userId):
    query="SELECT * FROM microblogs WHERE user_id=%s"
    val=(userId,)
    cursor.execute(query,val)
    result=cursor.fetchall()

    return jsonify(result)


@app.route('/todo/api/v1.0/profile/<userId>', methods=['GET'])
def get_userProfile(userId):
    query="SELECT * FROM users WHERE users.user_id=%s"
    val=(userId,)
    cursor.execute(query,val)
    return jsonify(cursor.fetchone())

@app.route('/todo/api/v1.0/feed/<userId>',methods = ['PUT'])
def insert_microblog(userId):
    query="INSERT INTO microblogs (text, timestamp, user_id, link, is_reply) VALUES (%s, %s, %s, %s, %s)"
    tweetText=request.json["text"]
    timestamp=request.json["timestamp"]
    link=request.json["link"]
    is_reply=request.json["reply"]
    vals=(tweetText,timestamp,userId,link,is_reply,)

    cursor.execute(query,vals)
    cnx.commit()
    return '200'

@app.route('/todo/api/v1.0/login/<username>', methods =['GET'])
def get_user_id(username):
    query = "SELECT users.user_id FROM users WHERE users.username=%s"
    val=(username,)
    cursor.execute(query,val)

    return jsonify(cursor.fetchone())

@app.route('/todo/api/v1.0/register', methods=['PUT'])
def put_user():
    userInfo=request.json
    username=userInfo['username']
    email=userInfo['email']
    userId = userInfo['user_id']
    firstName=userInfo['first_name']
    lastName=userInfo['last_name']
    numFollowers=0
    numFollowing=0
    profilePic=userInfo['profile_pic']
    verified=0
    bio=userInfo['bio']

    query = "INSERT INTO users (username, email, first_name, last_name, num_followers, num_following, profile_pic, verified, bio, user_id) VALUES (%s, %s, %s, %s , %s, %s, %s, %s, %s,%s)"

    vals=(username, email, firstName, lastName, numFollowers, numFollowing, profilePic, verified, bio, userId,)

    cursor.execute(query, vals)
    cnx.commit()
    return '200'

@app.route('/todo/api/v1.0/timeline/<userId>', methods=['GET'])
def get_timeline(userId):
    query = "SELECT * FROM microblogs WHERE microblogs.user_id IN (SELECT following_id FROM follower_following WHERE follower_id=%s) ORDER BY microblogs.timestamp"
    val=(userId,)
    cursor.execute(query,val)

    return jsonify(cursor.fetchall())



@app.route('/todo/api/v1.0/profile/follow', methods=['PUT'])
def follow_user():
    data=request.json
    follower_id = data['userId']
    following_id = data['following']

    query = "INSERT INTO follower_following (follower_id, following_id) VALUES(%s, %s)"
    vals = (follower_id, following_id,)

    cursor.execute(query,vals)

    query = "UPDATE users SET num_followers=num_followers+1 WHERE user_id=%s"
    vals=(following_id,)

    cursor.execute(query,vals)
    
    query = "UPDATE users SET num_following=num_following+1 WHERE user_id=%s"
    vals=(follower_id,)

    cursor.execute(query,vals)

    cnx.commit()
    return '200'


@app.route('/todo/api/v1.0/profile/<userId>/followers', methods=['GET'])
def get_followers(user_id):
    query = "SELECT follower_id FROM follower_following WHERE following_id=%s"
    val=(user_id,)
    cursor.execute(query,val)

    result=cursor.fetchall()
    return jsonify(result)

@app.route('/todo/api/v1.0/profile/<userId>/following', methods=['GET'])
def get_following(user_id):
    query = "SELECT following_id FROM follower_following WHERE follower_id=%s"
    val=(user_id,)
    cursor.execute(query,val)

    result=cursor.fetchall()
    return jsonify(result)











if __name__ == "__main__":
    app.run(debug=True)