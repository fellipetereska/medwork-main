import React, { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import { supabase } from '../../../../../services/api';
import { IoAddCircle } from "react-icons/io5";
import { toast } from 'react-toastify';

import ModalSearchProcesso from '../Modal/ModalSearchProcesso'

const ModalProcesso = ({ onCancel, isOpen, setorName, setorId, setor }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [setorProcesso, setSetorProcesso] = useState([]);
  const [processo, setProcesso] = useState([]);
  const [showModal, setShowModal] = useState(false); //Controlar o Modal


  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  const fetchSetorProcesso = async () => {
    try {
      const { data } = await supabase.from("setor_processo").select();
      setSetorProcesso(data);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProcesso = async () => {
    try {
      const { data } = await supabase.from("processo").select();
      setProcesso(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSetorProcesso();
    fetchProcesso();
  }, [setorId])


  if (!isOpen) {
    return null;
  }

  const findPorcesso = (FkprocessoId) => {
    if (!processo) {
      return 'N/A'
    }

    const processos = processo.find((c) => c.id_processo === FkprocessoId)
    return processos ? processos.nome_processo : 'N/A'
  }

  const findSetor = (FkSetorId) => {
    if (!setor) {
      return 'N/A'
    }

    const setores = setor.find((c) => c.id_setor === FkSetorId)
    return setores ? setores.nome_setor : 'N/A'
  }

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  const selectedSetor = async (item) => {
    try {
      await supabase.from("setor_processo")
      .upsert([
        {
          fk_processo_id: item,
          fk_setor_id: setorId
        }
      ]);
      closeModal();
      toast.success("Processo vinculado com sucesso!");
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
          <h1 className='text-xl font-bold text-sky-700'>Adicione processos ao setor: <span className='text-xl text-gray-700 font-bold'>{setorName}</span></h1>
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
            Selecione um processo para o Setor <span className='text-sky-700 font-semibold'>{setorName}</span>
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
                  Setor
                </th>
                <th scope="col" className="px-4 py-3">
                  Processo
                </th>
              </tr>
            </thead>
            <tbody>
              {setorProcesso.filter((item) => item.fk_setor_id === setorId)
              .map((item, i) => (
                <tr
                  key={i}
                  className={`border-b bg-white`}
                >
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.id_setor_processo}
                  </th>
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {findSetor(item.fk_setor_id)}
                  </th>
                  <td className="px-4 py-4">
                    {findPorcesso(item.fk_processo_id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalSearchProcesso
        isOpen={showModal}
        onCancel={closeModal}
        children={processo}
        setorName={setorName}
        onSetorSelect={selectedSetor}
      />
    </div>
  );
};


export default ModalProcesso;
