import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Back from '../../../layout/Back';
import SearchInput from '../components/SearchInput';
import FrmProcessos from './frmProcessos';
import GridProcesso from './GridProcessos';
import useAuth from '../../../../hooks/useAuth';
import { IoInformationCircleSharp } from "react-icons/io5";

function Processos() {

  const [onEdit, setOnEdit] = useState(null);

  const { processos, setProcessos, getProcessos, handleSetCompanyId, companyId } = useAuth(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleSetCompanyId();
  }, [])


  useEffect(() => {
    getProcessos();
  }, [companyId])

  const handleEdit = (selectedProcesso) => {
    setOnEdit(selectedProcesso);
  }

  // Função para pesquisa
  useEffect(() => {
    const filtered = processos.filter((proc) => {
      const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()
      const normalizedSearchTerm = normalizeString(searchTerm);

      return (
        normalizeString(proc.nome_processo).includes(normalizedSearchTerm) ||
        normalizeString(proc.ramo_trabalho).includes(normalizedSearchTerm)
      );
    });

    setFilteredProcessos(filtered);
  }, [searchTerm, processos]);


  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <div className="tab-content mb-10">

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Processo</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página de cadastro de processo foi meticulosamente desenvolvida para oferecer uma maneira eficaz de registrar e gerenciar informações essenciais sobre os processos.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                No canto superior esquerdo da tela, um botão estrategicamente posicionado permite um retorno rápido à página principal de cadastros, garantindo uma navegação fluida e direta. No centro da tela, um formulário claro e de fácil compreensão está disponível para o cadastro do processo. Esse formulário segue o mesmo padrão intuitivo das demais páginas, tornando a inserção e modificação de dados uma tarefa simples, no campo de ramo de trabalho, deve ser inserido qual o ramo da atividade desenvolvida nesse processo por exemplo, um processo de limpeza de peças automotivas e desenvolvida no ramo de trabalho automotivo. Abaixo do formulário, implementamos um campo de pesquisa para facilitar a localização rápida de processos específicos, proporcionando uma experiência eficiente ao usuário. Complementando a página, uma tabela organizada exibe os dados dos processos, incluindo informações relevantes como nome e ramo de trabalho. Nessa tabela, são apresentados dois botões distintos para cada processo: um ícone de lápis para edição e um botão de vinculação para associar riscos ao processo selecionado. Ao clicar no botão de vinculação, os usuários podem abrir um modal dedicado para vincular riscos específicos ao processo, permitindo uma gestão integrada e eficaz dessas informações.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Essa abordagem visa oferecer uma página de cadastro de processos que atenda às necessidades dos usuários, proporcionando uma experiência intuitiva e eficiente na organização e gestão das informações relacionadas aos processos de trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="grid grid-cols-3 mb-10 mt-10">
        {/* Botão para voltar */}
        <div className="">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Processo</h1>
        </div>
        <div className="flex justify-end w-3/4 items-center">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
      </div>

      {/* Formulário de cadastro */}
      <FrmProcessos
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getProcessos={getProcessos}
        setSearchTerm={setSearchTerm}
        processos={processos}
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