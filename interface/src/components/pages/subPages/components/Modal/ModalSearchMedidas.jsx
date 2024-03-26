import React, { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';

const ModalSearchMedidas = ({ onCancel, isOpen, medidasAdm, medidasEpi, medidasEpc, onSelect }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);

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

  const handleTabClick = (index) => {
    setActiveTab(index);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <ul className='space-y-3 py-3'>
            {medidasAdm.filter((medida) =>
              medida.descricao_medida_adm.toLowerCase().includes(searchTerm.toLowerCase())
            )
              .map((item, i) => (
                <li
                  key={i}
                  className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                  onClick={() => {
                    onSelect(item.id_medida_adm, 1);
                    setActiveTab(0);
                  }}
                >
                  <div className="flex items-center text-sm font-light text-gray-500">
                    <div className="flex-1 min-w-0">
                      <div className='flex justify-between font-medium text-gray-800'>
                        <p>
                          {item.descricao_medida_adm}
                        </p>
                        <p>
                          {item.id_medida_adm}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        );
      case 2:
        return (
          <>
            <ul className='space-y-3 py-3'>
              {medidasEpi
                .filter((medida) =>
                  medida.nome_medida.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  medida.certificado_medida.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item, i) => (
                  <li
                    key={i}
                    className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                    onClick={() => {
                      onSelect(item.id_medida, 2);
                      setActiveTab(0);
                    }}
                  >
                    <div className="flex items-center text-sm font-light text-gray-500">
                      <div className="flex-1 min-w-0">
                        <div className='flex justify-between text-lg font-bold text-gray-800'>
                          <p>
                            {item.nome_medida}
                          </p>
                          <p>
                            {item.certificado_medida}
                          </p>
                        </div>
                        <div className='border-b border-gray-200 mb-2 mt-1'></div>
                        <p>
                          Fabricante: <span className='text-sm font-medium text-gray-700'>{item.fabricante_medida}</span>
                        </p>
                        <p className='text-sm text-gray-500 truncate'>
                          Vencimento C.A: <span className='text-sm font-medium text-gray-700'>{item.vencimento_certificado_medida}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        );
      case 3:
        return (
          <>
            <ul className='space-y-3 py-3'>
              {medidasEpc.filter((medida) =>
                medida.descricao_medida.toLowerCase().includes(searchTerm.toLowerCase())
              )
                .map((item, i) => (
                  <li
                    key={i}
                    className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
                    onClick={() => {
                      onSelect(item.id_medida, 3);
                      setActiveTab(0);
                    }}
                  >
                    <div className="flex items-center text-sm font-light text-gray-500">
                      <div className="flex-1 min-w-0">
                        <div className='flex justify-between font-medium text-gray-800'>
                          <p>
                            {item.descricao_medida}
                          </p>
                          <p>
                            {item.id_medida}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        );
      default:
        return null;
    }
  };

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
        <div className="flex justify-center w-full mt-2 mb-4 gap-4">
          <div className="w-5/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Risco..." />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <ul className='flex gap-4'>
            <li className='bg-sky-600 py-2 px-4 rounded-md shadow-sm hover:bg-sky-900 font-medium text-white' onClick={() => handleTabClick(1)}>
              <button>Administrativas</button>
            </li>
            <li className='bg-sky-600 py-2 px-4 rounded-md shadow-sm hover:bg-sky-900 font-medium text-white' onClick={() => handleTabClick(2)}>
              <button>EPI's</button>
            </li>
            <li className='bg-sky-600 py-2 px-4 rounded-md shadow-sm hover:bg-sky-900 font-medium text-white' onClick={() => handleTabClick(3)}>
              <button>EPC's</button>
            </li>
          </ul>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};


export default ModalSearchMedidas;
