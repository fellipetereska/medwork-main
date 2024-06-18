import React, { useState } from "react";

import { BsFillPencilFill } from 'react-icons/bs';
import { FiLink } from "react-icons/fi";
import ModalRiscoMedidas from "../components/Modal/ModalRiscoMedidas";

function GridRiscos({ riscos, setOnEdit }) {

  const [showModal, setShowModal] = useState(false);
  const [riscoName, setRiscoName] = useState();
  const [riscoId, setRiscoId] = useState();

  const handleEditClick = (risco) => {
    handleEdit(risco);
  }

  const handleEdit = (item) => {
    setOnEdit(item);
  }

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  const handleSetModal = (item) => {
    setRiscoId(item.id_risco)
    setRiscoName(item.nome_risco)
    openModal();
  }

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
        <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">
                ID
              </th>
              <th scope="col" className="px-4 py-3">
                Risco
              </th>
              <th scope="col" className="px-4 py-3">
                Grupo
              </th>
              <th scope="col" className="px-4 py-3">
                E-social
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Nivel de Ação
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Limite de Tolerância
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Severidade
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {riscos.map((item, i) => (
              <tr
                key={i}
                className={`border-b bg-white`}
              >
                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.id_risco}
                </th>
                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.nome_risco}
                </th>
                <td className="px-4 py-4">
                  {item.grupo_risco}
                </td>
                <td className="px-4 py-4">
                  {item.codigo_esocial_risco}
                </td>
                <td className="px-4 py-4 text-center">
                  {item.nivel_acao_risco} {item.unidade_medida_risco}
                </td>
                <td className="px-4 py-4 text-center">
                  {item.limite_tolerancia_risco} {item.unidade_medida_risco}
                </td>
                <td className="px-4 py-4 text-center">
                  {item.severidade_risco}
                </td>
                <td className="py-4 px-2">
                  <div className="gap-4 flex justify-center items-center">
                    <a className="font-medium text-blue-400 hover:text-blue-800 cursor-pointer">
                      <BsFillPencilFill onClick={() => handleEditClick(item)} />
                    </a>
                    <a className={`cursor-pointer text-yellow-500 text-lg`} onClick={() => handleSetModal(item)}>
                      <FiLink />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalRiscoMedidas
        onCancel={closeModal}
        isOpen={showModal}
        childId={riscoId}
        childName={riscoName}
        children={riscos}
      />
    </>
  );
}

export default GridRiscos;