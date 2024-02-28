//Importando Ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco
import useAuth from '../../../../hooks/useAuth'

//Importando componentes
import CadastroMedidas from "./frmMedidasProtecao";
import GridMedidas from './GridMedidasProtecao';
import SearchInput from "../components/SearchInput";

function MedidasProtecao() {

  const {getMedidasAdm, medidasAdm} = useAuth(null);

  // Instanciando e Definindo como vazio
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getMedidasAdm();
  }, []);

  const handleEdit = (selected) => {
    setOnEdit(selected);
  };

  //Função para Pesquisa
  useEffect(() => {
    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()
    const filtered = medidasAdm.filter((mp) => normalizeString(mp.descricao_medida_adm).includes(normalizeString(searchTerm)));
    setFiltered(filtered);
  }, [searchTerm, medidasAdm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  return (
    <div className="tab-content mt-14 mb-32">

      <CadastroMedidas
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        get={getMedidasAdm}
        medidas={medidasAdm}
      />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Medidas de Proteção Adminitrativas..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridMedidas
        children={filtered}
        set={getMedidasAdm}
        setOnEdit={handleEdit}
      />
    </div>
  )
}

export default MedidasProtecao;
