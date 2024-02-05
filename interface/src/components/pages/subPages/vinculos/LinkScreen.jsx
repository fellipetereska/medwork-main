import React, { useState } from "react";
import icon_setor from '../../../media/icon_setor.svg'
import icon_medidas from '../../../media/icon_medidas.svg'
import icon_riscos from '../../../media/icon_riscos.svg'
import icon_processos from '../../../media/icon_processos.svg'
import { toast } from "react-toastify";

import useAuth from '../../../../hooks/useAuth'
import { IoClose } from "react-icons/io5";

import SetoresProcessos from "./setoresProcessos/SetoresProcessos";
import ProcessosRiscos from './processosRiscos/ProcessosRiscos'
import RiscosMedidas from "./riscosMedidas/RiscsoMedidas";

function LinkScreen({ selected, setNavValue }) {

  const renderContent = () => {
    switch (selected) {
      case 0:
        return (
          <>
            <div className="mt-12 mb-24 px-8 max-w-5xl mx-auto">
              <h1 className="mb-4 text-3xl text-center font-extrabold text-sky-700">Para selecionar o vínculo desejado, clique no menu acima e escolha a opção correspondente:</h1>
              <div className="grid md:grid-cols-3 gap-4">
                <div
                  className="p-6 hover:bg-gray-50 hover: rounded-md flex flex-col justify-center items-center"
                  onClick={() => setNavValue(1)}
                >
                  <div className="flex justify-center items-center flex-col">
                    <span className="text-lg font-medium text-gray-800">Processos em setores: </span>
                    <p className="text-base text-gray-600">
                      Vincular Processos ao setor
                    </p>
                  </div>
                </div>
                <div
                  className="p-6 hover:bg-gray-50 hover: rounded-md flex flex-col justify-center items-center"
                  onClick={() => setNavValue(2)}
                >
                  <span className="text-lg font-medium text-gray-800">Riscos em Processos: </span>
                  <p className="text-base text-gray-600">
                    Vincular Riscos ao processo
                  </p>
                </div>
                <div
                  className="p-6 hover:bg-gray-50 hover: rounded-md flex flex-col justify-center items-center"
                  onClick={() => setNavValue(3)}
                >
                  <div className="flex justify-center items-center flex-col">
                    <span className="text-lg font-medium text-gray-800">Medidas em Riscos: </span>
                    <p className="text-base text-gray-600">
                      Vincular Medidas ao risco
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <SetoresProcessos />
          </>
        );
      case 2:
        return (
          <>
            <ProcessosRiscos />
          </>
        );
      case 3:
        return (
          <>
            <RiscosMedidas />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderContent()}
    </>
  )
}

export default LinkScreen;