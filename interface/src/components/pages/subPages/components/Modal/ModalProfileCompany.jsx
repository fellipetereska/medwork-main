import React, { useEffect, useState } from 'react';

import { IoCloseOutline } from "react-icons/io5";

const ModalProfileCompany = ({
  isOpen, onCancel,
  companyName,
  razaoSocial, cnpj,
  contato, email,
  unidades, contatoUnidade,
  setores,
}) => {

  const [showSetores, setShowSetores] = useState(false);
  const [showSetorData, setShowSetorData] = useState({});

  useEffect(() => {
    setShowSetores(false);
  }, [isOpen])

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10" onClick={onCancel}></div>
        <div className="modal-container w-5/6 bg-white mx-auto rounded-xl z-50 overflow-y-auto max-h-[80vh]">
          <div className='w-full bg-sky-600 shadow-md px-4 py-4'>
            <div className='flex justify-end'>
              <IoCloseOutline className='text-white scale-150 rounded-md hover:bg-gray-50 hover:text-sky-600 cursor-pointer' onClick={onCancel} />
            </div>
            <div className='px-4 mt-2 grid grid-cols-3'>
              <div className='col-span-2'>
                <h2 className='text-white font-extrabold text-2xl'>{companyName}</h2>
                <p className='text-white'>{razaoSocial} </p>
                <p className='text-white'>Contato:</p>
                <div className='bg-white w-1/3 rounded-sm px-2 py-1 text-center grid grid-cols-2 justify-center items-center gap-2'>
                  <p className='text-sky-600 font-semibold truncate text-right'>{contato}</p>
                  <p className='text-sm text-gray-700 font-light truncate text-left'>- {email}</p>
                </div>
              </div>
              <div className='col-span-1 text-right'>
                <h2 className='text-white font-extrabold text-2xl '>{cnpj}</h2>
              </div>
            </div>
          </div>
          <div className='w-full px-8 py-4'>
            <div className='w-full grid grid-cols-3 gap-6'>

              {/* Unidades */}
              <div className='col-span-1'>
                <ul className='space-y-4'>
                  {unidades.map((item) => (
                    <li key={item.id_unidade} onClick={() => setShowSetores(!showSetores)}>
                      <div className='bg-gray-50 rounded-md px-4 py-2 hover:bg-gray-100 shadow-sm cursor-pointer'>
                        <div className='grid grid-cols-2 '>
                          <div className='col-span-1'>
                            <h2 className='text-sky-600 font-extrabold text-lg truncate'>{item.nome_unidade}</h2>
                          </div>
                          <div className='col-span-1 text-right'>
                            <h2 className='text-sky-600 font-extrabold text-lg truncate'>{item.cnpj_unidade}</h2>
                          </div>
                        </div>
                        <div className='border-b border-gray-200 mb-2'></div>
                        <p className='truncate text-gray-700'>{item.endereco_unidade}</p>
                        <p className='truncate text-gray-600'>{item.cep_unidade} - {item.cidade_unidade}/{item.uf_unidade}</p>
                        <p className='truncate text-gray-600 text-sm'>Contato: <span className='text-base font-bold text-gray-800'>{contatoUnidade}</span></p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Setores */}
              <div className='col-span-2 rounded-md px-4 py-2'>
                <div className='px-4 py-2'>
                  {showSetores ? (
                    <ul className='space-y-2'>
                      {setores.map((item) => (
                        <li key={item.id_setor} onClick={() => setShowSetorData(prevState => ({ ...prevState, [item.id_setor]: !prevState[item.id_setor] }))}>
                          <div className='bg-gray-100 rounded-md px-4 py-2'>
                            <div>
                              <h2 className='text-sky-600 font-bold text-xl'>{item.nome_setor}</h2>
                              <p className='truncate font-light'>{item.ambiente_setor}</p>
                            </div>
                            {showSetorData[item.id_setor] ? (
                              <>
                                <div>
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
                              </>
                            ) : (null)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (null)}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ModalProfileCompany;
