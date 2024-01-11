import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'
import { connect, supabase } from "../../../../services/api";

import FrmCadastroCargo from "./frmCadastroCargo";
import GridCadastroCargo from "./gridCadastroCargo";
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function CadastroCargo() {

  // Instanciando e Definindo como vazio
  const [cargo, setCargo] = useState([]);
  const [setor, setSetor] = useState([]);
  const [setorNome, setSetorNome] = useState(null);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCargo, setFilteredCargo] = useState([]);

  // Pegando os dados do banco
  const getCargo = async () => {
    try {

      const response = await fetch(`${connect}/cargos`);

      if(!response.ok) {
        throw new Error(`Erro ao buscar cargos. Status: ${response.status}`)
      }

      const data = await response.json();
      setCargo(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getSetor = async () => {
    try {
      const { data } = await supabase.from("setor").select();
      setSetor(data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCargo();
    getSetor();
  }, []);

  const findSetor = (fkSetorId) => {
    if(!setor) {
      return 'N/A';
    }

    const setores = setor.find((c) => c.id_setor === fkSetorId);
    return setores ? setores.nome_setor : 'N/A';
  }

  const handleEdit = (selectedCargo) => {
    setOnEdit(selectedCargo)

    if (selectedCargo.fk_setor_id) {
      const setorInfo = setor.find((c) => c.id_setor === selectedCargo.fk_setor_id)
      if (setorInfo) {
        setSetorNome(setorInfo.nome_setor);
      }
    }
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = cargo.filter((carg) => carg.nome_cargo.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCargo(filtered);
  }, [searchTerm, cargo]);

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
        getCargo={getCargo}
        set={setorNome}
        getSetor={setor}
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
        setCargo={setCargo}
        setOnEdit={handleEdit}
        find={findSetor}
      />
    </div>
  )
}

export default CadastroCargo;
