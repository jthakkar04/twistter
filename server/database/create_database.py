import mysql.connector

mydb = mysql.connector.connect(
    host = "twistter.cnt8cdemn92m.us-east-2.rds.amazonaws.com",
    user="admin",
    passwd="gotrainsgo",
    auth_plugin='mysql_native_password'
)

cursor = mydb.cursor()

cursor.execute("CREATE DATABASE twistter")

cursor.close()
mydb.close()