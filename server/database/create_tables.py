import mysql.connector

print("HITTING")
mydb = mysql.connector.connect(
    host = "twistter.cnt8cdemn92m.us-east-2.rds.amazonaws.com",
    user="admin",
    passwd="gotrainsgo",
    auth_plugin='mysql_native_password',
    database="twistter"
)

mycursor = mydb.cursor()

#mycursor.execute("CREATE TABLE users (user_id VARCHAR(25) PRIMARY KEY, username VARCHAR(25), email VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), num_followers INT, num_following INT, profile_pic VARCHAR(255), verified BOOL, bio VARCHAR(255))")
#mycursor.execute("CREATE TABLE follower_following (follower_id VARCHAR(25), FOREIGN KEY (follower_id) REFERENCES users(user_id), following_id VARCHAR(25), FOREIGN KEY (following_id) REFERENCES users(user_id))")
#mycursor.execute("CREATE TABLE topics (topic_id INT AUTO_INCREMENT PRIMARY KEY, topic_name VARCHAR (15))")
mycursor.execute("CREATE TABLE microblogs (twist_id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(240), timestamp VARCHAR (255), user_id VARCHAR (25), FOREIGN KEY (user_id) REFERENCES users(user_id), link VARCHAR(255), is_reply BOOL)")

#mycursor.execute("INSERT INTO microblogs (text, timestamp, user_id) VALUES ('i hate CS', '00:00:00', '4')")

mydb.commit()
mycursor.close()
mydb.close()


