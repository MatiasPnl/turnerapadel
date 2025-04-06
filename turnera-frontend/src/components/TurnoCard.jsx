import React, { useState } from 'react';

const TurnoCard = ({ grupo, adminMode, cancelar, seleccionar }) => {
  const hora = grupo[0].hora_inicio.slice(0, 5);
  const fechaHoraTurno = new Date(`${grupo[0].fecha}T${grupo[0].hora_inicio}`);
  const ahora = new Date();

  const expirado = fechaHoraTurno < ahora;
  const todasOcupadas = grupo.every(t => t.reservado);

  const disponibles = [...new Set(grupo.filter(t => !t.reservado).map(t => t.cancha))];
  const ocupadas = [...new Set(grupo.filter(t => t.reservado).map(t => t.cancha))];

  const [canchaSeleccionada, setCanchaSeleccionada] = useState('');

  const fondo = expirado ? 'expirado' : todasOcupadas ? 'ocupado' : 'disponible';

  const handleCancelar = () => {
    const turno = grupo.find(t => t.cancha === parseInt(canchaSeleccionada));
    if (turno) cancelar(turno.id);
  };

  const handleClick = () => {
    if (!adminMode && disponibles.length > 0 && !expirado) {
      seleccionar(grupo[0]);
    }
  };

  return (
    <div className={`turno-card ${fondo}`} onClick={handleClick}>
      <p><strong>⏰Hora:</strong> {hora}</p>

      {expirado ? (
        <p><strong>⚠️ Turno expirado</strong></p>
      ) : !todasOcupadas ? (
        <>
          <p><strong>🎾Canchas disponibles:</strong></p>
          <p className="numeros-canchas">
            {disponibles.map((n, i) => (
              <strong key={i}>{n}{i < disponibles.length - 1 ? ' - ' : ''}</strong>
            ))}
          </p>
        </>
      ) : (
        <p><strong>❌Canchas ocupadas❌</strong></p>
      )}

      {adminMode && ocupadas.length > 0 && (
        <div onClick={(e) => e.stopPropagation()}>
          <select value={canchaSeleccionada} onChange={e => setCanchaSeleccionada(e.target.value)}>
            <option value="">Seleccionar cancha ocupada</option>
            {ocupadas.map(n => (
              <option key={n} value={n}>Cancha {n}</option>
            ))}
          </select>
          <button onClick={handleCancelar}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default TurnoCard;
