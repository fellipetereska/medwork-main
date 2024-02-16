import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

import FrmCadastroUsuario from './frmCadastroUsuario'
import GridUsuarios from './gridUsuarios';

function CadastroUsuario() {

  const { handleSetCompanyId, companyId, getUsuarios, setUsuarios, usuarios } = useAuth(null);

  // Instanciando e Definindo como vazio
  const [onEdit, setOnEdit] = useState(null);

  useEffect(() => {
    handleSetCompanyId();
  }, []);

  useEffect(() => {
    getUsuarios();
  }, [companyId])

  const handleEdit = (selectedUser) => {
    setOnEdit(selectedUser)
  };


  return (
    <div>
      <div className="tab-content mt-14 mb-32">
        <div>
          <FrmCadastroUsuario
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getUsuario={getUsuarios}
          />

          <GridUsuarios
            usuario={usuarios}
            setOnEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  )
}

export default CadastroUsuario;
