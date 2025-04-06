import React from 'react';

const Calendar = ({ turnos, seleccionarFecha, fechaSeleccionada }) => {
  const fechasUnicas = [...new Set(turnos.map(t => t.fecha))];

  const formatearFecha = (fechaISO) => {
    const [year, month, day] = fechaISO.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="calendario">
      <div className="dias">
        {fechasUnicas.map((fecha, i) => (
          <div
            key={i}
            className={`fecha-div ${fecha === fechaSeleccionada ? 'seleccionada' : ''}`}
            onClick={() => seleccionarFecha(fecha)}
          >
            {formatearFecha(fecha)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
