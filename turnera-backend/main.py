from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import turnos

app = FastAPI()

# Permitir acceso desde el frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(turnos.router)
