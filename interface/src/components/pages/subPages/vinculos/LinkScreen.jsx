import React, { useState } from "react";
import icon_setor from '../../../media/icon_setor.svg'
import { toast } from "react-toastify";

import useAuth from '../../../../hooks/useAuth'
import ModalSearchSetor from "../components/Modal/ModalSearchSetor";
import { IoClose } from "react-icons/io5";

function LinkScreen() {

  const [showModalSetor, setShowModalSetor] = useState(false);
  const [setorId, setSetorId] = useState(null);
  const [setorNome, setSetorNome] = useState(null);

  const { setores } = useAuth(null)

  const openModal = () => setShowModalSetor(!showModalSetor);
  const closeModal = () => {
    setShowModalSetor(false)
    handleClearSetor();
  }

  // Função para atualizar o Id Setor
  const handleSetorSelect = (SetorId, SetorName) => {
    closeModal();
    setSetorId(SetorId)
    setSetorNome(SetorName)
  };

  const handleClearSetor = () => {
    setSetorId(null);
    setSetorNome(null);
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-4">
            <div className="p-2">
              <div className="flex justify-center mb-6">
                <h3 className="text-2xl font-bold text-sky-700">Selecione o Setor</h3>
              </div>
              <div>
                {setorNome ? (
                  <div className="mb-6">
                    <p>Setor selecionado:</p>
                    <div className="flex gap-2 items-center">
                      <div className="w-full bg-gray-100 shadow-md rounded-md px-2 justify-center flex py-2 text-sky-700 font-bold text-lg">
                        <h3>{setorNome}</h3>
                      </div>
                      <IoClose className="text-2xl" onClick={handleClearSetor} />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p>Setor selecionado:</p>
                    <div className="w-full bg-gray-100 shadow-md rounded-md px-2 justify-center flex py-2 text-sky-700 font-bold text-base">
                      <h3>Nenhum Setor Selecionado</h3>
                    </div>
                  </div>
                )}
                <div
                  onClick={openModal}
                  className="bg-gray-100 w-full cursor-pointer rounded-md shadow-md flex flex-col justify-center items-center py-2"
                >
                  <img src={icon_setor} />
                  <p className="text-sm font-medium">Selecione um setor</p>
                </div>
              </div>
              <ModalSearchSetor
                isOpen={showModalSetor}
                onCancel={closeModal}
                children={setores}
                onContactSelect={handleSetorSelect}
              />
            </div>
            <div className="flex justify-center">
              <h3>Teste</h3>
            </div>
            <div className="flex justify-center">
              <h3>Teste</h3>
            </div>
            <div className="flex justify-center">
              <h3>Teste</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LinkScreen;