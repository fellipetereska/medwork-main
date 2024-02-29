import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth';

import SearchInput from '../components/SearchInput';
import FrmRiscos from './FrmRiscos';
import GridRiscos from "./GridRiscos";
import Back from '../../../layout/Back';
import { IoInformationCircleSharp } from "react-icons/io5";

function Riscos() {

  const [onEdit, setOnEdit] = useState(null);
  const [visible, setVisible] = useState(false);

  const {
    handleSetCompanyId, companyId,
    riscos, setRiscos, getRiscos,
    getMedidasAdm, medidasAdm, getMedidasEpi, medidasEpi, getMedidasEpc, medidasEpc,
    getProcessos, processos,
    getProcessosRiscos, processosRiscos,
    getRiscosMedidas, riscosMedidas,
  } = useAuth(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRiscos, setFilteredRiscos] = useState([]);
  

  useEffect(() => {
    handleSetCompanyId();
  }, [])

  useEffect(() => {
    getRiscos();
    getProcessos();
    getMedidasAdm();
    getMedidasEpi();
    getMedidasEpc();
    getProcessosRiscos();
    getRiscosMedidas();
  }, [companyId])

  const handleEdit = (selectedRisco) => {
    setOnEdit(selectedRisco);
  }

  //Função para Pesquisa
  useEffect(() => {
    const filtered = riscos.filter((risk) => risk.nome_risco.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredRiscos(filtered);
  }, [searchTerm, riscos]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  return (
    <>
      <div className="tab-content mb-32">
        {/* Popover */}
        <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
          <div className="fixed z-50 m-2 -mt-4">
            <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
              <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Risco</h2>
              <div>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  A página de cadastro de riscos foi concebida para oferecer uma abordagem abrangente na identificação e gestão de riscos no setor.
                </p>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  No canto superior esquerdo da tela, um botão estrategicamente posicionado permite um retorno rápido à página principal de cadastros, garantindo uma navegação eficiente e direta. No centro da tela, um formulário claro e de fácil compreensão está disponível para o cadastro de detalhes do risco. Esse formulário segue o mesmo padrão intuitivo das demais páginas, facilitando a inserção e modificação de dados relacionados aos riscos identificados. Os campos meio de propagação, unidade de medida, nivel de ação, limite de tolerância e metodologia são dinamicos utilizando o campo de classificação como referência, ao selecionar o campo de classificação os campos dinâmicos podem ou não ser liberados para preenchimento. Abaixo do formulário, implementamos um campo de pesquisa para agilizar a localização rápida de riscos específicos, proporcionando uma experiência eficiente ao usuário. Complementando a página, uma tabela organizada exibe os dados dos riscos, incluindo informações relevantes como nome e descrição. Nessa tabela, são apresentados dois botões distintos para cada risco: um ícone de lápis para edição e um botão de vinculação com o ícone de uma corrente para associar medidas de proteção específicas ao risco selecionado. Ao clicar no botão de vinculação, o sistema abrirá um modal dedicado para vincular medidas de proteção ao risco, permitindo uma gestão integrada e eficaz dessas informações.
                </p>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  Essa abordagem visa oferecer uma página que tenha uma experiência intuitiva e eficiente na identificação e gestão dos riscos no setor.
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
            <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Risco</h1>
          </div>
          <div className="flex justify-end w-3/4 items-center">
            <div onMouseEnter={() => setVisible(true)}>
              <IoInformationCircleSharp className='text-sky-700' />
            </div>
          </div>
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
          setOnEdit={handleEdit}
          processos={processos}
          medidasAdm={medidasAdm}
          medidasEpi={medidasEpi}
          medidasEpc={medidasEpc}
          processosRiscos={processosRiscos}
          riscosMeidas={riscosMedidas}
        />

      </div>
    </>
  )
}

export default Riscos;