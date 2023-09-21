# main.py

from fastapi import FastAPI, HTTPException, Depends, status, Request
from pydantic import BaseModel
from typing import Annotated
from database import initDB
from sqlalchemy.orm import Session
from flask import request
import models
import math
import random
import datetime

app = FastAPI()

engine, SessionLocal = initDB()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependancy = Annotated[Session, Depends(get_db)]


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/v1/rolelistings/", status_code=status.HTTP_200_OK)
async def get_role_listings(db: db_dependancy):
    """
    The function `get_role_listings` retrieves role listings from a database, along with associated
    skills and creator/updater information.

    :param db: The parameter `db` is a dependency that represents a database connection or session. It
    is used to query the database and retrieve the required data
    :type db: db_dependancy
    :return: The function `get_role_listings` returns a list of role listings. Each role listing
    contains information such as the role ID, skills required for the role, creator details (first name
    and email), and updater details (first name and email).
    """

    roleListing = db.query(models.RoleListing).all()
    if not roleListing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role listing not found",
        )
    # get the skills that are required for each role and based on the skills required for each role, get the skill name from skillDetails
    for role in roleListing:
        role_skills = (
            db.query(models.RoleSkill)
            .filter(models.RoleSkill.role_id == role.role_id)
            .all()
        )
        role_skill_list = []
        for role_skill in role_skills:
            # get the skill name from skillDetails
            skill = (
                db.query(models.SkillDetail)
                .filter(models.SkillDetail.skill_id == role_skill.skill_id)
                .first()
            )
            role_skill_list.append(skill.skill_name)

        # get the creator fname, email from staffDetails
        creator = (
            db.query(models.StaffDetail)
            .filter(models.StaffDetail.staff_id == role.role_listing_creator)
            .first()
        )

        # get updater fname, email from staffDetails
        updater = (
            db.query(models.StaffDetail)
            .filter(models.StaffDetail.staff_id == role.role_listing_updater)
            .first()
        )

        # get role name from roleDetails
        role_name = (
            db.query(models.RoleDetail)
            .filter(models.RoleDetail.role_id == role.role_id)
            .first()
        )

        role.role_name = role_name.role_name
        role.role_listing_updater = [updater.f_name, updater.email]
        role.role_listing_creator = [creator.f_name, creator.email]
        role.role_skills = role_skill_list

    return roleListing

# endpoint for retrieving all role details
@app.get("/api/v1/roledetails/", status_code=status.HTTP_200_OK)
async def get_role_details(db: db_dependancy):

    roleDetails = db.query(models.RoleDetail).all()
    if not roleDetails:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role details not found",
        )
    
    for role in roleDetails:
        role.role_id = role.role_id
        role.role_name = role.role_name
        role.role_description = role.role_description
        role.role_status = role.role_status

    return roleDetails

def get_random_id():
    digits = [i for i in range(0, 10)]
    random_str = ""
    for i in range(6):
        index = math.floor(random.random() * 10)
        random_str += str(digits[index])
    return int(random_str)
def validate_date(date_string_1, date_string_2):
    date_1 = datetime.datetime.strptime(date_string_1, "%Y-%m-%d")
    date_2 = datetime.datetime.strptime(date_string_2, "%Y-%m-%d")

    if date_2 >= date_1:
        return True
    else:
        return False

# endpoint for inserting role listings
@app.post("/api/v1/rolelistings/create", status_code=status.HTTP_200_OK)
async def create_role_listing(request: Request, db: db_dependancy):

    # Get the role listing data from the request body.
    role_listing_data = await request.json()
    
    # Data Validation
    err_msg = []
    role_listing_id = get_random_id()
    while db.query(models.RoleListing).filter(models.RoleListing.role_listing_id == role_listing_id).first() is not None:
        role_listing_id = get_random_id()
    if db.query(models.RoleDetail).filter(models.RoleDetail.role_id == role_listing_data["role_id"]).first() is None:
        err_msg.append("Enter correct Role Id")
    if not isinstance(role_listing_data["role_listing_desc"], str):
        err_msg.append("Enter correct type of description")
    if not validate_date(role_listing_data["role_listing_open"], role_listing_data["role_listing_close"]):
        err_msg.append("Enter correct type of date format or Close Date cannot be before Open Date")
    if len(err_msg) > 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=err_msg[0]
        )
    else:
        # Create a new role listing object.
        role_listing = models.RoleListing(
            role_listing_id = role_listing_id,
            role_listing_creator = 123456788,
            role_listing_source = 123456788,
            role_listing_updater = 123456788,
            role_id = role_listing_data["role_id"],
            role_listing_desc = role_listing_data["role_listing_desc"],
            role_listing_open = role_listing_data["role_listing_open"],
            role_listing_close = role_listing_data["role_listing_close"]
        )

        # Save the new role listing to the database.
        db.add(role_listing)
        db.commit()
        role_listing = {'role_listing_id': role_listing_id, 'role_listing_creator': 123456788, "role_listing_source": 123456788, "role_listing_updater": 123456788}
        role_listing.update(role_listing_data)

        # Return the newly created role listing.
        return role_listing

# endpoint for updating role listings
@app.put("/api/v1/rolelistings/update", status_code=status.HTTP_200_OK)
async def update_role_listing(request: Request, db: db_dependancy):

    # Get the role listing data from the request body.
    role_listing_data = await request.json()
    
    # Data Validation
    err_msg = []
    role_listing_id = get_random_id()
    while db.query(models.RoleListing).filter(models.RoleListing.role_listing_id == role_listing_id).first() is not None:
        role_listing_id = get_random_id()
    if db.query(models.RoleDetail).filter(models.RoleDetail.role_id == role_listing_data["role_id"]).first() is None:
        err_msg.append("Enter correct Role Id")
    if not isinstance(role_listing_data["role_listing_desc"], str):
        err_msg.append("Enter correct type of description")
    if not validate_date(role_listing_data["role_listing_open"], role_listing_data["role_listing_close"]):
        err_msg.append("Enter correct type of date format or Close Date cannot be before Open Date")
    if len(err_msg) > 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=err_msg[0]
        )
    else:
        # Update an existing role listing object.
        role_listing = models.RoleListing(
            role_listing_id = role_listing_id,
            role_listing_creator = 123456788,
            role_listing_source = 123456788,
            role_listing_updater = 123456788,
            role_id = role_listing_data["role_id"],
            role_listing_desc = role_listing_data["role_listing_desc"],
            role_listing_open = role_listing_data["role_listing_open"],
            role_listing_close = role_listing_data["role_listing_close"]
        )

        # Save the updated role listing to the database.
        db.add(role_listing)
        # Remove existing record in RoleListing Table with same Role_id
        prev_role_listing = db.query(models.RoleListing).filter(models.RoleListing.role_id == role_listing_data["role_id"]).first()
        db.delete(prev_role_listing)
        db.commit()
        role_listing = {'role_listing_id': role_listing_id, 'role_listing_creator': 123456788, "role_listing_source": 123456788, "role_listing_updater": 123456788}
        role_listing.update(role_listing_data)

        # Return the newly created role listing.
        return role_listing