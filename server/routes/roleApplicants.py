from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel
from utils import get_random_id, validate_date
import asyncio
import copy
router = APIRouter()


class RoleApplication(BaseModel):
    role_listing_id: int
    staff_id: int
    role_app_reason: str 

class RoleListing(BaseModel):
    role_id: int
    role_listing_desc: str
    role_listing_open: str 
    role_listing_close: str 
    role_listing_id: int

@router.get(
    "/api/v1/roleapplicantslisting/{role_listing_source}", status_code=status.HTTP_200_OK, tags=["Role Applicants Listing"]
)
async def get_role_applicants_by_source(role_listing_source: int, db: Session = Depends(get_db)):
    sysRole = db.query(models.StaffDetail).filter(models.StaffDetail.staff_id == role_listing_source).first()
    if not sysRole:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role listing not found",
        )
    if (sysRole.sys_role == "manager"):
        RoleListing = db.query(models.RoleListing).filter(models.RoleListing.role_listing_source == role_listing_source).all()
    elif (sysRole.sys_role == "hr"):
        RoleListing = db.query(models.RoleListing).all()

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Unauthorized access",
        )
    if not RoleListing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role listing not found",
        )
    for role in RoleListing:
        role.role_name = db.query(models.RoleDetail).filter(models.RoleDetail.role_id == role.role_id).first().role_name

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
        RoleApplicant = db.query(models.RoleApplication).filter(models.RoleApplication.role_listing_id == role.role_listing_id).all()
        role_applicant_list = []
        noOfApplicant = 0
        staff = []
        for applicant in RoleApplicant:
            # get the skill name from skillDetails
            staff = (
                db.query(models.StaffDetail)
                .filter(models.StaffDetail.staff_id == applicant.staff_id)
                .first()
            )
            applicant_skill_list = []
            staff_skills = db.query(models.StaffSkill).filter(models.StaffSkill.staff_id == staff.staff_id).all()
            if not staff_skills:
                staff_skills = []
            else:
                for skill in staff_skills:
                    print(skill.ss_status)
                    skill.skill_name = (db.query(models.SkillDetail).filter(models.SkillDetail.skill_id == skill.skill_id).first()).skill_name
                    applicant_skill_list.append(skill)
            staff.staff_skills = applicant_skill_list
            applicant.staff_details = staff
            role_applicant_list.append(applicant)
            noOfApplicant += 1
        role.role_skills = role_skill_list
        role.no_of_applicant = noOfApplicant
        role.role_applicants = role_applicant_list
    return {"Results": RoleListing}