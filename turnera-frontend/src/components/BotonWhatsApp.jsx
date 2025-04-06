import React from 'react';
import './../styles/BotonWhatsApp.css';

const BotonWhatsApp = () => {
  return (
    <div className="boton-whatsapp-container">
      <div className="tooltip">Contactanos!</div>
      <div className="boton-whatsapp">
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
        />
      </div>
    </div>
  );
};

export default BotonWhatsApp;
