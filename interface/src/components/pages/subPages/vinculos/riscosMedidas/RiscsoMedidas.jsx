import React, { useEffect, useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import { IoClose } from "react-icons/io5";
import icon_riscos from '../../../../media/icon_riscos.svg'

import ModalSearchRisco from "../../components/Modal/ModalSearchRisco";
import GridModalRiscoMedidas from '../../components/gridsModal/GridModalRiscoMedidas'


function RiscosMedidas() {

  const { riscos, handleSetCompanyId, companyId, getRiscos } = useAuth(null);

  const [showModal, setShowModal] = useState(false);
  const [riscoNome, setRiscoNome] = useState(null);
  const [riscoId, setRiscoId] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    handleSetCompanyId();
  }, []);

  useEffect(() => {
    getRiscos();
  }, [companyId]);

  const handleClear = () => {
    setRiscoNome(null);
    setRiscoId(null);
    closeModal();
  }

  const handleSelect = (id, name) => {
    closeModal();
    setRiscoId(id)
    setRiscoNome(name)
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-lg">
          {riscoNome ? (
            <div className="flex justify-center mb-6">
              <h3 className="text-3xl font-bold text-sky-700">Vincule risco a esse processo</h3>
            </div>
          ) : (
            <div className="flex justify-center mb-6">
              <h3 className="text-3xl font-bold text-sky-700">Selecione um Processo</h3>
            </div>
          )}
          <div className="px-6">
            <div>
              {riscoNome ? (
                <div className="mb-6">
                  <p>Risco selecionado:</p>
                  <div className="flex gap-2 items-center">
                    <div
                      className="w-full bg-gray-100 shadow-md rounded-md px-2 justify-center flex py-2 text-sky-700 font-bold text-sm cursor-pointer"
                      onClick={handleClear}
                    >
                      <h3>{riscoNome}</h3>
                    </div>
                    <IoClose className="text-2xl cursor-pointer" onClick={handleClear} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p>Risco selecionado:</p>
                    <div className="w-full bg-gray-100 shadow-md rounded-md px-2 justify-center flex py-2 text-sky-700 font-bold text-sm">
                      <h3>Nenhum Risco Selecionado</h3>
                    </div>
                  </div>
                  <div
                    onClick={openModal}
                    className="bg-gray-100 w-full cursor-pointer rounded-md shadow-md flex flex-col justify-center items-center py-2"
                  >
                    <img src={icon_riscos} />
                    <p className="text-sm font-medium">Selecione um Risco</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          {riscoNome ? (
            <GridModalRiscoMedidas
              childId={riscoId}
              children={riscos}
            />
          ) : (
            null
          )}
        </div>
      </div>
      <ModalSearchRisco
        isOpen={showModal}
        onCancel={closeModal}
        children={riscos}
        onSelect={handleSelect}
      />
    </>
  )
}

export default RiscosMedidas;