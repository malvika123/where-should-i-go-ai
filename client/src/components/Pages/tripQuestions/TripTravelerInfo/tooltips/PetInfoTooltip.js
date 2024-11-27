import React from 'react';
import '../style/Tooltip.css'; 

const PetInfoTooltip = () => {
  return (
    <div className="tooltip-container">
      <p className='text'>
        We'll scan reviews and recommendations of travellers with pets to
        highlight pet-friendly options, though some recommendations may not be
        entirely accommodating for pets.
      </p>
    </div>
  );
};

export default PetInfoTooltip;