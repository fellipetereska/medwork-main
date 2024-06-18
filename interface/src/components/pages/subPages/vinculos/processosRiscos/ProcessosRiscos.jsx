import React, { useEffect, useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import { IoClose } from "react-icons/io5";
import icon_processos from '../../../../media/icon_processos.svg'

import ModalSearchProcesso from "../../components/Modal/ModalSearchProcesso";
import GridModalProcessoRiscos from '../../components/gridsModal/GridModalProcessoRiscos'


function SetoresProcessos() {

  const { processos, handleSetCompanyId, companyId, getProcessos } = useAuth(null);

  const [showModal, setShowModal] = useState(false);
  const [processoNome, setProcessoNome] = useState(null);
  const [processoId, setProcessoId] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    handleSetCompanyId();
  }, []);

  useEffect(() => {
    getProcessos();
  }, [companyId]);

  const handleClear = () => {
    setProcessoNome(null);
    setProcessoId(null);
    closeModal();
  }

  const handleSelect = (id, name) => {
    closeModal();
    setProcessoId(id)
    setProcessoNome(name)
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-lg">
          {processoNome ? (
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
              {processoNome ? (
                <div className="mb-6">
                  <p>Processo selecionado:</p>
                  <div className="flex gap-2 items-center">
                    <div className="w-full bg-gray-100 shadow-md rounded-md px-2 justify-center flex py-2 text-sky-700 font-bold text-sm">
                      <h3>{processoNome}</h3>
                    </div>
                    <IoClose className="text-2xl cursor-pointer" onClick={handleClear} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p>Processo selecionado:</p>
                    <div className="w-full bg-gray-100 shadow-md rounded-md px-2 justify-center flex py-2 text-sky-700 font-bold text-sm">
                      <h3>Nenhum Processo Selecionado</h3>
                    </div>
                  </div>
                  <div
                    onClick={openModal}
                    className="bg-gray-100 w-full cursor-pointer rounded-md shadow-md flex flex-col justify-center items-center py-2"
                  >
                    <img src={icon_processos} />
                    <p className="text-sm font-medium">Selecione um Processo</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          {processoNome ? (
            <GridModalProcessoRiscos
              childId={processoId}
              children={processos}
            />
          ) : (
            null
          )}
        </div>
      </div>
      <ModalSearchProcesso
        isOpen={showModal}
        onCancel={closeModal}
        children={processos}
        onSetorSelect={handleSelect}
      />
    </>
  )
}

export default SetoresProcessos;