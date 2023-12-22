import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../../../services/api";

import SearchInput from '../components/SearchInput'
import FrmRiscos from './FrmRiscos'
import GridRiscos from "./GridRiscos";
import Back from '../../../layout/Back'

function Riscos() {

  const [riscos, setRiscos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRiscos, setFilteredRiscos] = useState([]);

  const getRiscos = async () => {
    try {
      const { data } = await supabase.from("risco").select();
      const sortData = data.sort((a, b) => {
        return a.nome_risco.localeCompare(b.nome_risco);
      })
      setRiscos(sortData);
    } catch (error) {
      console.log("Erro ao buscar riscos: ", error)
    }
  }

  useEffect(() => {
    getRiscos();
  }, [])

  const handleEdit = (selectedRisco) => {
    setOnEdit(selectedRisco);
  }

  //Função para Pesquisa
  useEffect(() => {
    const filtered = riscos.filter((risk) => risk.nome_risco.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredRiscos(filtered);
  }, [searchTerm, riscos]);


  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <>
      <div className="tab-content mt-14 mb-32">
        <div className="flex justify-center items-center">
          {/* Botão para voltar */}
          <div className="absolute left-0">
            <Link to="/cadastros">
              <Back />
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Empresa</h1>
        </div>

        {/* Formulário de Cadastro */}
        <FrmRiscos
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getRiscos={getRiscos}
          riscos={riscos}
        />

        {/* Barra de pesquisa */}
        <div className="flex justify-center w-full">
          <div className="w-3/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Risco..." />
          </div>
        </div>

        {/* Tabela */}
        <GridRiscos
          riscos={filteredRiscos}
          setRiscos={setRiscos}
          setOnEdit={setOnEdit}
        />
      </div>
    </>
  )
}

export default Riscos;