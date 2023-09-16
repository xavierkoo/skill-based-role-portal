from flask import Flask, jsonify, request, url_for, redirect
from flask_cors import CORS
import mysql.connector
import datetime, json


app = Flask(__name__)
CORS(app)

##Get Connection
def get_db_connection():
    return mysql.connector.connect(user='eduhub_user', host='eduhub_db_mysql', port='3306', password='eduhub_password', database='eduhub_db_mysql')
    


@app.route("/create", methods=['POST'])
def create_role():

    ##Input Validation
    err_msg = []
    if request.form['role_listing_id'].isnumeric:
        role_listing_id = request.form['role_listing_id']
    else:
        err_msg.append("Input Correct ID")        
    if request.form['role_listing_creator'].isnumeric:
        role_creator = request.form['role_listing_creator']
    else:
        err_msg.append("Input Correct Creator")
    if isinstance(request.form['role_listing_source'], str) and len(request.form['role_listing_source']) < 50:
        role_source = request.form['role_listing_source']
    else:
        err_msg.append("Input Correct Source")
    if request.form['role_listing_updater'].isnumeric:
        role_updater = request.form['role_listing_updater']
    else:
        err_msg.append("Input Correct Updater")
    if request.form['role_id'].isnumeric:
        role_id = request.form['role_id']
    else:
        err_msg.append("Input Correct ID")
    if isinstance(request.form['role_listing_desc'], str):
        role_desc = request.form['role_listing_desc']
    else:
        err_msg.append("Input Correct description")
    if datetime.date.fromisoformat(request.form['role_listing_open']):
        open = request.form['role_listing_open']
    else:
        err_msg.append("Input Correct Date")
    if datetime.date.fromisoformat(request.form['role_listing_close']):
        close = request.form['role_listing_open']
    else:
        err_msg.append("Input Correct Date")


    if err_msg != []:
        return print(err_msg[0])
    else:
        ##Create Record for Role Listing
        conn = get_db_connection()
        try:
            cur = conn.cursor()
            cur.execute('INSERT INTO role_listings(role_listing_id, role_listing_creator,role_listing_source,role_listing_updater, role_id, role_listing_desc, role_listing_open, role_listing_close)'
                        'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                        (role_listing_id, role_creator,role_source,role_updater,role_id, role_desc, open, close))
            conn.commit()
        except Exception as e:
            print("Error in SQL:\n", e)
        finally:
            conn.close()
        return "Created Role"

@app.route("/get", methods=['GET'])
def get_role():
     ##Get Record for Role Listing
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * from staff_details')
    data = cur.fetchall()
    cur.close()
    conn.close()
    # Check if the data list is empty
    if not data:
        return jsonify(["Empty records for staff"])
    json_data = [record.json() for record in data]
    return jsonify(json_data)
    
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5101, debug=True)
