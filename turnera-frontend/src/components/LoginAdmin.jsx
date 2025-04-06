import React, { useState } from 'react';
import './../styles/LoginAdmin.css'; // si querés separarlo también en un CSS propio

const LoginAdmin = ({ cerrarModal, onLoginExitoso }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarLogin = () => {
    if (usuario === 'admin' && contrasena === '1234') {
      onLoginExitoso();
      cerrarModal();
      setUsuario('');
      setContrasena('');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="modal-login">
      <div className="modal-contenido-login">
        <h3>Inicio de sesión Staff</h3>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <div className="botones">
          <button onClick={manejarLogin}>Ingresar</button>
          <button className="cancelar" onClick={cerrarModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
