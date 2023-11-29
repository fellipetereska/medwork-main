import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { supabase } from "../../../../services/api"; //Conexão com o bando de dados

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

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUnidade, setFilteredUnidades] = useState([]);

  // Pegando os dados do banco
  const getUnidade = async () => {
    try {
      const { data } = await supabase.from("unidade").select();
      const sortData = data.sort((a, b) => {
        if (a.ativo !== b.ativo) {
          return a.ativo ? -1 : 1;
        }

        return a.nome_unidade.localeCompare(b.nome_unidade);
      })
      setUnidade(sortData)
    } catch (error) {
      toast.error(error);
    }
  };

  const getContato = async () => {
    try {
      const { data } = await supabase.from("contato").select();
      setContato(data)
    } catch (error) {
      toast.error(error);
    }
  };

  const getEmpresa = async () => {
    try {
      const { data } = await supabase.from("empresa").select();
      setEmpresa(data)
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUnidade();
    getContato();
    getEmpresa();
  }, []);

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
      />
    </div>
  )
}

export default CadastroUnidade;
