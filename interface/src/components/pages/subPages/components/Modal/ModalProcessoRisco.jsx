import React, { useEffect, useState } from 'react';
import { connect } from '../../../../../services/api';
import { IoAddCircle } from "react-icons/io5";
import { toast } from 'react-toastify';

import ModalSearchRisco from './ModalSearchRisco'

const ModalProcessoRisco = ({ onCancel, isOpen, childName, childId, children }) => {

  const [processoRisco, setProcessoRisco] = useState([]);
  const [risco, setRisco] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchProcessoRisco = async () => {
    try {
      const response = await fetch(`${connect}/processos_riscos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar processos e riscos. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setProcessoRisco(responseData);
    } catch (error) {
      console.log("Erro ao buscar processos e riscos!", error);
    }
  }

  const fetchRisco = async () => {
    try {
      const response = await fetch(`${connect}/riscos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar riscos. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setRisco(responseData);
    } catch (error) {
      console.log("Erro ao buscar riscos!", error)
    }
  }

  useEffect(() => {
    fetchRisco();
    fetchProcessoRisco();
  }, [childId])


  if (!isOpen) {
    return null;
  }

  const findRisco = (FkprocessoId) => {
    if (!risco) {
      return 'N/A'
    }

    const riscos = risco.find((c) => c.id_risco === FkprocessoId)
    return riscos ? riscos.nome_risco : 'N/A'
  }

  const findProcesso = (FkRiscoId) => {
    if (!children) {
      return 'N/A'
    }

    const processos = children.find((c) => c.id_processo === FkRiscoId)
    return processos ? processos.nome_processo : 'N/A'
  }

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  const selectedSetor = async (item) => {
    try {
      const response = await fetch(`${connect}/processos_riscos`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify([{
          fk_processo_id: childId,
          fk_risco_id: item,
        }])
      });

      if (!response.ok) {
        throw new Error(`Erro ao vincular risco ao processo. Status: ${response.status}`);
      }

      const responseData = await response.json();

      closeModal();
      fetchProcessoRisco();
      toast.success(responseData);
    } catch (error) {
      console.log("Erro ao vincular processo no setor", error);
      toast.warn("Erro ao vincular processo")
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-5/6 bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-700'>Adicione riscos ao processo: <span className='text-xl text-gray-700 font-bold'>{childName}</span></h1>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
              onClick={onCancel}>
              <svg className="flex m-auto w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <div className='border-b border-gray-200'></div>
        <div className='flex justify-end items-center py-2 mt-4'>
          <p className='text-sm text-gray-500'>
            Selecione um risco para o processo <span className='text-sky-700 font-semibold'>{childName}</span>
          </p>
          <button
            className='ml-4 bg-sky-600 hover:bg-sky-900 py-3 px-4 text-white rounded-md'
            onClick={openModal}
          >
            <IoAddCircle />
          </button>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
          <table className="w-full shadow-md text-sm mb-8 mt-2 text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">
                  ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Processo
                </th>
                <th scope="col" className="px-4 py-3">
                  Risco
                </th>
              </tr>
            </thead>
            <tbody>
              {processoRisco.filter((item) => item.fk_processo_id === childId)
              .map((item, i) => (
                <tr
                  key={i}
                  className={`border-b bg-white`}
                >
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.id_processo_risco}
                  </th>
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {findProcesso(item.fk_processo_id)}
                  </th>
                  <td className="px-4 py-4">
                    {findRisco(item.fk_risco_id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalSearchRisco
        isOpen={showModal}
        onCancel={closeModal}
        children={risco}
        setorName={childName}
        onSelect={selectedSetor}
      />
    </div>
  );
};


export default ModalProcessoRisco;
