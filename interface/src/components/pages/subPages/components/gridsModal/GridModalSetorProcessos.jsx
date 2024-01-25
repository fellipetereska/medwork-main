import React, { useEffect, useState } from "react";
import { connect } from '../../../../../services/api';
import { IoAddCircle } from "react-icons/io5";
import { toast } from 'react-toastify';
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from 'sweetalert2';
import icon_add from '../../../../media/icon_add_link.png'

import ModalSearchProcesso from '../Modal/ModalSearchProcesso'

function GridSetorProcesso({ setorName, setorId, setor }) {

  const [setorProcesso, setSetorProcesso] = useState([]);
  const [processo, setProcesso] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchSetorProcesso = async () => {
    try {
      const response = await fetch(`${connect}/setores_processos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar setores e processos. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setSetorProcesso(responseData);
    } catch (error) {
      console.log("Erro ao buscar setores e processos!", error)
    }
  }

  const fetchProcesso = async () => {
    try {
      const response = await fetch(`${connect}/processos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar processos. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setProcesso(responseData);
    } catch (error) {
      console.log("Erro ao buscar processos!", error)
    }
  }

  useEffect(() => {
    fetchSetorProcesso();
    fetchProcesso();
  }, [setorId])

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
      const response = await fetch(`${connect}/setores_processos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          fk_processo_id: item,
          fk_setor_id: setorId
        }])
      });

      if (!response.ok) {
        throw new Error(`Erro ao vincular Processo ao setor. Status: ${response.status}`);
      }

      const responseData = await response.json();

      closeModal();
      fetchSetorProcesso();
      toast.success(responseData);
    } catch (error) {
      console.log("Erro ao vincular processo no setor", error);
      toast.warn("Erro ao vincular processo")
    }
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você está prestes a excluir este item!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, exclua!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${connect}/setores_processos/${item}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Erro ao deletar vinculo entre processo e setor. Status: ${response.status}`);
        }

        const responseData = await response.json();
        fetchSetorProcesso();
        toast.success(responseData)

      } catch (error) {
        toast.warn("Erro ao deletar processo")
        console.error("Erro ao deletar processo do setor!", error);
      }
    };
  }


  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg mx-auto sm:justify-center max-w-6xl">
        <div className='flex justify-center items-center py-2 mr-2'>
          <div
            className='ml-4 bg-sky-600 hover:bg-sky-700 py-3 px-4 cursor-pointer text-white rounded-md flex justify-center items-center gap-2'
            onClick={openModal}
          >
            <img className="h-5" src={icon_add} />
            <p className='text-base font-semibold text-white'>
              Víncular
            </p>
          </div>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
          <table className="w-full shadow-md text-sm m-2 text-left rtl:text-right text-gray-500">
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
                <th scope="col" className="px-4 py-3 flex justify-center">
                  Ações
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
                    <td className="px-4 py-4 flex justify-center">
                      <a
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(item.id_setor_processo)}
                      >
                        <BsFillTrash3Fill />
                      </a>
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
    </>
  )
}

export default GridSetorProcesso;