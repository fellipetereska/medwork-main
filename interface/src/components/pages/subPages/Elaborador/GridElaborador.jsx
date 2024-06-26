import React, { useState, useEffect } from "react";
import { BsFillPencilFill } from 'react-icons/bs';

function GridElaborador({ data, setOnEdit }) {

  const handleEditClick = (empresa) => () => {
    handleEdit(empresa);
  };

  const handleEdit = (empresa) => {
    setOnEdit(empresa);
  };

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
        <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Cargo
              </th>
              <th scope="col" className="px-6 py-3">
                Registro
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, i) => (
              <tr key={i} className={`border-b bg-white`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.id_elaborador}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left">
                  {item.nome_elaborador}
                </th>
                <td className="px-6 py-4">
                  {item.telefone_elaborador}
                </td>
                <td className="px-6 py-4 text-left">
                  {item.email_elaborador}
                </td>
                <td className="px-6 py-4">
                  {item.cargo_elaborador}
                </td>
                <td className="px-6 py-4">
                  {item.registro_elaborador}
                </td>
                <td className="py-4">
                  <div className='flex justify-center items-center gap-4'>
                    <a className="font-medium text-blue-400 hover:text-blue-800 cursor-pointer">
                      <BsFillPencilFill onClick={handleEditClick(item)} />
                    </a>
                    {/* <label
                      className="relative flex items-center justify-center rounded-full cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={!item.ativo}
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-amber-500 checked:bg-amber-500 checked:before:bg-amber-500 hover:before:opacity-10"
                      onChange={() => handleDesactivation(item.id_contato, item.ativo)}
                      />
                      <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </label> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GridElaborador;