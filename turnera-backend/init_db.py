from database import SessionLocal, engine
from models import Base, Turno
from datetime import datetime, timedelta, time, date

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Parámetros de configuración
start_hour = 8
end_hour = 20
duration = timedelta(minutes=90)
today = date.today()

# Crear 4 turnos por horario, uno por cada cancha
for day_offset in range(7):
    fecha = today + timedelta(days=day_offset)
    current_time = time(hour=start_hour, minute=0)

    while datetime.combine(fecha, current_time) < datetime.combine(fecha, time(hour=end_hour)):
        hora_fin = (datetime.combine(fecha, current_time) + duration).time()

        for cancha in range(1, 5):  # Canchas 1 a 4
            db.add(Turno(
                fecha=fecha,
                hora_inicio=current_time,
                hora_fin=hora_fin,
                reservado=False,
                nombre="",
                apellido="",
                contacto="",
                cancha=cancha
            ))

        current_time = hora_fin

db.commit()
db.close()
print("✅ Turnos generados con éxito")
