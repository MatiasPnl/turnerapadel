from pydantic import BaseModel
from datetime import date, time

class TurnoBase(BaseModel):
    fecha: date
    hora_inicio: time

class TurnoCreate(TurnoBase):
    nombre: str
    apellido: str
    contacto: str
    cancha: int

class Turno(TurnoBase):
    id: int
    hora_fin: time
    reservado: bool
    nombre: str
    apellido: str
    contacto: str
    cancha: int | None

    class Config:
        orm_mode = True
