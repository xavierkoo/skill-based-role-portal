from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter()


@router.get("/api/v1/staffskills/", status_code=status.HTTP_200_OK, tags=["Staff Skills"])
async def get_staff_skills(db: Session = Depends(get_db)):
    """
    The `get_staff_skills` function retrieves staff skills from a database

    :param db: The parameter `db` is a dependency injection for a database connection or session. It is
    used to query the database and retrieve role details
    :type db: db_dependancy
    :return: The `get_staff_skills` function returns a list of skills the staff has with relevant statuses.
    """
    staff_id = 123456789
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

    staff_skill_list = []
    for skill in staffSkills:
        skill_detail = (
                db.query(models.SkillDetail)
                .filter(models.SkillDetail.skill_id == skill.skill_id)
                .first()
            )
        staff_skill_list.append([skill_detail.skill_name, skill.ss_status])

    db.close()

    return staff_skill_list