import React, { useEffect, useState } from "react";
import { connect } from '../../../../../services/api';
import { toast } from 'react-toastify';
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from 'sweetalert2';
import icon_add from '../../../../media/icon_add_link.png'

import ModalSearchRisco from '../Modal/ModalSearchRisco'

function GridProcessoRiscos({ childId, children }) {

  const [processoRisco, setProcessoRisco] = useState([]);
  const [riscos, setRiscos] = useState([]);
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
      console.log("Erro ao buscar processos e riscos!", error)
    }
  }

  const fetchRisco = async () => {
    try {
      const response = await fetch(`${connect}/riscos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar riscos. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setRiscos(responseData);
    } catch (error) {
      console.log("Erro ao buscar riscos!", error)
    }
  }

  useEffect(() => {
    fetchProcessoRisco();
    fetchRisco();
  }, [childId])

  const findRisco = (fkRiscoId) => {
    if (!riscos) {
      return 'N/A'
    }

    const risco = riscos.find((c) => c.id_risco === fkRiscoId)
    return risco ? risco.nome_risco : 'N/A'
  }

  const findProcesso = (fkProcessoId) => {
    if (!children) {
      return 'N/A'
    }

    const processos = children.find((c) => c.id_processo === fkProcessoId)
    return processos ? processos.nome_processo : 'N/A'
  }

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  const selected = async (item) => {
    try {
      const response = await fetch(`${connect}/processos_riscos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          fk_risco_id: item,
          fk_processo_id: childId,
        }])
      });

      if (!response.ok) {
        throw new Error(`Erro ao vincular Risco ao Processo. Status: ${response.status}`);
      }

      const responseData = await response.json();

      closeModal();
      fetchProcessoRisco();
      toast.success(responseData);
    } catch (error) {
      console.log("Erro ao vincular Risco ao processo", error);
      toast.warn("Erro ao vincular risco")
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
        const response = await fetch(`${connect}/processos_riscos/${item}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Erro ao deletar vinculo entre risco e processo. Status: ${response.status}`);
        }

        const responseData = await response.json();
        fetchProcessoRisco();
        toast.success(responseData);

      } catch (error) {
        toast.warn("Erro ao deletar risco");
        console.error("Erro ao deletar risco do processo!", error);
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
                  Processo
                </th>
                <th scope="col" className="px-4 py-3">
                  Risco
                </th>
                <th scope="col" className="px-4 py-3 flex justify-center">
                  Ações
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
                    <td className="px-4 py-4 flex justify-center">
                      <a
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(item.id_processo_risco)}
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
      <ModalSearchRisco
        isOpen={showModal}
        onCancel={closeModal}
        children={riscos}
        onSelect={selected}
      />
    </>
  )
}

export default GridProcessoRiscos;