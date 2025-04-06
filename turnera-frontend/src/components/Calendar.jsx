import React from 'react';

const Calendar = ({ turnos, seleccionarFecha, fechaSeleccionada }) => {
  // Obtener fecha actual en formato YYYY-MM-DD
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // resetear hora para comparación justa
  const hoyISO = hoy.toISOString().split('T')[0];

  // Obtener fechas únicas y filtrar por fechas >= hoy
  const fechasUnicas = [...new Set(
    turnos
      .map(t => t.fecha)
      .filter(f => f >= hoyISO)
  )];

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
