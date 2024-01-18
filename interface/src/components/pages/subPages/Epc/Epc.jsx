import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco

import FrmEpc from './FrmEpc'
import GridEpc from './GridEpc'
import SearchInput from '../components/SearchInput'

function Epc() {

  const [epc, setEpc] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  const fetchEpc = async () => {
    try {
      const response = await fetch(`${connect}/medidas_epc`);

      if(!response.ok) {
        toast.error("Erro ao buscar EPC's");
        throw new Error(`Erro ao buscar EPC's. Status: ${response.status}`);
      }

      const data = await response.json();
      setEpc(data);
    } catch (error) {
      toast.warn("Erro ao buscar EPC's. Verificar Console!")
      console.log("Erro ao buscar EPC's", error)
    }
  }

  useEffect(() => {
    fetchEpc();
  }, [])


  const handleEdit = (item) => {
    setOnEdit(item);
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = epc.filter((emp) => emp.descricao_medida.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(filtered);
  }, [searchTerm, epc]);


  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <>

      <FrmEpc
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        get={fetchEpc}
      />

      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar EPI..." />
        </div>
      </div>

      <GridEpc
        children={filtered}
        setEpi={setEpc}
        setOnEdit={handleEdit}
      />
    </>
  )
}

export default Epc;