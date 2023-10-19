from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel
from utils import get_random_id, validate_date
class RoleListing(BaseModel):
    role_id: int
    role_listing_desc: str
    role_listing_open: str 
    role_listing_close: str
class RoleListing_Update(BaseModel):
    role_listing_updater: int
    role_listing_id: int
    role_id: int
    role_listing_desc: str
    role_listing_open: str 
    role_listing_close: str
class RoleListing_Create(BaseModel):
    role_listing_creator:int
    role_listing_source:int
    role_listing_updater:int
    role_id: int
    role_listing_desc: str
    role_listing_open: str 
    role_listing_close: str
      

router = APIRouter()


@router.get(
    "/api/v1/rolelistings/", status_code=status.HTTP_200_OK, tags=["Role Listing"]
)
async def get_role_listings(db: Session = Depends(get_db)):
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

    return {"Results": roleListing}


@router.post(
    "/api/v1/rolelistings/", status_code=status.HTTP_201_CREATED, tags=["Role Listing"]
)
async def create_role_listing(request: RoleListing_Create, db: Session = Depends(get_db)):
    """
    The function `create_role_listing` creates a new role listing object and saves it to the database,
    while performing data validation on the input.

    :param request: The `request` parameter is an instance of the `Request` class, which represents an
    HTTP request received by the server. It contains information about the request, such as the HTTP
    method, headers, and body
    :type request: Request
    :param db: The `db` parameter is a dependency injection for the database connection. It allows the
    function to interact with the database by executing queries and committing changes
    :type db: db_dependancy
    :return: a dictionary object containing the details of the newly created role listing.
    """

    # Get the role listing data from the request body.
    role_listing_data = request.dict()
    print(role_listing_data)

    # Data Validation
    err_msg = []
    role_listing_id = get_random_id()
    while (
        db.query(models.RoleListing)
        .filter(models.RoleListing.role_listing_id == role_listing_id)
        .first()
        is not None
    ):
        role_listing_id = get_random_id()
    if (
        db.query(models.RoleDetail)
        .filter(models.RoleDetail.role_id == role_listing_data["role_id"])
        .first()
        is None
    ):
        err_msg.append("Enter correct Role Id")
    if not isinstance(role_listing_data["role_listing_desc"], str):
        err_msg.append("Enter correct type of description")
    if not validate_date(
        role_listing_data["role_listing_open"], role_listing_data["role_listing_close"]
    ):
        err_msg.append(
            "Enter correct type of date format or Close Date cannot be before Open Date"
        )
    if len(err_msg) > 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=err_msg[0])
    else:
        # Create a new role listing object.
        role_listing = models.RoleListing(
            role_listing_id=role_listing_id,
            role_listing_creator=role_listing_data["role_listing_creator"],
            role_listing_source=role_listing_data["role_listing_source"],
            role_listing_updater=role_listing_data["role_listing_updater"],
            role_id=role_listing_data["role_id"],
            role_listing_desc=role_listing_data["role_listing_desc"],
            role_listing_open=role_listing_data["role_listing_open"],
            role_listing_close=role_listing_data["role_listing_close"],
        )

        # Save the new role listing to the database.
        db.add(role_listing)
        db.commit()
        role_listing = {
            "role_listing_id": role_listing_id,
        }
        role_listing.update(role_listing_data)
        db.close()

        # Return the newly created role listing.
        return role_listing


@router.put(
    "/api/v1/rolelistings/", status_code=status.HTTP_200_OK, tags=["Role Listing"]
)
async def update_role_listing(request: RoleListing_Update, db: Session = Depends(get_db)):
    """
    The function `update_role_listing` updates an existing role listing object in the database based on
    the data provided in the request body.

    :param request: The `request` parameter is an instance of the `Request` class, which represents an
    HTTP request made to the server. It contains information about the request, such as the HTTP method,
    headers, and body
    :type request: Request
    :param db: The `db` parameter is a dependency injection for the database connection. It allows the
    function to interact with the database and perform CRUD operations
    :type db: db_dependancy
    :return: The updated role listing object is being returned.
    """

    # Get the role listing data from the request body.
    role_listing_data = request.dict()
    print(role_listing_data)

    # Data Validation
    err_msg = []
    if (
        db.query(models.RoleListing)
        .filter(
            models.RoleListing.role_listing_id == role_listing_data["role_listing_id"]
        )
        .first()
        is None
    ):
        err_msg.append("Enter Role Listing Id")

    if (
        db.query(models.RoleDetail)
        .filter(models.RoleDetail.role_id == role_listing_data["role_id"])
        .first()
        is None
    ):
        err_msg.append("Enter correct Role Id")

    if not isinstance(role_listing_data["role_listing_desc"], str):
        err_msg.append("Enter correct type of description")

    if not validate_date(
        role_listing_data["role_listing_open"], role_listing_data["role_listing_close"]
    ):
        err_msg.append(
            "Enter correct type of date format or Close Date cannot be before Open Date"
        )
    if len(err_msg) > 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=err_msg[0])
    else:
        # Create Dictionary for the updated role listing.
        role_listing = {
            "role_listing_updater": role_listing_data["role_listing_updater"],
            "role_id" : role_listing_data["role_id"],
            "role_listing_desc" : role_listing_data["role_listing_desc"],
            "role_listing_open" : role_listing_data["role_listing_open"],
            "role_listing_close" : role_listing_data["role_listing_close"]
        }
        # Save the updated role listing to the database.
        db.query(models.RoleListing).filter(models.RoleListing.role_listing_id == role_listing_data["role_listing_id"]).update(role_listing)
        db.commit()
        db.close()

        # Return the newly updated role listing.
        return db.query(models.RoleListing).filter(models.RoleListing.role_listing_id == role_listing_data["role_listing_id"]).first()
