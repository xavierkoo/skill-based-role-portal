from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel

router = APIRouter()


@router.get("/api/v1/staffskills/", status_code=status.HTTP_200_OK, tags=["Skills"])
async def get_staff_skills(db: Session = Depends(get_db)):
    """
    The `get_staff_skills` function retrieves staff skills from a database

    :param db: The parameter `db` is a dependency injection for a database connection or session. It is
    used to query the database and retrieve role details
    :type db: db_dependancy
    :return: The `get_staff_skills` function returns a list of skills the staff has with relevant statuses.
    """
    staff_id = 123456789
    staffSkills = db.query(models.StaffSkill).filter(models.StaffSkill.staff_id == staff_id).all()
    if not staffSkills:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role details not found",
        )
    for skill in staffSkills:
        skill_detail = (
                db.query(models.SkillDetail)
                .filter(models.SkillDetail.skill_id == skill.skill_id).
                first()
            )
        skill.skill_name = skill_detail.skill_name
        skill.ss_status = skill.ss_status
    db.close()

    return staffSkills

@router.get(
    "/api/v1/staffskills/{staff_id}",
    status_code=status.HTTP_200_OK,
    tags=["Skills"],
)
async def get_staff_skills_by_staff_id(
    staff_id: int, db: Session = Depends(get_db)
):
    """
    The function `get_staff_skills_by_staff_id` retrieves all skills of a staff member by
    their staff ID.

    :param staff_id: The staff_id parameter is an integer that represents the ID of a staff member
    :type staff_id: int
    :param db: The `db` parameter is an instance of the `Session` class, which is used to interact with
    the database. It is obtained using the `get_db` dependency, which is responsible for creating a new
    database session and managing the session's lifecycle. The `Session` class provides methods for
    querying
    :type db: Session
    :return: a list of skills that belong to a staff member with the specified staff ID.
    """

    staffSkills = (
        db.query(models.StaffSkill)
        .filter(models.StaffSkill.staff_id == staff_id)
        .all()
    )
    if not staffSkills:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role details not found",
        )

    for skill in staffSkills:
        skill_detail = (
                db.query(models.SkillDetail)
                .filter(models.SkillDetail.skill_id == skill.skill_id)
                .first()
            )
        skill.skill_name = skill_detail.skill_name
        skill.ss_status = skill.ss_status
    db.close()

    return {"Results": staffSkills}

@router.get("/api/v1/allskills/", status_code=status.HTTP_200_OK, tags=["Skills"])
async def get_all_skills(db: Session = Depends(get_db)):
    """
    The `get_all_skills` function retrieves all skills from the table SkillDetail

    :param db: The parameter `db` is a dependency injection for a database connection or session. It is
    used to query the database and retrieve role details
    :type db: db_dependancy
    :return: The `get_all_skills` function returns a list of all skills.
    """
    allSkills = (
        db.query(models.SkillDetail)
        .all()
    )
    if not allSkills:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role details not found",
        )

    db.close()

    return {"Results": allSkills}