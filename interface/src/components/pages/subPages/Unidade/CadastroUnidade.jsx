import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { supabase } from "../../../../services/api"; //Conexão com o bando de dados
import { connect } from "../../../../services/api"; //Conexão com o bando de dados

//Importando Componentes
import FrmCadastroUnidade from "./frmCadastroUnidade";
import GridCadastroUnidade from './gridCadastroUnidade';
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function CadastroUnidade() {

  // Instanciando variáveis e definindo como vazio
  const [unidade, setUnidade] = useState([]);
  const [contato, setContato] = useState([]);
  const [contactName, setContactName] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [companyId, setCompanyId] = useState('');

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUnidade, setFilteredUnidades] = useState([]);

  useEffect(() => {
    // Função para recuperar o nome da empresa do localStorage
    const selectedCompanyId = () => {
      const selectedCompanyDataLocal = localStorage.getItem('selectedCompanyData');

      if (selectedCompanyDataLocal) {
        const selectedCompanyData = JSON.parse(selectedCompanyDataLocal);
        setCompanyId(selectedCompanyData.id_empresa);
      }
    };

    selectedCompanyId();
  }, []);

  // Pegando os dados do banco
  const getUnidade = async () => {
    try {
      const response = await fetch(`${connect}/unidades`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Unidades. Status ${response.status}`)
      }

      const data = await response.json();
      const filteredUnidades = data.filter((unidade) => unidade.fk_empresa_id === companyId);
      setUnidade(filteredUnidades);
    } catch (error) {
      console.log("Erro ao buscar unidades!", error);
    }
  };

  const getContato = async () => {
    try {
      const response = await fetch(`${connect}/contatos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar contato. Status ${response.status}`)
      }

      const data = await response.json();
      setContato(data);
    } catch (error) {
      console.log("Erro ao buscar contatos!", error);
    }
  };

  const getEmpresa = async () => {
    try {
      const response = await fetch(`${connect}/empresas`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar empresas. Status ${response.status}`)
      }

      const data = await response.json();
      setEmpresa(data);
    } catch (error) {
      console.log("Erro ao buscar empresas!", error);
    }
  };

  useEffect(() => {
    getUnidade();
    getContato();
    getEmpresa();
  }, [companyId]);

  //Função para Editar
  const handleEdit = (selectUnidade) => {
    setOnEdit(selectUnidade);

    if (selectUnidade.fk_contato_id) {
      const contactInfo = contato.find((c) => c.id_contato === selectUnidade.fk_contato_id)
      if (contactInfo) {
        setContactName(contactInfo.nome_contato)
      }
    }

    if (selectUnidade.fk_empresa_id) {
      const companyInfo = empresa.find((c) => c.id_empresa === selectUnidade.fk_empresa_id)
      if (companyInfo) {
        setCompanyName(companyInfo.nome_empresa)
      }
    }
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtred = unidade.filter((udd) => udd.nome_unidade.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    setFilteredUnidades(filtred);
  }, [searchTerm, unidade]);

  const handleSearch = (term) => {
    setSearchTerm(term)
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
        <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Unidade</h1>
      </div>

      {/* Formulário de Cadastro */}
      <FrmCadastroUnidade
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getUnidade={getUnidade}
        contact={contactName}
        contato={contato}
        empresa={empresa}
        company={companyName}
      />

      {/* Barra de Pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Unidade..." />
        </div>
      </div>

      {/* Tabela Unidade */}
      <GridCadastroUnidade
        unidade={filteredUnidade}
        setUnidade={setUnidade}
        setOnEdit={handleEdit}
        contato={contato}
        empresa={empresa}
      />
    </div>
  )
}

export default CadastroUnidade;
