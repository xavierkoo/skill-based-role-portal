from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter()


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

    return roleApplications


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

    db.close()

    return roleApplications
