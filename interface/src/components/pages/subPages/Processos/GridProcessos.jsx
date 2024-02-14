import { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiLink } from "react-icons/fi";
import ModalProcessoRisco from '../components/Modal/ModalProcessoRisco';

function GridProcesso({ processos, setOnEdit }) {

  const [showModal, setShowModal] = useState(null);
  const [processName, setProcessName] = useState(null);
  const [processId, setProcessId] = useState(null);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  const handleProcessSelect = (item) => {
    setProcessName(item.nome_processo)
    setProcessId(item.id_processo)
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
                Processo
              </th>
              <th scope="col" className="px-4 py-3">
                Ramo de Trabalho
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {processos.map((item, i) => (
              <tr key={i} className="border-b bg-white">
                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.id_processo}
                </th>
                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.nome_processo}
                </th>
                <td className="px-4 py-4">
                  {item.ramo_trabalho}
                </td>
                <td className="px-5 py-4 gap-4 flex justify-center">
                  <a className="font-medium text-blue-400 hover:text-blue-800">
                    <BsFillPencilFill onClick={() => handleEdit(item)} />
                  </a>
                  <a className={`cursor-pointer text-yellow-500 text-lg ${!item.ativo ? 'cursor-not-allowed' : ''}`} onClick={() => handleProcessSelect(item)}>
                    <FiLink />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalProcessoRisco
        isOpen={showModal}
        onCancel={closeModal}
        childName={processName}
        childId={processId}
        children={processos}
      />
    </>
  );
}

export default GridProcesso;
