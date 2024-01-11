//Importando Ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco

//Importando componentes
import CadastroAparelhos from "./FrmAparelhos";
import GridAParelhos from './GridAparelhos';
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function Aparelhos() {

  // Instanciando e Definindo como vazio
  const [aparelhos, setAparelhos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Pegando os dados da tabela Empresa
  const getAparelhos = async () => {
    try {
      const response = await fetch(`${connect}/aparelhos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Aparelhos. Status: ${response.status}`);
      }

      const data = await response.json();
      setAparelhos(data);
    } catch (error) {
      console.log("Erro ao buscar Aparelhos: ", error.message);
    }
  };
  
  useEffect(() => {
    getAparelhos();
  }, []);

  const handleEdit = (selected) => {
    setOnEdit(selected);
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = aparelhos.filter((mp) => mp.nome_aparelho.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(filtered);
  }, [searchTerm, aparelhos]);


  const handleSearch = (term) => {
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

        <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Aparelhos</h1>
      </div>

      {/* Formulário de cadastro */}
      <CadastroAparelhos
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        get={getAparelhos}
      />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Aparelhos..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridAParelhos
        children={filtered}
        set={setAparelhos}
        setOnEdit={handleEdit}
      />
    </div>
  )
}

export default Aparelhos;
