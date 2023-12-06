import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../../services/api";

import FrmCadastroUsuario from './frmCadastroUsuario'
import GridUsuarios from './gridUsuarios';

function CadastroUsuario() {

  // Instanciando e Definindo como vazio
  const [usuario, setUsuario] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // Pegando os dados do banco
  const getUsuario = async () => {
    try {
      const { data } = await supabase.from("usuarios").select();
      setUsuario(data)
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsuario();
  }, []);

  const handleEdit = (selectedUser) => {
    setOnEdit(selectedUser)
  };


  return (
    <div>
      <div className="tab-content mt-14 mb-32">
        <div>
          <FrmCadastroUsuario onEdit={onEdit} setOnEdit={setOnEdit} getUsuario={getUsuario} />

          <GridUsuarios
            usuario={usuario}
            setOnEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  )
}

export default CadastroUsuario;
