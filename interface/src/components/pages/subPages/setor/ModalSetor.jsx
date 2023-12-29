import React, { useState, useEffect } from 'react';
import FrmCadastroSetor from "./frmCadastroSetor";

const ModalSetor = ({ isOpen, onCancel, onEdit, setOnEdit, getSetor, unidades }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-full fixed bottom-0 bg-white mx-auto rounded-t-xl z-50 overflow-y-auto px-8 py-4 max-h-[80vh]">
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold text-sky-800'>Cadastro Setor</h1>
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
        <div className='py-2'>
          <p className='text-sm text-gray-500'>
            Formulário para cadastro de Setor
          </p>
        </div>
        <FrmCadastroSetor 
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getSetor={getSetor}
          unidades={unidades}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};


export default ModalSetor;
