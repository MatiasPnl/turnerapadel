import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/timelapse.css';

const Timelapse = () => {
  const [turnos, setTurnos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/turnos')
      .then(res => {
        const ahora = new Date();
  
        const diasValidos = [...Array(7)].map((_, i) => {
          const fecha = new Date();
          fecha.setHours(0, 0, 0, 0);
          fecha.setDate(fecha.getDate() + i);
          return fecha.toISOString().split('T')[0];
        });
  
        const turnosFiltrados = res.data
          .filter(t => {
            if (!t.reservado || !diasValidos.includes(t.fecha)) return false;
  
            const fechaHoraTurno = new Date(`${t.fecha}T${t.hora_inicio}`);
            return fechaHoraTurno >= ahora; // ❗ Sólo turnos futuros o actuales
          })
          .sort((a, b) => {
            const fechaA = new Date(`${a.fecha}T${a.hora_inicio}`);
            const fechaB = new Date(`${b.fecha}T${b.hora_inicio}`);
            return fechaA - fechaB;
          });
  
        setTurnos(turnosFiltrados);
      })
      .catch(err => console.error(err));
  }, []);

  const turnosVisibles = turnos.filter(t =>
    t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.fecha.includes(busqueda)
  );

  return (
    <div className="timelapse-wrapper">
      <div className="timelapse-card-container">
        <div className="volver-btn-container">
          <Link to="/"><button className="volver-btn">← Volver</button></Link>
        </div>

        <div className="titulo-filtro">
          <h2>Turnos Reservados</h2>
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o fecha"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="filtro-fecha"
          />
        </div>

        {turnosVisibles.length === 0 ? (
          <p>No hay turnos coincidentes.</p>
        ) : (
          <div className="turnos-lista">
            {turnosVisibles.map(turno => (
              <div key={turno.id} className="turno-card-timelapse">
                <p><strong>📅 Fecha:</strong> {turno.fecha}</p>
                <p><strong>⏰ Hora:</strong> {turno.hora_inicio.slice(0, 5)} - {turno.hora_fin.slice(0, 5)}</p>
                <p><strong>🎾 Cancha:</strong> C{turno.cancha}</p>
                <p><strong>👤 Nombre:</strong> {turno.nombre} {turno.apellido}</p>
                <p><strong>📱 Contacto:</strong> {turno.contacto}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timelapse;
