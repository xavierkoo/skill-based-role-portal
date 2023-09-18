# main.py

from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
from database import initDB
from sqlalchemy.orm import Session
import models

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

        role.role_listing_updater = [updater.f_name, updater.email]
        role.role_listing_creator = [creator.f_name, creator.email]
        role.role_skills = role_skill_list

    return roleListing
