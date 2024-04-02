import React, { useState, useEffect } from "react";
import useAuth from '../../../../hooks/useAuth';

import FrmElaboador from './FrmElaborador';
import GridElaborador from './GridElaborador';


function CadastroElaborador() {
  return (
    <>

      {/* Cabeçalho */}

      {/* Form */}
      <FrmElaboador />

      {/* Search */}

      {/* Grid */}
      <GridElaborador />
    </>
  );
}

export default CadastroElaborador;