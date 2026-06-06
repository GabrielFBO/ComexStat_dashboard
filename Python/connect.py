import os
import pymssql

from dotenv import load_dotenv

load_dotenv("env/.env")

def get_connection():
    return pymssql.connect(
        server=os.getenv("DB_SERVER"),
        port=int(os.getenv("DB_PORT")),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )