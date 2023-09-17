"""
Main Application File
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import datetime, json


app = Flask(__name__)
CORS(app)


##Get Connection
def get_db_connection():
    return mysql.connector.connect(
        user="eduhub_user",
        host="eduhub_db_mysql",
        port="3306",
        password="eduhub_password",
        database="eduhub_db_mysql",
    )


# Create rolelisting variable to be added infront of the app.route
rolelisting = "/rolelistings"

# Create version variable to be added infront of the app.route
v1 = "/v1"


@app.route("/")
def hello():
    """
    Route Docstring
    """
    return "Hello World!!"


# Role Listings
@app.route(f"{v1}{rolelisting}/create", methods=["POST"])
def create_role():
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
            if err_msg != []:
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
                except Exception as e:
                    # Return json code 400 for bad request
                    return jsonify({"code": 400, "message": "Bad Request"})
                finally:
                    conn.close()
        except Exception as e:
            # Return json code 400 for bad request
            return jsonify({"code": 400, "message": err_msg})

    else:
        return jsonify({"code": 400, "message": "Request not in JSON format"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5101, debug=True)
