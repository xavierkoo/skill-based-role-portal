from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models


router = APIRouter()


@router.get("/api/v1/roledetails/", status_code=status.HTTP_200_OK, tags=["Role Detail"])
async def get_role_details(db: Session = Depends(get_db)):
    """
    The `get_role_details` function retrieves role details from a database, while the `get_random_id`
    function generates a random 6-digit ID, and the `validate_date` function checks if one date is
    greater than or equal to another date.

    :param db: The parameter `db` is a dependency injection for a database connection or session. It is
    used to query the database and retrieve role details
    :type db: db_dependancy
    :return: The `get_role_details` function returns a list of role details. The `get_random_id`
    function returns a randomly generated integer ID. The `validate_date` function returns a boolean
    value indicating whether the second date is greater than or equal to the first date.
    """

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
