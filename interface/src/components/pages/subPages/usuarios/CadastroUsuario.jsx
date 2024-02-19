import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

import FrmCadastroUsuario from './frmCadastroUsuario'
import GridUsuarios from './gridUsuarios';
import { Link } from "react-router-dom";
import Back from '../../../layout/Back';

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
    <>
      <div>
        <div className="flex justify-center items-center mt-10">
          {/* Botão para voltar */}
          <div className="absolute left-0">
            <Link to="/gestao">
              <Back />
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Unidade</h1>
        </div>
        <div>
          <FrmCadastroUsuario
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getUsuario={getUsuarios}
            usuarios={usuarios}
          />

          <GridUsuarios
            usuario={usuarios}
            setOnEdit={handleEdit}
          />
        </div>
      </div>
    </>
  )
}

export default CadastroUsuario;
