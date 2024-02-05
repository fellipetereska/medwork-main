import React, { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';

const ModalSearchUnidadeEmpresa = ({ onCancel, isOpen, children, onSetorSelect, setorName }) => {

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container max-w-lg bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-800'>Selecione um Processo</h1>
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
            Selecione o processo para vincular ao setor <span className='font-semibold text-sky-700'>{setorName}</span>
          </p>
        </div>
        <div className="flex justify-center w-full mt-2 mb-2">
          <div className="w-5/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
          </div>
        </div>
        <ul className='space-y-3 py-3'>
          {children
            .filter((child) =>
              child.nome_processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
              child.descricao.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((child, i) => (
              <li
                key={i}
                className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                onClick={() => onSetorSelect(child.id_processo, child.nome_processo)}
              >
                <div className="flex items-center gap-12">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700">
                      {child.nome_processo}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {child.descricao}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    {child.id_processo}
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
