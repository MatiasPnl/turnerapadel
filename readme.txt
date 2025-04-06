# 📅 Turnera Web - Cosito Padel

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow.svg)

Este proyecto es una **turnera web** para el complejo Cosito Padel 🥎, donde los usuarios pueden seleccionar turnos desde un calendario.  
Cada turno dura **1 hora y media** y está vinculado a una de las **4 canchas disponibles**. Los turnos ya reservados no pueden volver a seleccionarse.

---

## ⚙️ Tecnologías utilizadas

- 🎨 **Frontend:** React
- 🚀 **Backend:** FastAPI (Python)
- 💅 **Estilos:** CSS personalizado (diseño neumórfico)
- 🗃️ **Base de datos:** SQLite

---

## 🛠 Requisitos para correr el proyecto

### 🐍 Backend (FastAPI)

1. Asegurate de tener **Python 3.10+** instalado.
2. Instalá las dependencias:

```bash
pip install -r requirements.txt

Inicializá la base de datos (una sola vez):
python init_db.py
Ejecutá el servidor:

uvicorn main:app --reload
El backend corre por defecto en http://localhost:8000

⚛️ Frontend (React)
Asegurate de tener Node.js y npm instalados.

Instalá las dependencias:

npm install
Iniciá el proyecto:

npm start
El frontend corre por defecto en http://localhost:3000

🔐 Modo Administrador
Para cancelar turnos o acceder a funciones restringidas, se puede iniciar sesión como administrador:

Usuario: admin

Contraseña: 1234

📆 Visualización de calendario con fechas y horas disponibles

📲 Reserva de turnos con selección de cancha


✅ Funcionalidades actuales

💵 Confirmación con pago en lugar o redirección a MercadoPago

🔐 Login de administrador para cancelar reservas

✅ Visualización del estado de las canchas por turno

🟩 Estilo neumórfico y responsive

Próximos pasos
 Panel de administración completo

 Validaciones más robustas

 Historial de reservas

 Integración real con API de MercadoPago

