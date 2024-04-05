import React, { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';

const ModalSearchElaborador = ({ isOpen, onCancel, children, onSelect }) => {

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const findRegisterName = (item) => {
    try {
      switch (item) {
        case 'Engenheiro':
          return 'CREA'
        case 'Médico':
          return 'CRM'
        case 'Técnico':
          return 'Registro'
        default:
          break;
      }
    } catch (error) {
      console.error(`Erro ao filtrar registro ${error}`)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-4/12 bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-800'>Selecione um Elaborador</h1>
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
            Quem elaborou o laudo técnico?
          </p>
        </div>
        <div className="flex justify-center w-full mt-2 mb-2">
          <div className="w-5/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Elaborador..." />
          </div>
        </div>
        <ul className='space-y-3 py-3'>
          {children && children
            .filter((item) =>
              item.nome_elaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.cpf_elaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.cargo_elaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.registro_elaborador.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, i) => (
              <li
                key={i}
                className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                onClick={() => onSelect(item.id_elaborador, item.nome_elaborador)}
              >
                <div className='grid grid-cols-2'>
                  <div>
                    <h1 className='text-gray-800 font-bold'>{item.nome_elaborador}</h1>
                  </div>
                  <div className='flex justify-end gap-2 items-center'>
                    <p className='text-xs text-gray-500 hidden md:block'>{findRegisterName(item.cargo_elaborador)}:</p>
                    <h1 className='text-gray-800 font-bold text-right'>{item.registro_elaborador}</h1>
                  </div>
                </div>
                <div className='border-b border-gray-200'></div>
                <div className='mt-1'>
                  <div className='flex space-x-1 items-center'>
                    <p className='text-sm font-light text-gray-500'>Cargo:</p>
                    <p className='text-gray-800 text-sm font-medium'>{item.cargo_elaborador}</p>
                  </div>
                  <div className='flex space-x-1 items-center'>
                    <p className='text-sm font-light text-gray-500'>Telefone:</p>
                    <p className='text-gray-800 text-sm font-semibold'>{item.telefone_elaborador}</p>
                  </div>
                  <div className='flex space-x-1 items-center'>
                    <p className='text-sm font-light text-gray-500'>Email:</p>
                    <p className='text-gray-800 text-sm font-semibold'>{item.email_elaborador}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};


export default ModalSearchElaborador;
