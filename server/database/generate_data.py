import mysql.connector
import names
from faker import Faker
import random
import datetime


cnx=mysql.connector.connect(
    host = "twistter.cnt8cdemn92m.us-east-2.rds.amazonaws.com",
    user="admin",
    passwd="gotrainsgo",
    auth_plugin='mysql_native_password',
    database='twistter'
)
cursor=cnx.cursor(dictionary=True)

def create_users():
    fake=Faker()
    for i in range(0,100):
        firstName=names.get_first_name()
        lastName=names.get_last_name()
        username=firstName+lastName
        email = username + "@gmail.com"
        bio=fake.sentence()

        query = "INSERT INTO users (username, email, first_name, last_name, num_followers, num_following, profile_pic, verified, bio) VALUES (%s, %s, %s, %s , %s, %s, %s, %s, %s)"
        vals=(username, email, firstName, lastName, 0, 0, "NONE", 0, bio,)

        cursor.execute(query, vals)
    cnx.commit()

def create_microblogs():
    fake=Faker()
    for i in range(0,5000):
        userId=random.randint(1,102)
        text=fake.text()
        timestamp=datetime.datetime.now().time()
        link="NONE"
        is_reply=0

        query="INSERT INTO microblogs (user_id, text, timestamp, link, is_reply) VALUES (%s, %s, %s, %s , %s)"
        vals=(userId, text, timestamp, link, is_reply,)
        cursor.execute(query,vals)

    cnx.commit()

def create_follow_relations():
    for i in range(1,104):
        #create 50 following relations from each user
        id_list = random.sample(range(1,104),50)
        for following_id in id_list:
            if following_id != i:
                query="INSERT INTO follower_following (follower_id, following_id) VALUES (%s,%s)"
                vals=(i, following_id,)
                cursor.execute(query,vals)
    cnx.commit()






if __name__ == "__main__":
    create_follow_relations()



