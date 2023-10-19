from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel

router = APIRouter()

@router.get(
    "/api/v1/staffdetails/{staff_id}",
    status_code=status.HTTP_200_OK,
)
async def get_staff_details_by_staff_id(
    staff_id: int, db: Session = Depends(get_db)
):
    staffDetails = (
        db.query(models.StaffDetail)
        .filter(models.StaffDetail.staff_id == staff_id)
        .all()
    )
    if not staffDetails:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role details not found",
        )
    
    db.close()

    return {"Results": staffDetails}