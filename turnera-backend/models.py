from sqlalchemy import Column, Integer, String, Boolean, Date, Time
from database import Base

class Turno(Base):
    __tablename__ = "turnos"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date)
    hora_inicio = Column(Time)
    hora_fin = Column(Time)
    reservado = Column(Boolean, default=False)
    nombre = Column(String)
    apellido = Column(String)
    contacto = Column(String)
    cancha = Column(Integer, nullable=True)  # NUEVO
