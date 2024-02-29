import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { connect } from '../../../../../services/api';

const ModalMedidasDefine = ({ onCancel, isOpen, companyName, globalSprm, medidasAdm, medidasEpi, medidasEpc, medidasDefine, setMedidasDefine }) => {

  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    if (globalSprm) {
      const initialStatus = {};
      globalSprm.forEach(item => {
        initialStatus[item.id_global_sprm] = item.status || "0";
      });
      setSelectedStatus(initialStatus);
    }
  }, [isOpen, globalSprm]);

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 1:
          const admMedidas = medidasAdm.find((i) => i.id_medida_adm === item);
          return admMedidas ? admMedidas.descricao_medida_adm : 'N/A';
        case 2:
          const epiMedidas = medidasEpi.find((i) => i.id_medida === item);
          return epiMedidas ? epiMedidas.nome_medida : 'N/A';
        case 3:
          const epcMedidas = medidasEpc.find((i) => i.id_medida === item);
          return epcMedidas ? epcMedidas.descricao_medida : 'N/A';

        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const handleAplicationChange = async (event, itemId) => {
    const selectedApply = event.target.value;
    let status = "";

    if (selectedApply === "Aplica" || selectedApply === "Não Aplica" || selectedApply === "Não Aplicavel") {
      status = selectedApply;
    }

    try {
      const response = await fetch(`${connect}/global_sprm/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao alterar status da medida. Status: ${response.status}`)
      }

      const data = await response.json();
      toast.success(`Status atualizado para ${selectedApply} com sucesso`);
    } catch (error) {
      console.error("Erro ao mudar status da medida!", error);
    }

    setSelectedStatus(prevState => ({
      ...prevState,
      [itemId]: status,
    }));
  }


  if (!isOpen || !globalSprm) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-5/6 bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-700'>Defina as medidas aplicadas pela empresa <span className='text-xl text-gray-700 font-bold'>{companyName}</span></h1>
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
        <p className='text-sm text-gray-500'>
          "Por favor, selecione as medidas que a empresa adota marcando as caixas de seleção na tabela abaixo e clique em 'Aplicar'."
        </p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex sm:justify-center mt-10 mb-8 max-w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-center">
                  ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Medida
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Tipo
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {globalSprm && globalSprm.map((item, i) => (
                <tr
                  key={i}
                  className={`border-b bg-white`}
                >
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 text-center">
                    {item.id_global_sprm}
                  </th>
                  <td className="px-4 py-4 min-w-[100px] max-w-[200px] whitespace-normal">
                    <p className='max-w-full'>
                      {find(item.fk_medida_id, item.tipo_medida)}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {item.tipo_medida}
                  </td>
                  <td className="px-4 py-4 max-w-[80px]">
                    <select
                      className="appearence-none block bg-gray-100 rounded py-3 px-4 leading-tight"
                      name="aplicacao_medida"
                      id="aplicacao_medida"
                      onChange={(event) => handleAplicationChange(event, item.id_global_sprm)}
                      value={selectedStatus[item.id_global_sprm] || "0"}
                    >
                      <option value="0">Selecione uma aplicação</option>
                      <option value="Aplica">Aplica</option>
                      <option value="Não Aplica">Não Aplica</option>
                      <option value="Não Aplica">Não Aplicavel</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end items-center'>
          <button
            onClick={medidasDefine}
            className="shadow mt-4 bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};


export default ModalMedidasDefine;
