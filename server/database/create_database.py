import mysql.connector

mydb = mysql.connector.connect(
    host = "localhost",
    user="root",
    passwd="NikitaRocks",
    auth_plugin='mysql_native_password'
)

cursor = mydb.cursor()

cursor.execute("CREATE DATABASE twistter")

cursor.close()
mydb.close()