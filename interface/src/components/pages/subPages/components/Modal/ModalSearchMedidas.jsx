import React, { useState } from 'react';
import SearchInput from '../SearchInput';

const ModalSearchMedidas = ({ onCancel, isOpen, children, onSelect }) => {

  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-4/12 max-w-lg bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-800'>Selecione uma Medida de Proteção</h1>
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
            Selecione um medida de proteção para vincular
          </p>
        </div>
        <div className="flex justify-center w-full mt-2 mb-2">
          <div className="w-5/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Risco..." />
          </div>
        </div>
        <ul className='space-y-3 py-3'>
          {children
            .filter((medida) =>
              medida.nome_medida.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, i) => (
              <li
                key={i}
                className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                onClick={() => onSelect(item.id_medida)}
              >
                <div className="flex items-center text-sm font-light text-gray-500">
                  <div className="flex-1 min-w-0">
                    <div className='flex justify-between text-lg font-bold text-gray-800'>
                      <p>
                        {item.nome_medida}
                      </p>
                      <p>
                        {item.id_medida}
                      </p>
                    </div>
                    <div className='border-b border-gray-200 mb-2 mt-1'></div>
                    <p>
                      Descrição: <span className='text-sm font-medium text-gray-700'>{item.descricao}</span>
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


export default ModalSearchMedidas;
