from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import pymysql
import models
from seed import seed_db


db_config = {
    "host": "eduhub_db",
    "user": "eduhub_user",
    "password": "eduhub_password",
    "port": 3306,
    "database": "eduhub_db_mysql",
}


def create_database_if_not_exists():
    """
    The function creates a database if it does not already exist and sets it as the active database.
    """
    try:
        connection = pymysql.connect(
            host=db_config["host"],
            user=db_config["user"],
            password=db_config["password"],
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor,
        )

        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_config['database']}")
            cursor.execute(f"USE {db_config['database']}")

    except pymysql.MySQLError as e:
        print(f"Error creating or using database: {e}")
    finally:
        connection.close()


def initDB():
    """
    The function initializes a database connection and returns the engine, session, and base objects.
    :return: The function `initDB` returns three values: `engine`, `SessionLocal`, and `Base`.
    """
    create_database_if_not_exists()

    URL_DB = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
    engine = create_engine(URL_DB)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    models.Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    seed_db(session)

    return engine, SessionLocal
