from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel

router = APIRouter()


class RoleApplication(BaseModel):
    role_listing_id: int
    staff_id: int
    role_app_reason: str


@router.get(
    "/api/v1/applications/", status_code=status.HTTP_200_OK, tags=["Role Applications"]
)
async def get_role_applications(db: Session = Depends(get_db)):
    """
    The function `get_role_applications` retrieves all role applications from the database and returns
    them, or raises an exception if no role applications are found.

    :param db: The parameter `db` is of type `Session` and is used to interact with the database. It is
    obtained by calling the `get_db` function, which is a dependency that provides a database session
    :type db: Session
    :return: a list of role applications.
    """
    roleApplications = db.query(models.RoleApplication).all()
    if not roleApplications:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role applications not found",
        )

    db.close()

    return {"Results": roleApplications}


@router.get(
    "/api/v1/applications/{staff_id}",
    status_code=status.HTTP_200_OK,
    tags=["Role Applications"],
)
async def get_role_applications_by_staff_id(
    staff_id: int, db: Session = Depends(get_db)
):
    """
    The function `get_role_applications_by_staff_id` retrieves role applications for a staff member by
    their staff ID.

    :param staff_id: The staff_id parameter is an integer that represents the ID of a staff member
    :type staff_id: int
    :param db: The `db` parameter is an instance of the `Session` class, which is used to interact with
    the database. It is obtained using the `get_db` dependency, which is responsible for creating a new
    database session and managing the session's lifecycle. The `Session` class provides methods for
    querying
    :type db: Session
    :return: a list of role applications that belong to a staff member with the specified staff ID.
    """

    roleApplications = (
        db.query(models.RoleApplication)
        .filter(models.RoleApplication.staff_id == staff_id)
        .all()
    )

    staff = (
        db.query(models.StaffDetail)
        .filter(models.StaffDetail.staff_id == staff_id)
        .first()
    )
    if not staff:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"There is no staff with the ID of {staff_id}",
        )

    if not roleApplications:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role applications not found",
        )

    # based on the jobID in the role application, get the roleid from role listing and then get the role title from role details
    for roleApplication in roleApplications:
        roleListing = (
            db.query(models.RoleListing)
            .filter(
                models.RoleListing.role_listing_id == roleApplication.role_listing_id
            )
            .first()
        )
        roleApplication.role_title = (
            db.query(models.RoleDetail)
            .filter(models.RoleDetail.role_id == roleListing.role_id)
            .first()
            .role_name
        )

    db.close()

    return {"Results": roleApplications}


@router.post(
    "/api/v1/applications/",
    status_code=status.HTTP_201_CREATED,
    tags=["Role Applications"],
)
async def create_role_application(
    request: RoleApplication, db: Session = Depends(get_db)
):
    """
    The above function creates a new role application if it does not already exist and returns the
    created role application.
    
    :param request: The `request` parameter is of type `RoleApplication`, which is a Pydantic model
    representing the data of the role application being created
    :type request: RoleApplication
    :param db: The `db` parameter is of type `Session` and is used to interact with the database. It is
    obtained using the `get_db` dependency function, which is responsible for creating a new database
    session and closing it after the request is processed
    :type db: Session
    :return: the created role application as a response.
    """

    roleApplicationData = request.dict()

    # if the role application already exists, raise an exception
    roleApplication = (
        db.query(models.RoleApplication)
        .filter(models.RoleApplication.staff_id == roleApplicationData["staff_id"])
        .filter(
            models.RoleApplication.role_listing_id
            == roleApplicationData["role_listing_id"]
        )
        .first()
    )

    if roleApplication or len(roleApplicationData) > 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Role application already exists",
        )

    # create a new role application
    roleApplication = models.RoleApplication(
        role_listing_id=roleApplicationData["role_listing_id"],
        staff_id=roleApplicationData["staff_id"],
        role_app_status="applied",
        role_app_reason=roleApplicationData["role_app_reason"],
    )

    db.add(roleApplication)
    db.commit()
    db.close()

    # find the role application
    roleApplication = (
        db.query(models.RoleApplication)
        .filter(models.RoleApplication.staff_id == roleApplicationData["staff_id"])
        .filter(
            models.RoleApplication.role_listing_id
            == roleApplicationData["role_listing_id"]
        )
        .first()
    )

    return roleApplication
