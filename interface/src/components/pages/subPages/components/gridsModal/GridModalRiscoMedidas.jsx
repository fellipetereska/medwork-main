import React, { useEffect, useState } from "react";
import { connect } from '../../../../../services/api';
import { toast } from 'react-toastify';
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from 'sweetalert2';
import icon_add from '../../../../media/icon_add_link.png'
import useAuth from '../../../../../hooks/useAuth'

import ModalSearchMedidas from '../Modal/ModalSearchMedidas'

function GridModalRiscoMedidas({ childId, children }) {

  const {
    getMedidasAdm, medidasAdm,
    getMedidasEpi, medidasEpi,
    getMedidasEpc, medidasEpc,
    handleSetCompanyId, companyId
  } = useAuth(null);

  const [riscosMedidas, setRiscosMedidas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    handleSetCompanyId();
  }, [])

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

  useEffect(() => {
    fetchRiscosMedidas();
    getMedidasAdm();
    getMedidasEpi();
    getMedidasEpc();
  }, [childId, companyId])

  const findMedidas = (FkMedidaId, tipo) => {
    if (!riscosMedidas || !medidasAdm || !medidasEpi || !medidasEpc) {
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
          const adm = medidasAdm.find((c) => c.id_medida_adm === medidaId);
          return adm ? adm.descricao_medida_adm : 'N/A';

        case 2:
          const epis = medidasEpi.find((c) => c.id_medida === medidaId);
          return epis ? epis.nome_medida : 'N/A';

        case 3:
          const epcs = medidasEpc.find((c) => c.id_medida === medidaId);
          return epcs ? epcs.descricao_medida : 'N/A';

        default:
          return 'N/A';
      }
    });

    const medidasFiltradas = medidas.filter((medida) => medida && medida.trim() !== '');
    return medidasFiltradas.length > 0 ? medidasFiltradas.join(', ') : 'N/A';
  };

  const findRisco = (fkRiscoId) => {
    if (!children) {
      return 'N/A'
    }

    const riscos = children.find((c) => c.id_risco === fkRiscoId)
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

  const selected = async (item, tipo) => {
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
        const response = await fetch(`${connect}/riscos_medidas/${item}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Erro ao deletar vinculo entre medidas e riscsos. Status: ${response.status}`);
        }

        const responseData = await response.json();
        fetchRiscosMedidas();
        toast.success(responseData);
      } catch (error) {
        toast.warn("Erro ao deletar medida");
        console.error("Erro ao deletar medida do risco!", error);
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
                  Risco
                </th>
                <th scope="col" className="px-4 py-3">
                  Medida
                </th>
                <th scope="col" className="px-4 py-3">
                  Tipo
                </th>
                <th scope="col" className="px-4 py-3 flex justify-center">
                  Ações
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
                    <td className="px-4 py-4 flex justify-center">
                      <a
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(item.id_risco_medida)}
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
      <ModalSearchMedidas
        isOpen={showModal}
        onCancel={closeModal}
        medidasAdm={medidasAdm}
        medidasEpi={medidasEpi}
        medidasEpc={medidasEpc}
        onSelect={selected}
      />
    </>
  )
}

export default GridModalRiscoMedidas;