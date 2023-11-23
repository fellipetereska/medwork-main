//Importando Ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../../../services/api"; //Conexão com o banco

//Importando componentes
import CadastroEmpresa from "./frmCadastroEmpresas";
import GridCadastroEmpresa from './gridCadastroEmpresa';
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function Empresa() {

  // Instanciando e Definindo como vazio
  const [empresa, setEmpresa] = useState([]);
  const [contato, setContato] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);

  // Pegando os dados da tabela Empresa
  const getEmpresa = async () => {
    try {
      const { data } = await supabase.from("empresa").select();
      const sortData = data.sort((a, b) => {
        //Ordenar pro status (ativo ou inativo)
        if (a.ativo !== b.ativo) {
          return a.ativo ? -1 : 1;
        }

        //Ordenar por ordem alfabética
        return a.nome_empresa.localeCompare(b.nome_empresa);
      })

      setEmpresa(sortData)
    } catch (error) {
      console.log("Erro ao buscar empresas: ", error);
    }
  };

  const getContato = async () => {
    try {
      const { data } = await supabase.from("contato").select();
      const sortData = data.sort((a, b) => {
        //Ordenar por status (ativo ou inativo)
        if (a.ativo !== b.ativo) {
          return a.ativo ? -1 : 1;
        }

        //Ordenar por ordem alfabética
        return a.nome_contato.localeCompare(b.nome_contato);
      })
      setContato(sortData)
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getEmpresa();
    getContato();
  }, []);

  const handleEdit = (selectedEmpresa) => {
    setOnEdit(selectedEmpresa)
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = empresa.filter((emp) => emp.nome_empresa.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredEmpresas(filtered);
  }, [searchTerm, empresa]);


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

        <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Empresa</h1>
      </div>

      {/* Formulário de cadastro */}
      <CadastroEmpresa onEdit={onEdit} setOnEdit={setOnEdit} getEmpresa={getEmpresa} />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridCadastroEmpresa
        empresa={filteredEmpresas}
        setEmpresa={setEmpresa}
        setOnEdit={handleEdit}
      />
    </div>
  )
}

export default Empresa;
