import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ModalSearchConclusao = ({ onCancel, isOpen, laudo, conclusao, onSelectLtcat, onSelectLi, onSelectLp }) => {

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

  const handleSelect = (conclusao, nome) => {
    switch (laudo) {
      case 'ltcat':
        return onSelectLtcat(conclusao, nome);
      case 'insalubridade':
        return onSelectLi(conclusao, nome);
      case 'periculosidade':
        return onSelectLp(conclusao, nome);
      default:
        return "N/A";
    }
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-2/5 bg-white mx-auto rounded-lg z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <div>
            <h1 className='text-xl font-bold text-sky-800'>Selecione um conclusão</h1>
            <p className='text-sm font-light'>A conclusão ela aparece nos laudos LTCAT e LIP</p>
          </div>
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
        <div className='border-b border-gray-200 mb-4'></div>

        <ul className='space-y-3 py-3'>
          {conclusao.map((item, i) => (
            <li
              key={i}
              className="py-3 hover:bg-gray-100 hover:shadow-sm shadow-sm bg-gray-50 cursor-pointer px-4 rounded-md"
              onClick={() => handleSelect(item.conclusao, item.nome_conclusao)}
            >
              <div className="flex items-center gap-12">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-sky-800">
                    {item.nome_conclusao}
                  </p>
                  <div className='border-b border-gray-200 mt-1 mb-2'></div>
                  <p className="text-xs text-gray-500 whitespace-break-spaces">
                    {item.conclusao}
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


export default ModalSearchConclusao;
