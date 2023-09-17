"""
Main Application File
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector


app = Flask(__name__)
CORS(app)


def get_db_connection():
    """
    The function `get_db_connection` returns a connection object to a MySQL database.
    :return: a connection object to a MySQL database.
    """
    return mysql.connector.connect(
        user="eduhub_user",
        host="eduhub_db_mysql",
        port="3306",
        password="eduhub_password",
        database="eduhub_db_mysql",
    )


# Create rolelisting variable to be added infront of the app.route
ROLELISTING = "/rolelistings"

# Create version variable to be added infront of the app.route
V1 = "/v1"


@app.route("/")
def hello():
    """
    Route Docstring
    """
    return "Hello World!!"


# Role Listings
@app.route(f"{V1}{ROLELISTING}/create", methods=["POST"])
def create_role():
    """
    The function `create_role()` creates a new role listing record in a database based on the input data
    provided in JSON format.
    :return: a JSON response. If the request is in JSON format and the data passes validation, it
    returns a JSON response with code 201 and message "Created Role". If there is an exception or the
    request is not in JSON format, it returns a JSON response with code 400 and an appropriate error
    message.
    """
    if request.is_json:
        print("\nReceived data in JSON format")
        try:
            data = request.get_json()
            role_listing_id = data["role_listing_id"]
            role_listing_creator = data["role_listing_creator"]
            role_listing_source = data["role_listing_source"]
            role_listing_updater = data["role_listing_updater"]
            role_id = data["role_id"]
            role_listing_desc = data["role_listing_desc"]
            role_listing_open = data["role_listing_open"]
            role_listing_close = data["role_listing_close"]

            ## Validate Data
            err_msg = []
            if not isinstance(role_listing_id, int):
                err_msg.append("Input Correct ID")
            if not isinstance(role_listing_creator, int):
                err_msg.append("Input Correct Creator")
            if (
                not isinstance(role_listing_source, str)
                and len(role_listing_source) < 50
            ):
                err_msg.append("Input Correct Source")
            if not isinstance(role_listing_updater, int):
                err_msg.append("Input Correct Updater")
            if not isinstance(role_id, int):
                err_msg.append("Input Correct ID")
            if not isinstance(role_listing_desc, str):
                err_msg.append("Input Correct description")
            if not isinstance(role_listing_open, str):
                err_msg.append("Input Correct Date")
            if not isinstance(role_listing_close, str):
                err_msg.append("Input Correct Date")
            if err_msg:
                return print(err_msg[0])
            else:
                print("\n Clear Validation")
                ##Create Record for Role Listing
                conn = get_db_connection()

                try:
                    cur = conn.cursor()
                    cur.execute(
                        "INSERT INTO role_listings(role_listing_id, role_listing_creator,role_listing_source,role_listing_updater, role_id, role_listing_desc, role_listing_open, role_listing_close)"
                        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                        (
                            role_listing_id,
                            role_listing_creator,
                            role_listing_source,
                            role_listing_updater,
                            role_id,
                            role_listing_desc,
                            role_listing_open,
                            role_listing_close,
                        ),
                    )
                    conn.commit()
                    # Return json code 201 for created
                    return jsonify({"code": 201, "message": "Created Role"})
                except Exception as err:  # pylint: disable=broad-except
                    # Return json code 400 for bad request
                    return jsonify(
                        {"code": 400, "message": "Bad Request", "error": err}
                    )
                finally:
                    conn.close()
        except Exception as err:  # pylint: disable=broad-except
            # Return json code 400 for bad request
            return jsonify({"code": 400, "message": err_msg, "error": err})

    else:
        return jsonify({"code": 400, "message": "Request not in JSON format"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5101, debug=True)
