import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'
import { connect } from "../../../../services/api";
import useAuth from '../../../../hooks/useAuth'

import FrmCadastroCargo from "./frmCadastroCargo";
import GridCadastroCargo from "./gridCadastroCargo";
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function CadastroCargo() {

  const {cargos, setCargos, getCargos, getSetores, setores, companyId, handleSetCompanyId} = useAuth(null)

  // Instanciando e Definindo como vazio
  const [setorNome, setSetorNome] = useState(null);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCargo, setFilteredCargo] = useState([]);

  useEffect(() => {
    handleSetCompanyId();
  },[])

  useEffect(() => {
    getCargos();
    getSetores();
  }, [companyId]);

  const findSetor = (fkSetorId) => {
    if(!setores) {
      return 'N/A';
    }

    const setor = setores.find((c) => c.id_setor === fkSetorId);
    return setor ? setor.nome_setor : 'N/A';
  }

  const handleEdit = (selectedCargo) => {
    setOnEdit(selectedCargo)

    if (selectedCargo.fk_setor_id) {
      const setorInfo = setores.find((c) => c.id_setor === selectedCargo.fk_setor_id)
      if (setorInfo) {
        setSetorNome(setorInfo.nome_setor);
      }
    }
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = cargos.filter((carg) => carg.nome_cargo.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCargo(filtered);
  }, [searchTerm, cargos]);

  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }


  return (
    <div className="tab-content mt-14 mb-32">
      <div className="flex justify-center items-center">
        {/* Botão para voltar */}
        <div className="absolute left-0">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>
        <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Cargo</h1>
      </div>

      <FrmCadastroCargo
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getCargo={getCargos}
        set={setorNome}
        setor={setores}
      />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Cargo..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridCadastroCargo
        cargos={filteredCargo}
        setCargo={setCargos}
        setOnEdit={handleEdit}
        find={findSetor}
        setor={setores}
      />
    </div>
  )
}

export default CadastroCargo;
