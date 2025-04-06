import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/timelapse.css';

const Timelapse = () => {
  const [turnos, setTurnos] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/turnos')
      .then(res => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // fuerza hora local

        const diasValidos = [...Array(7)].map((_, i) => {
          const fecha = new Date(hoy);
          fecha.setDate(hoy.getDate() + i);

          const anio = fecha.getFullYear();
          const mes = String(fecha.getMonth() + 1).padStart(2, '0');
          const dia = String(fecha.getDate()).padStart(2, '0');

          return `${anio}-${mes}-${dia}`; // igual al formato del backend
        });

        const turnosFiltrados = res.data.filter(t =>
          t.reservado && diasValidos.includes(t.fecha)
        );

        setTurnos(turnosFiltrados);
      })
      .catch(err => console.error(err));
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // fuerza hora local

  const dias = [...Array(7)].map((_, i) => {
    const fecha = new Date(today);
    fecha.setDate(today.getDate() + i);

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  });

  const horas = [
    "08:00:00", "09:30:00", "11:00:00", "12:30:00",
    "14:00:00", "15:30:00", "17:00:00", "18:30:00", "20:00:00"
  ];

  return (
    <div className="contenedor-pagina">
    <div className="contenedor-central">
        <div className="calendario-timelapse">
        {/* Botón volver */}
        <div className="volver-btn-container">
            <Link to="/"><button className="volver-btn">← Volver</button></Link>
        </div>

        {/* Encabezado de días */}
        <div className="encabezado">
            <div className="hora-cell"></div>
            {dias.map((dia, i) => {
            const fechaVisual = new Date(dia);
            fechaVisual.setDate(fechaVisual.getDate() + 1); // 👈 solo visual

            return (
                <div key={i} className="dia-cell">
                {fechaVisual.toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit'
                })}
                </div>
            );
            })}
        </div>

        {/* Grilla de turnos */}
        <div className="grilla">
            {horas.map((hora, i) => (
            <div key={i} className="fila">
                <div className="hora-cell">{hora.slice(0, 5)}</div>
                {dias.map((dia, j) => {
                const turnosEnCelda = turnos.filter(
                    t => t.fecha === dia && t.hora_inicio === hora
                );

                return (
                    <div key={j} className={`celda ${turnosEnCelda.length ? 'ocupado' : ''}`}>
                    <div className="canchas-wrapper">
                        {turnosEnCelda.map((turno, idx) => (
                        <div
                            key={idx}
                            className="cancha-mini"
                            onClick={() => setTurnoSeleccionado(turno)}
                        >
                            C{turno.cancha}
                        </div>
                        ))}
                    </div>
                    </div>
                );
                })}
            </div>
            ))}
        </div>

        {/* Modal de detalle */}
        {turnoSeleccionado && (
            <div className="modal-overlay">
            <div className="modal-contenido">
                <h3>Detalle del Turno</h3>
                <p><strong>Fecha:</strong> {turnoSeleccionado.fecha}</p>
                <p><strong>Hora:</strong> {turnoSeleccionado.hora_inicio.slice(0, 5)} - {turnoSeleccionado.hora_fin.slice(0, 5)}</p>
                <p><strong>Cancha:</strong> C{turnoSeleccionado.cancha}</p>
                <p><strong>Nombre:</strong> {turnoSeleccionado.nombre}</p>
                <p><strong>Apellido:</strong> {turnoSeleccionado.apellido}</p>
                <p><strong>Contacto:</strong> {turnoSeleccionado.contacto}</p>
                <button onClick={() => setTurnoSeleccionado(null)}>Cerrar</button>
            </div>
            </div>
        )}
        </div>
    </div>
    </div>
  );
};

export default Timelapse;
