from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from models import Conference
from schemas import ConferenceCreate, ConferenceResponse, ConferenceUpdate
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def read_root():
    return {"message": "Welcome to the Conference API"}

@router.post("/conferences/", response_model= ConferenceCreate)
def create_conference(conference: ConferenceCreate, db: Session = Depends(get_db)):
    db_conference = Conference(**conference.model_dump())
    db.add(db_conference)
    db.commit()
    db.refresh(db_conference)
    return db_conference

@router.get("/conferences/{conference_id}", response_model=ConferenceResponse)
def read_conference(conference_id: int, db: Session = Depends(get_db)):
    conference = db.query(Conference).filter(Conference.id == conference_id).first()
    if conference is None:
        raise HTTPException(status_code=404, detail="Conference not found")
    return conference

@router.get("/conferences/", response_model=list[ConferenceResponse])
def read_all_conferences(db: Session = Depends(get_db)):
    conferences = db.query(Conference).all()
    if conferences is None:
        raise HTTPException(status_code=404, detail="Conferences not found")
    return conferences

@router.put("/conferences/{conference_id}", response_model= ConferenceUpdate)
def update_conference(conference_id: int, conference: ConferenceUpdate, db: Session = Depends(get_db)):
    db_conference = db.query(Conference).filter(Conference.id == conference_id).first()
    if db_conference is None:
        raise HTTPException(status_code=404, detail="Conference not found")
    for key, value in conference.model_dump().items():
        setattr(db_conference, key, value)
    db.commit()
    db.refresh(db_conference)
    return db_conference

@router.delete("/conferences/{conference_id}")
def delete_conference(conference_id: int, db: Session = Depends(get_db)):
    db_conference = db.query(Conference).filter(Conference.id == conference_id).first()
    if db_conference is None:
        raise HTTPException(status_code=404, detail="Conference not found")
    db.delete(db_conference)
    db.commit()
    return {"message": "Conference deleted successfully"}