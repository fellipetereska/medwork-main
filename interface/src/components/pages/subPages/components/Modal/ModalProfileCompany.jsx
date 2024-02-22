import React from 'react';

const ModalProfileCompany = ({ isOpen, onCancel }) => {



  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
      <div className="modal-container w-5/6 bg-white mx-auto rounded-xl z-50 overflow-y-auto max-h-[80vh]">
        <div className='w-full bg-sky-600 px-8 py-4 shadow-md grid grid-cols-3'>
          <div className='col-span-2'>
            <h2 className='text-white font-extrabold text-2xl'>Nome da Empresa</h2>
            <p className='text-white'>Razão Social - Contato</p>
          </div>
          <div className='col-span-1 text-right'>
            <h2 className='text-white font-extrabold text-2xl '>00.000.000/0000-00</h2>
          </div>
        </div>
        <div className='w-full px-8 py-4'>
          <div className='w-full grid grid-cols-3 gap-6'>
            <div className='col-span-1'>
              <ul>
                <li>
                  <div className='grid grid-cols-4 bg-gray-50 rounded-md px-4 py-2 hover:bg-gray-100 shadow-sm cursor-pointer'>
                    <div className='col-span-2'>
                      <h2 className='text-sky-600 font-extrabold text-lg truncate'>Unidade</h2>
                      <div className='border-b border-gray-200 mb-2'></div>
                      <p className='truncate text-gray-700'>Rua - 100</p>
                      <p className='truncate text-gray-600'>00000-000 - Londrina/PR</p>
                    </div>
                    <div className='col-span-2 text-right'>
                      <h2 className='text-sky-600 font-extrabold text-lg truncat'>00.000.000/0000-00</h2>
                      <div className='border-b border-gray-200 mb-2'></div>
                      <p className='font-medium text-gray-700'>Nome do Contato</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className='col-span-2 border border-gray-200 rounded-md px-4 py-2'>
              <div className='px-4 py-2'>
                <ul>
                  <li>
                    <div className='bg-gray-100 rounded-md px-4 py-2'>
                      <div>
                        <h2 className='text-sky-600 font-bold text-xl'>Nome do Setor</h2>
                        <p className='truncate font-light'>Descrição do Setor</p>
                      </div>
                      <div className='border-b border-gray-200 mb-4'></div>
                      <div className='grid grid-cols-4 gap-4'>
                        <div className='col-span-1'>
                          <p>Cargos</p>
                          <ul className='space-y-2'>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Cargo</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Cargo</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Cargo</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Cargo</li>
                          </ul>
                        </div>
                        <div className='col-span-1'>
                          <p>Processos</p>
                          <ul className='space-y-2'>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Processo</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Processo</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Processo</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Processo</li>
                          </ul>
                        </div>
                        <div className='col-span-1'>
                          <p>Riscos</p>
                          <ul className='space-y-2'>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Risco</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Risco</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Risco</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome do Risco</li>
                          </ul>
                        </div>
                        <div className='col-span-1'>
                          <p>Medidas</p>
                          <ul className='space-y-2'>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome da Medida</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome da Medida</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome da Medida</li>
                            <li className='bg-gray-50 px-4 py-2 font-bold text-sky-600 rounded-sm text-center truncate'>Nome da Medida</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};


export default ModalProfileCompany;
