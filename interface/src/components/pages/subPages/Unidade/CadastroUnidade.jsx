import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth'

//Importando Componentes
import FrmCadastroUnidade from "./frmCadastroUnidade";
import GridCadastroUnidade from './gridCadastroUnidade';
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function CadastroUnidade() {

  const {
    getUnidades,
    unidades,
    setUnidades,
    loadSelectedCompanyFromLocalStorage,
    companyId,
    getContatos,
    contatos,
    getEmpresas,
    empresas,
  } = useAuth(null)

  // Instanciando variáveis e definindo como vazio
  const [contactName, setContactName] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUnidade, setFilteredUnidades] = useState([]);

  useEffect(() => {
    loadSelectedCompanyFromLocalStorage();
  }, [])

  useEffect(() => {
    getUnidades();
    getContatos();
    getEmpresas();
  }, [companyId]);

  //Função para Editar
  const handleEdit = (selectUnidade) => {
    setOnEdit(selectUnidade);

    if (selectUnidade.fk_contato_id) {
      const contactInfo = contatos.find((c) => c.id_contato === selectUnidade.fk_contato_id)
      if (contactInfo) {
        setContactName(contactInfo.nome_contato)
      }
    }

    if (selectUnidade.fk_empresa_id) {
      const companyInfo = empresas.find((c) => c.id_empresa === selectUnidade.fk_empresa_id)
      if (companyInfo) {
        setCompanyName(companyInfo.nome_empresa)
      }
    }
  };

  //Função para Pesquisa
  useEffect(() => {
    try {
      const filtred = unidades.filter((udd) => udd.nome_unidade.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
      setFilteredUnidades(filtred);
    } catch (error) {
      console.log("Erro ao filtrar unidades!", error)
    }
  }, [searchTerm, unidades]);

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
        getUnidades={getUnidades}
        contact={contactName}
        contato={contatos}
        empresa={empresas}
        company={companyName}
        companyId={companyId}
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
        setUnidades={setUnidades}
        getUnidades={getUnidades}
        setOnEdit={handleEdit}
        contato={contatos}
        empresa={empresas}
      />
    </div>
  )
}

export default CadastroUnidade;
