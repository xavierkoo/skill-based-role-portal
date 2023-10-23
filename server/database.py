from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pymysql
import models
import time
from seed import seed_db


db_config = {
    "host": "eduhub_db",
    "user": "eduhub_user",
    "password": "eduhub_password",
    "port": 3306,
    "database": "eduhub_db_mysql",
}


def create_database_if_not_exists(db_persist=False, max_retries=3, retry_delay=5):
    """
    The function creates a database if it does not already exist, with options for persistence and
    retrying in case of connection errors.

    :param db_persist: The `db_persist` parameter determines whether the database should be persisted or
    not. If `db_persist` is set to `True`, the function will create the database if it doesn't exist and
    use it. If `db_persist` is set to `False`, the function will drop, defaults to False (optional)
    :param max_retries: The `max_retries` parameter specifies the maximum number of times the code will
    attempt to create or use the database before giving up, defaults to 3 (optional)
    :param retry_delay: The `retry_delay` parameter specifies the number of seconds to wait before
    retrying the database connection after encountering an error, defaults to 5 (optional)
    :return: nothing.
    """

    connection = None

    for _ in range(max_retries):
        try:
            connection = pymysql.connect(
                host=db_config["host"],
                user=db_config["user"],
                password=db_config["password"],
                charset="utf8mb4",
                cursorclass=pymysql.cursors.DictCursor,
            )

            with connection.cursor() as cursor:
                if db_persist:
                    cursor.execute(
                        f"CREATE DATABASE IF NOT EXISTS {db_config['database']}"
                    )
                    cursor.execute(f"USE {db_config['database']}")
                    return

                else:
                    cursor.execute(f"DROP DATABASE IF EXISTS {db_config['database']}")
                    cursor.execute(
                        f"CREATE DATABASE IF NOT EXISTS {db_config['database']}"
                    )
                    cursor.execute(f"USE {db_config['database']}")

        except pymysql.MySQLError as e:
            print(f"Error creating or using database: {e}")
            time.sleep(retry_delay)
        finally:
            if connection is not None:
                connection.close()
            print("Max connection retries reached. Exiting...")


def init_db(db_persist=False):
    """
    The function `init_db` initializes a database by creating a new database if it doesn't exist,
    setting up the engine and session, and optionally returning the engine and session objects.

    :param db_persist: The `db_persist` parameter is a boolean flag that determines whether the database
    connection should be persistent or not. If `db_persist` is set to `True`, the function will return
    the engine and session objects without creating or seeding the database. If `db_persist` is set to,
    defaults to False (optional)
    :return: The function `init_db` returns either the `engine` and `SessionLocal` objects if
    `db_persist` is `True`, or it returns the `engine`, `SessionLocal`, and `session` objects if
    `db_persist` is `False`.
    """
    # Connects to the database and drop/create new database
    create_database_if_not_exists(db_persist)

    # Sets up the engine and session
    URL_DB = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
    engine = create_engine(URL_DB)

    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    if db_persist:
        return engine, SessionLocal
    else:
        models.Base.metadata.create_all(bind=engine)
        session = SessionLocal()
        seed_db(session)

    return engine, SessionLocal


def get_session():
    """
    The function `get_session` creates a database connection engine and yields a session object for
    interacting with the database.
    """

    # Connects to the database and create engine
    URL_DB = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"

    engine = create_engine(URL_DB, echo=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()

    return session


def get_db():
    """
    The function `get_db()` returns a database session and ensures that it is closed properly after use.
    """

    db = get_session()
    return db
