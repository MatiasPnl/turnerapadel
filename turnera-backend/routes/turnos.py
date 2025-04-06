from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from fastapi import Header
import crud, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/turnos", response_model=list[schemas.Turno])
def read_turnos(db: Session = Depends(get_db)):
    return crud.get_turnos(db)

@router.post("/reservar", response_model=schemas.Turno)
def create_reserva(turno: schemas.TurnoCreate, db: Session = Depends(get_db)):
    reserva = crud.reservar_turno(db, turno)
    if not reserva:
        raise HTTPException(status_code=400, detail="Turno no disponible")
    return reserva

@router.delete("/cancelar/{turno_id}", response_model=schemas.Turno)
def cancelar(turno_id: int, db: Session = Depends(get_db), x_admin_key: str = Header(None)):
    if x_admin_key != "1234admin":  # Clave simple por ahora
        raise HTTPException(status_code=403, detail="No autorizado")
    turno = crud.cancelar_turno(db, turno_id)
    if not turno:
        raise HTTPException(status_code=404, detail="Turno no encontrado o ya libre")
    return turno