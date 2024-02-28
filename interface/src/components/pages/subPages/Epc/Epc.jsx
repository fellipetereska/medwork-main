import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api";
import useAuth from '../../../../hooks/useAuth'

import FrmEpc from './FrmEpc'
import GridEpc from './GridEpc'
import SearchInput from '../components/SearchInput'

function Epc() {

  const { getMedidasEpc, setMedidasEpc, medidasEpc } = useAuth();

  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getMedidasEpc();
  }, [])

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  //Função para Pesquisa
  useEffect(() => {
    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

    const filtered = medidasEpc.filter((emp) => normalizeString(emp.descricao_medida).includes(normalizeString(searchTerm)));
    setFiltered(filtered);
  }, [searchTerm, medidasEpc]);


  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <>

      <FrmEpc
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        get={getMedidasEpc}
        medidas={medidasEpc}
      />

      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar EPI..." />
        </div>
      </div>

      <GridEpc
        children={filtered}
        setEpi={setMedidasEpc}
        setOnEdit={handleEdit}
      />
    </>
  )
}

export default Epc;