import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import TurnoCard from './components/TurnoCard';
import FormularioReserva from './components/FormularioReserva';
import BotonWhatsApp from './components/BotonWhatsApp';
import LoginAdmin from './components/LoginAdmin';
import './styles/style.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Timelapse from './components/Timelapse';
import logo from './assets/logo1.png';

function App() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [turnoActual, setTurnoActual] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    obtenerTurnos();
  }, []);

  const obtenerTurnos = () => {
    axios.get('http://localhost:8000/turnos')
      .then(res => setTurnos(res.data))
      .catch(err => console.error(err));
  };

  const actualizarTurnoLocal = () => {
    obtenerTurnos();
    setTurnoActual(null); // Cierra el modal de reserva
  };

  const cancelarTurno = (turnoId) => {
    axios.delete(`http://localhost:8000/cancelar/${turnoId}`, {
      headers: { 'x-admin-key': '1234admin' }
    })
    .then(() => {
      alert('Turno cancelado');
      actualizarTurnoLocal();
    })
    .catch(() => alert('Error al cancelar turno'));
  };

  const bloquesUnicos = [...new Set(
    turnos.filter(t => t.fecha === fechaSeleccionada).map(t => t.hora_inicio)
  )];

  return (
    <Router>
    <div className="contenedor">
      <Routes>
        <Route path="/" element={
          <>
            {/* Todo tu código actual de la página principal va acá */}
            {/* HEADER */}
            <div className="header">
              <div className="titulo-contenedor">
                <h1 className="titulo">aa</h1>
              </div>
              <img src={logo} alt="Logo" className="logo-header" />

            </div>

            {/* ÍCONO ADMIN */}
            <div className="admin-float">
              <img
                src="https://i.ibb.co/6d4sRZ5/icon.png"
                alt="Icono admin"
                className="icono-usuario"
                onClick={() => setMenuAbierto(!menuAbierto)}
              />
              {menuAbierto && (
                <div className="dropdown-menu">
                  {!admin ? (
                    <div onClick={() => {
                      setMostrarLogin(true);
                      setMenuAbierto(false);
                    }}>Iniciar sesión</div>
                  ) : (
                    <div onClick={() => {
                      setAdmin(false);
                      setMenuAbierto(false);
                    }}>Cerrar sesión</div>
                  )}
                </div>
              )}
            </div>
            {/* ... y todo lo demás como ya lo tenés */}

            <Calendar
              turnos={turnos}
              seleccionarFecha={setFechaSeleccionada}
              fechaSeleccionada={fechaSeleccionada}
            />
      
            {/* Tarjetas de turnos */}
            {fechaSeleccionada && (
              <div className="lista-turnos">
                {bloquesUnicos.map(hora => {
                  const grupo = turnos.filter(t =>
                    t.fecha === fechaSeleccionada && t.hora_inicio === hora
                  );
                  return (
                    <TurnoCard
                      key={hora}
                      grupo={grupo}
                      adminMode={admin}
                      cancelar={cancelarTurno}
                      seleccionar={setTurnoActual}
                    />
                  );
                })}
              </div>
            )}

            {/* BOTONES ADMIN */}
            {admin && (
              <div className="admin-fixed-footer">
                <Link to="/timelapse">
                  <button className="boton-footer">Timelapse</button>
                </Link>
                <button className="boton-footer">Próximamente</button>
              </div>
            )}

            {/* Modales */}
            {turnoActual && (
              <FormularioReserva
                turno={turnoActual}
                cerrar={() => setTurnoActual(null)}
                onReservado={actualizarTurnoLocal}
              />
            )}

            {mostrarLogin && (
              <LoginAdmin
                cerrarModal={() => setMostrarLogin(false)}
                onLoginExitoso={() => setAdmin(true)}
              />
            )}

            <BotonWhatsApp />
          </>
        } />

        <Route path="/timelapse" element={<Timelapse />} />
      </Routes>
    </div>
  </Router>
);
}

export default App;
