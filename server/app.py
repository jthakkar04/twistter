from flask import Flask, json, request, render_template, redirect, jsonify, make_response
from flask_cors import CORS
import mysql.connector

cnx=mysql.connector.connect(
    host = "localhost",
    user="root",
    passwd="Ye5tuutr!",
    auth_plugin='mysql_native_password',
    database='twistter'
)
cursor=cnx.cursor(dictionary=True)


app = Flask(__name__)
CORS(app)

#route for getting specific tweet
@app.route('/todo/api/v1.0/feed/<int:userId>/<int:tweetId>', methods=['GET'])
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


@app.route('/todo/api/v1.0/profile/<int:userId>', methods=['GET'])
def get_userProfile(userId):
    query="SELECT * FROM users WHERE users.user_id=%s"
    val=(userId,)
    cursor.execute(query,val)
    return jsonify(cursor.fetchone())

@app.route('/todo/api/v1.0/feed/<int:userId>',methods = ['PUT'])
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

def getSessionUser()



if __name__ == "__main__":
    app.run(debug=True)