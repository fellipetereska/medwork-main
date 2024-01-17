//Importando Ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect, supabase } from "../../../../services/api"; //Conexão com o banco

//Importando componentes
import CadastroMedidas from "./frmMedidasProtecao";
import FrmEpi from '../Epi/FrmEpi'
import GridMedidas from './GridMedidasProtecao';
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function MedidasProtecao() {

  // Instanciando e Definindo como vazio
  const [medidasProtecao, setMedidasProtecao] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Pegando os dados da tabela Empresa
  const getMedidasProtecao = async () => {
    try {
      const response = await fetch(`${connect}/medidas_adm`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar medidas. Status: ${response.status}`);
      }

      const data = await response.json();
      setMedidasProtecao(data)
    } catch (error) {
      console.log("Erro ao buscar Medidas: ", error);
    }
  };

  useEffect(() => {
    getMedidasProtecao();
  }, []);

  const handleEdit = (selected) => {
    setOnEdit(selected);
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = medidasProtecao.filter((mp) => mp.descricao_medida.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(filtered);
  }, [searchTerm, medidasProtecao]);


  const handleSearch = (term) => {
    setSearchTerm(term);
  }


  return (
    <div className="tab-content mt-14 mb-32">

      <CadastroMedidas
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        get={getMedidasProtecao}
      />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Medidas de Proteção..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridMedidas
        children={filtered}
        set={setMedidasProtecao}
        setOnEdit={handleEdit}
      />
    </div>
  )
}

export default MedidasProtecao;
