import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from '../../../../hooks/useAuth'

import FrmEpi from './FrmEpi'
import GridEpi from './GridEpi'
import SearchInput from '../components/SearchInput'

function Epi() {

  const {getMedidasEpi, medidasEpi, setMedidasEpi} = useAuth(null);

  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getMedidasEpi();
  }, [])


  const handleEdit = (item) => {
    setOnEdit(item);
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = medidasEpi.filter((epi) => epi.nome_medida && epi.nome_medida.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(filtered);
  }, [searchTerm, medidasEpi]);


  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <>
      <FrmEpi
        onEdit={onEdit}
        get={getMedidasEpi}
        epis={medidasEpi}
      />

      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar EPI..." />
        </div>
      </div>

      <GridEpi
        epis={filtered}
        setEpi={setMedidasEpi}
        setOnEdit={handleEdit}
      />
    </>
  )
}

export default Epi;