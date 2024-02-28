import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import MedidasAdm from './MedidasPrevencao/MedidasPrevencao';
import MedidaEpi from './Epi/Epi';
import MedidaEpc from './Epc/Epc';
import Back from '../../layout/Back';
import { IoInformationCircleSharp } from "react-icons/io5";;

function CadastroMedidas() {

  const [activeTab, setActiveTab] = useState(1);
  const [visible, setVisible] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <MedidasAdm />
        );
      case 2:
        return (
          <>
            <MedidaEpi />
          </>
        );
      case 3:
        return (
          <>
            <MedidaEpc />
          </>
        );
      default:
        return null;
    }
  };


  return (
    <>
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Medidas</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página de cadastro de medidas foi projetada para fornecer uma abordagem abrangente na gestão de ações preventivas e de segurança na empresa.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                No canto superior esquerdo da tela, um botão estrategicamente posicionado permite um retorno rápido à página principal de cadastros, garantindo uma navegação eficiente e direta. O menu superior de abas inclui três categorias distintas: "Medidas Administrativas", "Medidas EPI" e "Medidas EPC". Cada aba possui seu próprio formulário de cadastro e tabela associada. Dentro de cada aba, os usuários encontrarão um formulário claro e de fácil compreensão, específico para a categoria de medidas selecionada. Esse formulário segue o mesmo padrão intuitivo das demais páginas, simplificando a inserção e modificação de dados relacionados às medidas administrativas, EPIs ou EPCs. Abaixo de cada formulário, uma tabela organizada exibe os dados referentes às medidas da categoria correspondente. O O botao de edição ícone de lápis permite ajustes diretos na tabela.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Essa abordagem segmentada visa proporcionar uma experiência intuitiva e eficiente na organização e gestão das medidas preventivas da empresa, distinguindo claramente entre as categorias de medidas administrativas, EPIs e EPCs.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 mb-10 mt-10">
        {/* Botão para voltar */}
        <div className="">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Medidas</h1>
        </div>
        <div className="flex justify-end w-3/4 items-center">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
      </div>


      <div>
        <div className="flex mt-5 xl:w-4/12 ml-5 justify-center">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <li className={`me-2 ${activeTab === 1 ? "rounded-t-lg bg-gray-50" : ""}`}>
              <button className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100" onClick={() => handleTabClick(1)}>Administrativas</button>
            </li>
            <li className={`me-2 ${activeTab === 2 ? "rounded-t-lg bg-gray-50" : ""}`}>
              <button className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100" onClick={() => handleTabClick(2)}>EPI's</button>
            </li>
            <li className={`me-2 ${activeTab === 3 ? "rounded-t-lg bg-gray-50" : ""}`}>
              <button className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100" onClick={() => handleTabClick(3)}>EPC's</button>
            </li>
          </ul>
        </div>
        {renderContent()}
      </div>
    </>
  )
}

export default CadastroMedidas;