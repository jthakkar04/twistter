import mysql.connector

mydb = mysql.connector.connect(
    host = "localhost",
    user="root",
    passwd="Ye5tuutr!",
    auth_plugin='mysql_native_password',
    database="twistter"
)

mycursor = mydb.cursor()

#mycursor.execute("CREATE TABLE users (user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20), email VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), num_followers INT, num_following INT, profile_pic VARCHAR(255), verified BOOL, bio VARCHAR(255))")
#mycursor.execute("INSERT INTO users (username) VALUES ('yung_yuri')")
#mycursor.execute("CREATE TABLE topics (topic_id INT AUTO_INCREMENT PRIMARY KEY, topic_name VARCHAR (15))")#
#mycursor.execute("CREATE TABLE microblogs (twist_id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(240), timestamp VARCHAR (255), user_id int, FOREIGN KEY (user_id) REFERENCES users(user_id), link VARCHAR(255), is_reply BOOL)")

mycursor.execute("INSERT INTO microblogs (text, timestamp, user_id) VALUES ('i hate CS', '00:00:00', '4')")

mydb.commit()


