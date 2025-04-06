import React, { useState } from 'react';

const TurnoCard = ({ grupo, adminMode, cancelar, seleccionar }) => {
  const hora = grupo[0].hora_inicio.slice(0, 5);
  const todasOcupadas = grupo.every(t => t.reservado);
  const disponibles = grupo.filter(t => !t.reservado).map(t => t.cancha);
  const ocupadas = grupo.filter(t => t.reservado).map(t => t.cancha);

  const [canchaSeleccionada, setCanchaSeleccionada] = useState('');

  const fondo = todasOcupadas ? 'ocupado' : 'disponible';

  const handleCancelar = () => {
    const turno = grupo.find(t => t.cancha === parseInt(canchaSeleccionada));
    if (turno) cancelar(turno.id);
  };

  const handleClick = () => {
    if (!adminMode && disponibles.length > 0) {
      seleccionar(grupo[0]);
    }
  };

  return (
    <div className={`turno-card ${fondo}`} onClick={handleClick}>
      <p><strong>Hora:</strong> {hora}</p>

      {!todasOcupadas ? (
        <>
      <p><strong>Canchas disponibles:</strong></p>
      <p className="numeros-canchas">{disponibles.join(' - ')}</p>
        </>
      ) : (
        <p><strong>Canchas ocupadas</strong></p>
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
