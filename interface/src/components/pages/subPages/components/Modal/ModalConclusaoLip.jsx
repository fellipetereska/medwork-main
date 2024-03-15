import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput';

import { MdCleaningServices } from "react-icons/md";
import { BiSolidMessageAdd } from "react-icons/bi";

const ModalConclusaoLip = ({ onCancel, isOpen }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [nome, setNome] = useState('');
  const [conclusao, setConclusao] = useState('');
  const [anexo, setAnexo] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  if (!isOpen) {
    return null;
  }

  // const filteredCargos = cargos
  //   .filter((cargo) => cargo.fk_setor_id === setorId)
  //   .filter((cargo) =>
  //     cargo.nome_cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     cargo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const handleClear = () => {

  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-3/4 bg-white mx-auto rounded-lg z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <div>
            <h1 className='text-xl font-bold text-sky-800'>Conclusões do LIP</h1>
            <p className='txt-gray-600 font-light -mt-1'>Laudo de Insalubridade e Periculosidade</p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-sky-800 rounded-lg text-sm w-8 h-8"
              onClick={onCancel}>
              <svg className="flex m-auto w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <div className='border-b border-gray-200 mb-4'></div>

        <div className='w-full'>
          {/* Conclusão LTCAT */}
          <div className="px-1 py-1">
            <div className="flex gap-3">
              {/* Nome */}
              <div className={`w-full md:w-3/4`}>
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome_conclusao_lip">
                  Nome:
                </label>
                <input
                  className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  type="text"
                  id='nome_conclusao_lip'
                  name="nome_conclusao_lip"
                  placeholder="Nome da conclusão"
                />
              </div>
              {/* Anexo */}
              <div className={`w-full md:w-1/4`}>
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="anexo_conclusao_lip">
                  E-social:
                </label>
                <input
                  className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white text-gray-400`}
                  type="number"
                  id='anexo_conclusao_lip'
                  name="anexo_conclusao_lip"
                  placeholder="Anexo"
                  value={anexo}
                />
              </div>
            </div>
            {/* conclusão */}
            <div className="w-full ">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="conclusao_lip">
                Conclusão:
              </label>
              <textarea
                className="resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                type="text"
                id='conclusao_lip
'
                name="conclusao_lip"
                placeholder="Conclusão..."
              />
            </div>

            {/* Botões */}
            <div className="w-full flex justify-end gap-2">
              <div>
                <button onClick={handleClear} className="shadow bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-gray-50 font-bold py-2 px-3 rounded" type="button">
                  <MdCleaningServices />
                </button>
              </div>
              <div className="">
                <button className="shadow bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-gray-50 font-bold py-2 px-3 rounded" type="button">
                  <BiSolidMessageAdd />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};


export default ModalConclusaoLip;
