import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../../../services/api"; //Conexão com o banco

import Back from '../../../layout/Back'
import FrmEpi from './FrmEpi'
import GridEpi from './GridEpi'
import SearchInput from '../components/SearchInput'

function Epi() {

  const [epi, setEpi] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  const fetchEpi = async () => {
    try {
      const { data } = await supabase.from("epi").select();
      const sortData = data.sort((a, b) => {
        return a.nome_epi.localeCompare(b.nome_epi);
      })
      setEpi(sortData);
    } catch (error) {
      toast.warn("Erro ao buscar EPI's. Verificar Console!")
      console.log("Erro ao buscar EPI's", error)
    }
  }

  useEffect(() => {
    fetchEpi();
  }, [])


  const handleEdit = (item) => {
    setOnEdit(item);
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = epi.filter((emp) => emp.nome_epi.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(filtered);
  }, [searchTerm, epi]);


  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <>

      <div className="flex justify-center items-center mt-10">
        {/* Botão para voltar */}
        <div className="absolute left-0">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar EPI's</h1>
      </div>

      <FrmEpi
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        get={fetchEpi}
      />

      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar EPI..." />
        </div>
      </div>

      <GridEpi
        epis={filtered}
        setEpi={setEpi}
        setOnEdit={handleEdit}
      />
    </>
  )
}

export default Epi;