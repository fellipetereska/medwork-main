import React, { useEffect, useState } from 'react';
import { connect } from '../../../../../services/api';
import { IoAddCircle } from "react-icons/io5";
import { toast } from 'react-toastify';

import ModalSearchMedidas from './ModalSearchMedidas'

const ModalRiscoMedidas = ({ onCancel, isOpen, childName, childId, children }) => {

  const [riscosMedidas, setRiscosMedidas] = useState([]);
  const [medida, setMedida] = useState([]);
  const [medidaEpi, setMedidaEpi] = useState([]);
  const [medidaEpc, setMedidaEpc] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tipo, setTipo] = useState(null);

  const fetchRiscosMedidas = async () => {
    try {
      const response = await fetch(`${connect}/riscos_medidas`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar processos e riscos e medidas. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setRiscosMedidas(responseData);
    } catch (error) {
      console.log("Erro ao buscar riscos e medidas!", error);
    }
  }

  const fetchMedidasAdm = async () => {
    try {
      const response = await fetch(`${connect}/medidas_adm`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar medidas. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setMedida(responseData);
    } catch (error) {
      console.log("Erro ao buscar medidas!", error)
    }
  }

  const fetchMedidasEpi = async () => {
    try {
      const response = await fetch(`${connect}/medidas_epi`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar medidas. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setMedidaEpi(responseData);
    } catch (error) {
      console.log("Erro ao buscar medidas!", error)
    }
  }

  const fetchMedidasEpc = async () => {
    try {
      const response = await fetch(`${connect}/medidas_epc`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar medidas. Status: ${response.status}`)
      }

      const responseData = await response.json();
      setMedidaEpc(responseData);
    } catch (error) {
      console.log("Erro ao buscar medidas!", error)
    }
  }

  useEffect(() => {
    fetchMedidasAdm();
    fetchMedidasEpi();
    fetchMedidasEpc();
    fetchRiscosMedidas();
  }, [childId])


  if (!isOpen) {
    return null;
  }

  const findMedidas = (FkMedidaId, tipo) => {
    if (!riscosMedidas || !medida || !medidaEpi || !medidaEpc) {
      return 'N/A';
    }

    const filteredRiscosMedidas = riscosMedidas.filter((item) => item.fk_medida_id === FkMedidaId && item.tipo === tipo);

    if (!filteredRiscosMedidas.length) {
      return 'N/A';
    }

    const medidasIds = filteredRiscosMedidas.map((riscoMedidaItem) => riscoMedidaItem.fk_medida_id);

    // Remova IDs de medidas duplicados
    const medidasIdsUnicas = Array.from(new Set(medidasIds));

    const medidas = medidasIdsUnicas.map((medidaId) => {
      switch (tipo) {
        case 1:
          const medidaAdm = medida.find((c) => c.id_medida_adm === medidaId);
          return medidaAdm ? medidaAdm.descricao_medida_adm : 'N/A';

        case 2:
          const epis = medidaEpi.find((c) => c.id_medida === medidaId);
          return epis ? epis.nome_medida : 'N/A';

        case 3:
          const epcs = medidaEpc.find((c) => c.id_medida === medidaId);
          return epcs ? epcs.descricao_medida : 'N/A';

        default:
          return 'N/A';
      }
    });

    const medidasFiltradas = medidas.filter((medida) => medida && medida.trim() !== '');
    return medidasFiltradas.length > 0 ? medidasFiltradas.join(', ') : 'N/A';
  };


  const findRisco = (FkRiscoId) => {
    if (!children) {
      return 'N/A'
    }

    const riscos = children.find((c) => c.id_risco === FkRiscoId)
    return riscos ? riscos.nome_risco : 'N/A'
  }

  const findTipo = (tipo) => {
    if (!tipo) {
      return 'N/A'
    }

    switch (tipo) {
      case 1:
        return 'Medida Administrativa'
      case 2:
        return 'EPI'
      case 3:
        return 'EPC'
    }
  }

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  const selectedSetor = async (item, tipo) => {
    try {
      // Verifica se já existe um vínculo do mesmo tipo
      const existingLink = riscosMedidas.find(link => link.fk_risco_id === childId && link.fk_medida_id === item && link.tipo === tipo);

      if (existingLink) {
        toast.warn(`Já existe uma medida do tipo ${tipo} vinculada a este risco.`);
        return;
      }

      const response = await fetch(`${connect}/riscos_medidas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          fk_risco_id: childId,
          fk_medida_id: item,
          tipo: tipo,
        }])
      });

      if (!response.ok) {
        throw new Error(`Erro ao vincular medida de proteção ao risco. Status: ${response.status}`);
      }

      const responseData = await response.json();

      closeModal();
      fetchRiscosMedidas();
      toast.success(responseData);
    } catch (error) {
      console.log("Erro ao vincular medida de proteção ao risco", error);
      toast.warn("Erro ao vincular medida de proteção");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-5/6 bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-700'>Adicione Medidas de Proteação ao risco: <span className='text-xl text-gray-700 font-bold'>{childName}</span></h1>
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
            Adicione a medida de proteção
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
                  Risco
                </th>
                <th scope="col" className="px-4 py-3">
                  Medida de Proteção
                </th>
                <th scope="col" className="px-4 py-3">
                  Tipo
                </th>
              </tr>
            </thead>
            <tbody>
              {riscosMedidas.filter((item) => item.fk_risco_id === childId)
                .map((item, i) => (
                  <tr
                    key={i}
                    className={`border-b bg-white`}
                  >
                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.id_risco_medida}
                    </th>
                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {findRisco(item.fk_risco_id)}
                    </th>
                    <td className="px-4 py-4">
                      {findMedidas(item.fk_medida_id, item.tipo)}
                    </td>
                    <td className="px-4 py-4">
                      {findTipo(item.tipo)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalSearchMedidas
        isOpen={showModal}
        onCancel={closeModal}
        medidasAdm={medida}
        medidasEpi={medidaEpi}
        medidasEpc={medidaEpc}
        onSelect={selectedSetor}
      />
    </div>
  );
};


export default ModalRiscoMedidas;
