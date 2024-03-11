import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa6";
import { MdNoteAdd } from "react-icons/md";

function GridLaudos({ children, companyId, empresas, handleGenerate, pdf }) {

  const [grid, setGrid] = useState(true);
  const [pdfComponents, setPdfComponents] = useState([]);

  const formatData = (item) => {
    const data_formatada = new Date(item).toLocaleDateString('pr-BR');
    return data_formatada;
  }

  const find = (item) => {
    const filterCompany = empresas.find((i) => i.id_empresa === item);
    return filterCompany ? filterCompany.nome_empresa : 'N/A';
  }

  const handleGeneratePdf = (empresas, contatos, usuarios, setores, cargos, inventarios, planos, unidades, data, versao, rowIndex) => {
    if (pdf) {
      return
    }

    try {
      const companys = JSON.parse(empresas);
      const contacts = JSON.parse(contatos);
      const users = JSON.parse(usuarios);
      const sectors = JSON.parse(setores);
      const departaments = JSON.parse(cargos);
      const inventario = JSON.parse(inventarios);
      const plano = JSON.parse(planos);
      const units = JSON.parse(unidades);

      handleGenerate(companys, contacts, users, sectors, departaments, inventario, plano, units, data, grid, versao);
      setPdfComponents(prevState => {
        const newState = [...prevState];
        newState[rowIndex] = true;
        return newState;
      });
    } catch (error) {
      console.error("Erro ao gerar versao do PDF", error)
    }
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Versão
            </th>
            <th scope="col" className="px-6 py-3">
              Empresa
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Data
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Dowmload
            </th>
          </tr>
        </thead>
        <tbody>
          {children && children
            .filter((i) => i.fk_empresa_id === companyId)
            .sort((a, b) => b.id_versao - a.id_versao)
            .map((item, i) => (
              <tr
                key={i}
                className={`border-b bg-white`}
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                  {item.id_versao}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                  {item.versao}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {find(item.fk_empresa_id)}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                  {formatData(item.data)}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                  <div
                    className="flex justify-center items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleGeneratePdf(item.empresas, item.contatos, item.usuarios, item.setores, item.cargos, item.inventarios, item.planos, item.unidades, item.data, item.versao, i)}
                  >
                    {pdf && pdfComponents[i] ? (
                      pdf
                    ) : (
                      <MdNoteAdd />
                    )}
                  </div>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridLaudos;
