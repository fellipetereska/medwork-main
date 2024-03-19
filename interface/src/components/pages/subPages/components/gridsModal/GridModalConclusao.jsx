import React, { useEffect, useState } from "react";

import { BsFillPencilFill } from 'react-icons/bs';
import { GiClick } from "react-icons/gi";

function GridModalConclusao({ childId, conclusoes, setOnEdit, onSelect, invent }) {

  const find = (item) => {
    switch (item) {
      case 'ltcat':
        return 'Laudo Técnico das Condições do Ambiente de Trabalho'
      case 'lip':
        return 'Laudo de Insalubridade e Periculosidade'
      case 'Ambos':
        return 'Laudo Técnico das Condições do Ambiente de Trabalho - Laudo de Insalubridade e Periculosidade'
      default:
        return 'N/A'
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
        <table className="w-full shadow-md text-sm m-2 text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">
                ID
              </th>
              <th scope="col" className="px-4 py-3">
                Nome
              </th>
              <th scope="col" className="px-4 py-3">
                Conclusão
              </th>
              <th scope="col" className="px-4 py-3">
                Laudo
              </th>
              <th scope="col" className="px-4 py-3 flex justify-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {conclusoes.filter((item) => item.fk_risco_id === childId)
              .map((item, i) => (
                <tr
                  key={i}
                  className={`border-b bg-white`}
                >
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.id_conclusao}
                  </th>
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.nome_conclusao}
                  </th>
                  <td className="px-4 py-4">
                    {item.conclusao}
                  </td>
                  <td className="px-4 py-4">
                    {find(item.laudo)}
                  </td>
                  <td className="px-4 py-4 flex justify-center gap-3">
                    <a className="font-medium text-blue-400 hover:text-blue-800 cursor-pointer">
                      <BsFillPencilFill onClick={() => setOnEdit(item)} />
                    </a>
                    {invent && (
                      <a className="font-medium text-green-600 hover:text-green-800 cursor-pointer">
                        <GiClick onClick={() => onSelect(item)} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default GridModalConclusao;