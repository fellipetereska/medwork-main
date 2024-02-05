import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput';

const ModalCargo = ({ onCancel, isOpen, setorId, onContactSelect, cargos }) => {

  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCargos = cargos
    .filter((cargo) => cargo.fk_setor_id === setorId)
    .filter((cargo) =>
      cargo.nome_cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cargo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container max-w-lg bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-800'>Selecione um Cargo</h1>
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
            Selecione um Cargo para o processo
          </p>
        </div>
        <div className="flex justify-center w-full mt-4 mb-4">
          <div className="w-5/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Cargo..." />
          </div>
        </div>
        {setorId && filteredCargos.length > 0 ? (
          <ul className='space-y-3 py-3'>
            {filteredCargos
              .map((cargo, i) => (
                <li
                  key={i}
                  className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                  onClick={() => onContactSelect(cargo.id_cargo, cargo.nome_cargo)}
                >
                  <div className="flex items-center gap-12">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700">
                        {cargo.nome_cargo}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {cargo.descricao}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <div className='m-8 flex flex-wrap justify-center gap-2'>
            <p className="text-sm text-gray-500 text-center">
              Nenhum cargo vinculado a este setor.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Voltar para cadastro de Setor e vincular um cargo a esse Setor</p>


            <Link to={{ pathname: "/cadastro_setor", state: { setId: setorId } }}>
              <button
                className='bg-sky-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-sky-700 hover:shadow-sm'
              >
                Vincular Setor
              </button>
            </Link>


          </div>
        )}

      </div>
    </div>
  );
};


export default ModalCargo;
