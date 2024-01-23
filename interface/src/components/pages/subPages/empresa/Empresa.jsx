//Importando Ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth';

//Importando componentes
import CadastroEmpresa from "./frmCadastroEmpresas";
import GridCadastroEmpresa from './gridCadastroEmpresa';
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function Empresa() {

  const {
    getEmpresas, 
    empresas,
    setEmpresas,
    getContatos,
    contatos
   } = useAuth(null);

  // Instanciando e Definindo como vazio
  const [onEdit, setOnEdit] = useState(null);
  const [contactName, setContactName] = useState(null)

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);

  useEffect(() => {
    getEmpresas();
    getContatos();
  }, []);

  const handleEdit = (selectedEmpresa) => {
    setOnEdit(selectedEmpresa);

    if (selectedEmpresa.fk_contato_id) {
      const contactInfo = contatos.find((c) => c.id_contato === selectedEmpresa.fk_contato_id)
      if (contactInfo) {
        setContactName(contactInfo.nome_contato)
      }
    }
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = empresas.filter((emp) => emp.nome_empresa.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredEmpresas(filtered);
  }, [searchTerm, empresas]);


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
        getEmpresa={getEmpresas}
        contact={contactName}
        contatos={contatos}
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
        setEmpresa={setEmpresas}
        setOnEdit={handleEdit}
        getEmpresa={getEmpresas}
        contato={contatos}
      />
    </div>
  )
}

export default Empresa;
