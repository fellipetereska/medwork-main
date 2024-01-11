//Importando Ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco

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
  const [contactName, setContactName] = useState(null)

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);

  // Pegando os dados da tabela Empresa
  const getEmpresa = async () => {
    try {
      const response = await fetch(`${connect}/empresas`);

      if(!response.ok){
        throw new Error(`Erro ao buscar Empresa. Status: ${response.status}`)
      }

      const data = await response.json();
      setEmpresa(data)
    } catch (error) {
      console.log("Erro ao buscar empresas: ", error);
    }
  };

  const getContato = async () => {
    try {
      const { data } = await connect.from("contato").select();
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
    setOnEdit(selectedEmpresa);

    if (selectedEmpresa.fk_contato_id) {
      const contactInfo = contato.find((c) => c.id_contato === selectedEmpresa.fk_contato_id)
      if (contactInfo) {
        setContactName(contactInfo.nome_contato)
      }
    }
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
      <CadastroEmpresa 
        onEdit={onEdit} 
        setOnEdit={setOnEdit} 
        getEmpresa={getEmpresa}
        contact={contactName}
        />

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
