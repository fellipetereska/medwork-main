import React, { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import useAuth from '../../../../../hooks/useAuth';

const ModalSearchSetor = ({ onCancel, isOpen, children, onContactSelect }) => {

  const { contatos, getContatos } = useAuth(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getContatos();
  }, []);

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


  const findContato = (fkContatoId) => {
    const contacts = contatos.find((i) => i.id_contato === fkContatoId);
    return contacts ? contacts.nome_contato : 'N/A'
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container md:w-4/12 bg-white mx-auto rounded-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-800'>Selecione uma Unidade</h1>
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
            Selecione a Unidade de qual esse setor faz parte
          </p>
        </div>
        <div className="flex justify-center w-full mt-4 MB-4">
          <div className="w-5/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Unidade..." />
          </div>
        </div>
        <ul className='space-y-3 py-3'>
          {children && children
            .filter((unidade) =>
              unidade.nome_unidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
              unidade.cnpj_unidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
              unidade.cidade_unidade.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((unidade, i) => (
              <li
                key={i}
                className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                onClick={() => onContactSelect(unidade.id_unidade, unidade.nome_unidade)}
              >
                <div className="flex items-center text-sm font-light text-gray-500">
                  <div className="flex-1 min-w-0">
                    <div className='flex justify-between text-lg font-bold text-gray-800'>
                      <p>
                        {unidade.nome_unidade}
                      </p>
                      <p>
                        {unidade.cnpj_unidade}
                      </p>
                    </div>
                    <div className='border-b border-gray-200 mb-2 mt-1'></div>
                    <div className='grid grid-cols-12 mt-2 justify-between'>
                      <div className='col-span-7'>
                        <p>
                          <span className='text-sm font-normal text-gray-700'>{unidade.endereco_unidade}, {unidade.numero_unidade}</span>
                        </p>
                        <p className='text-sm text-gray-500 truncate'>
                          <span className='text-sm font-normal text-gray-700'>{unidade.cep_unidade} - {unidade.cidade_unidade}/{unidade.uf_unidade}</span>
                        </p>
                      </div>
                      <div className='col-span-5'>
                        <p className='text-sm text-gray-500'>
                          Contato:
                        </p>
                        <div>
                          <p className='text-base font-medium text-gray-800'>{findContato(unidade.fk_contato_id)}</p>
                        </div>
                      </div>
                    </div>
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
