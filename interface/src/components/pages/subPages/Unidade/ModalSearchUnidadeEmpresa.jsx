import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';

const ModalSearchUnidadeEmpresa = ({ onCancel, isOpen, children, onContactSelect }) => {

  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10"></div>
      <div className="modal-container max-w-lg bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-800'>Selecione uma Empresa</h1>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
              onClick={onCancel}>
              <svg className="flex m-auto w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <div className='border-b border-gray-200'></div>
        <div className='flex justify-center items-center py-2'>
          <p className='text-sm text-gray-500 text-center'>
            Selecione a Empresa para qual essa unidade pertence
          </p>
        </div>
        <div className="flex justify-center w-full mt-2 mb-2">
          <div className="w-5/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
          </div>
        </div>
        <ul className='space-y-3 py-3'>
          {children
            .filter((empresa) =>
              empresa.nome_empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
              empresa.razao_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
              empresa.cnpj_empresa.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((empresa, i) => (
              <li
                key={i}
                className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                onClick={() => onContactSelect(empresa.id_empresa, empresa.nome_empresa)}
              >
                <div class="flex items-center">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-700">
                      {empresa.nome_empresa}
                    </p>
                    <p class="text-sm text-gray-500 truncate">
                      {empresa.razao_social}
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900">
                    {empresa.cnpj_empresa}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};


export default ModalSearchUnidadeEmpresa;
