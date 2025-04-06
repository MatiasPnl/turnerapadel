from sqlalchemy.orm import Session
from models import Turno
from schemas import TurnoCreate

def get_turnos(db: Session):
    return db.query(Turno).all()

def reservar_turno(db: Session, turno_data: TurnoCreate):
    # Buscar un turno libre con la misma fecha, hora y cancha
    turno = db.query(Turno).filter(
        Turno.fecha == turno_data.fecha,
        Turno.hora_inicio == turno_data.hora_inicio,
        Turno.cancha == turno_data.cancha
    ).first()

    if turno and not turno.reservado:
        turno.nombre = turno_data.nombre
        turno.apellido = turno_data.apellido
        turno.contacto = turno_data.contacto
        turno.reservado = True
        db.commit()
        db.refresh(turno)
        return turno

    return None

def cancelar_turno(db: Session, turno_id: int):
    turno = db.query(Turno).filter(Turno.id == turno_id).first()
    if turno and turno.reservado:
        turno.reservado = False
        turno.nombre = ""
        turno.apellido = ""
        turno.contacto = ""
        db.commit()
        db.refresh(turno)
        return turno
    return None
