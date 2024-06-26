import React, { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import { connect } from '../../../../../services/api';

import useAuth from '../../../../../hooks/useAuth';

const ModalSearchSetor = ({ onCancel, isOpen, children, onContactSelect }) => {

  const { getUnidades, unidades } = useAuth([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    getUnidades();
  }, [])

  const findUnidade = (fkUnidadeId) => {
    if (!unidades) {
      return 'N/A';
    }

    const unidade = unidades.find((c) => c.id_unidade === fkUnidadeId);
    return unidade ? unidade.nome_unidade : 'N/A';
  }

  if (!isOpen) {
    return null;
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container md:w-4/12 bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-800'>Selecione um Setor</h1>
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
        <div className='flex justify-center items-center py-2'>
          <p className='text-sm text-gray-500 text-center'>
            Escolha o setor ao qual este cargo está associado.
          </p>
        </div>
        <div className="flex justify-center w-full mt-2 mb-2">
          <div className="w-5/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Setor..." />
          </div>
        </div>
        <ul className='space-y-3 py-3'>
          {children && children
            .filter((setor) =>
              setor.nome_setor.toLowerCase().includes(searchTerm.toLowerCase()) ||
              setor.ambiente_setor.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, i) => (
              <li
                key={i}
                className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                onClick={() => onContactSelect(item.id_setor, item.nome_setor)}
              >
                <div className='grid grid-cols-3'>
                  <div className="col-span-2">
                    <p className="text-base font-bold text-gray-800">
                      {item.nome_setor}
                    </p>
                    <div className='border-gray-200 border-b w-1/2 mb-2'></div>
                    <p className="text-sm font-light text-gray-500 truncate">
                      Descrição: <span className='text-gray-700 font-normal'>{item.ambiente_setor}</span>
                    </p>
                  </div>
                  <div className=''>
                    <p className='text-xs text-gray-500 truncate'>Unidade:</p>
                    <p className='text-base font-bold text-gray-700'>
                      {findUnidade(item.fk_unidade_id)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};


export default ModalSearchSetor;
