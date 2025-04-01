import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = '573205094943';

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <button className="whatsapp-button" onClick={handleClick}>
      <img src="/whatsapp-icon.png" alt="WhatsApp" />
    </button>
  );
};

export default WhatsAppButton;
