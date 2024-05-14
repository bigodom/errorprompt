import psycopg2
from psycopg2 import OperationalError

def create_connection():
    try:
        connection = psycopg2.connect(
            database="errorbase",
            user="postgres",
            password="123",
            host="127.0.0.1",
            port="5432"
        )
        print("conn to PostgreSQL DB successful")
    except OperationalError as e:
        print(f"The error '{e}' ocurred")
    return connection