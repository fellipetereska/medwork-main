import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import MedidasAdm from './MedidasPrevencao/MedidasPrevencao'
import Back from '../../layout/Back'

function CadastroMedidas() {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return null;
      case 1:
        return (
          <MedidasAdm />
        );
      case 2:
        return (
          <>
            <p>Teste 2</p>
          </>
        );
      case 3:
        return (
          <>
            {/* <CadastroUsuario /> */}
          </>
        );
      default:
        return null;
    }
  };


  return (
    <>
      <div className="flex justify-center items-center mt-10">
        {/* Botão para voltar */}
        <div className="absolute left-0">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Medidas de Proteção</h1>
      </div>
      <div>
        <div className="flex mt-5 xl:w-4/12 ml-5 justify-center">
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <li class={`me-2 ${activeTab === 1 ? "rounded-t-lg bg-gray-50" : ""}`}>
              <button class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100" onClick={() => handleTabClick(1)}>Administrativas</button>
            </li>
            <li class={`me-2 ${activeTab === 2 ? "rounded-t-lg bg-gray-50" : ""}`}>
              <button class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100" onClick={() => handleTabClick(2)}>EPI's</button>
            </li>
            <li class={`me-2 ${activeTab === 3 ? "rounded-t-lg bg-gray-50" : ""}`}>
              <button class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100" onClick={() => handleTabClick(3)}>EPC's</button>
            </li>
          </ul>
        </div>
        {renderContent()}
      </div>
    </>
  )
}

export default CadastroMedidas;