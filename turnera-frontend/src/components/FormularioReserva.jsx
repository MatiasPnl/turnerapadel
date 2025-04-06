import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/FormularioReserva.css';

const FormularioReserva = ({ turno, cerrar, onReservado }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [pagoEnLugar, setPagoEnLugar] = useState(true);
  const [cancha, setCancha] = useState('');
  const [canchasDisponibles, setCanchasDisponibles] = useState([1, 2, 3, 4]);

  // Simulación para mostrar canchas ya tomadas
  useEffect(() => {
    axios.get('http://localhost:8000/turnos')
      .then(res => {
        const ocupadas = res.data
          .filter(t => t.fecha === turno.fecha && t.hora_inicio === turno.hora_inicio && t.reservado)
          .map(t => t.cancha);
        const disponibles = [1, 2, 3, 4].filter(n => !ocupadas.includes(n));
        setCanchasDisponibles(disponibles);
      });
  }, [turno]);

  const handleTelefonoChange = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, '');
    setTelefono(soloNumeros);
  };

  const reservar = () => {
    if (!cancha) {
      alert("Debes seleccionar una cancha");
      return;
    }

    if (!pagoEnLugar) {
      alert('Serás redirigido a MercadoPago');
      window.open("https://www.mercadopago.com.ar/", "_blank");
      return;
    }

    // Por ahora incluimos la cancha en el campo contacto como "telefono-cancha"
    axios.post('http://localhost:8000/reservar', {
      fecha: turno.fecha,
      hora_inicio: turno.hora_inicio,
      nombre,
      apellido,
      contacto: telefono,
      cancha: parseInt(cancha)  // 👈 esto era lo que faltaba
    })
    .then(() => {
      alert(`Turno reservado en cancha ${cancha} con éxito`);
      onReservado();
    })
    .catch(() => alert('Ese turno ya fue reservado'));
  };

  return (
    <div className="modal">
      <div className="modal-contenido">
        <h3>Reservar Turno</h3>
        <p><strong>{turno.fecha}</strong> - {turno.hora_inicio.slice(0, 5)} a {turno.hora_fin.slice(0, 5)}</p>

        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input type="text" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
        <input type="tel" placeholder="Teléfono" value={telefono} onChange={handleTelefonoChange} />

        <select value={cancha} onChange={e => setCancha(e.target.value)}>
          <option value="">- Seleccioná una cancha -</option>
          {canchasDisponibles.map(n => (
            <option key={n} value={n}>Cancha {n}</option>
          ))}
        </select>

        <label>
          <input type="checkbox" checked={pagoEnLugar} onChange={() => setPagoEnLugar(!pagoEnLugar)} />
          Pago en el lugar
        </label>

        {!pagoEnLugar && (
          <div className="mercadopago-info">
            <img
              src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs"
              alt="MercadoPago"
            />
            <p>Serás redirigido para pagar con MercadoPago</p>
          </div>
        )}

        <button onClick={reservar}>Confirmar Reserva</button>
        <button className="cancelar" onClick={cerrar}>Cancelar</button>
      </div>
    </div>
  );
};

export default FormularioReserva;
