import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Back from '../../../layout/Back';
import SearchInput from '../components/SearchInput';
import FrmProcessos from './frmProcessos'
import GridProcesso from './GridProcessos'
import useAuth from '../../../../hooks/useAuth'

function Processos() {

  const [onEdit, setOnEdit] = useState(null);

  const { processos, setProcessos, getProcessos, handleSetCompanyId, companyId } = useAuth(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProcessos, setFilteredProcessos] = useState([]);

  useEffect(() => {
    handleSetCompanyId();
  }, [])


  useEffect(() => {
    getProcessos();
  },[companyId])

  const handleEdit = (selectedProcesso) => {
    setOnEdit(selectedProcesso);
  }

  // Função para pesquisa
  useEffect(() => {
    const filtered = processos.filter((proc) => proc.nome_processo.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProcessos(filtered);
  }, [searchTerm, processos]);


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

        <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Processos</h1>
      </div>

      {/* Formulário de cadastro */}
      <FrmProcessos
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getProcessos={getProcessos}
      />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Processo..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridProcesso
        processos={filteredProcessos}
        setEmpresa={setProcessos}
        setOnEdit={handleEdit}
      />
    </div>
  )
}

export default Processos;