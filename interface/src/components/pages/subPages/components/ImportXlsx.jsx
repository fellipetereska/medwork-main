import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ImportXlsx = () => {
  const [file, setFile] = useState(null);
  const [allDataArray, setAllDataArray] = useState([]);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleOnChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      xlsxFileToArray(selectedFile);
    }

    setImportSuccess(false);
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  };

  const xlsxFileToArray = async (file) => {
    try {
      const data = await readFileAsync(file);
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const groupedData = {};

      jsonData.forEach((item) => {
        const unidade = item['Nome Unidade'];
        const cnpj = item['CNPJ Unidade'];
        const cep = item['Cep Unidade'];
        const numero = item['Nº endereço Unidade']
        const setor = item['Nome Setor'];
        const cargo = item['Nome Cargo'];
        const descricao = item['Descrição Detalhada do Cargo'];
        const sexo = item['Sexo'];

        if (!groupedData[unidade]) {
          groupedData[unidade] = {
            CNPJ: cnpj,
            CEP: cep,
            Numero: numero,
            Setores: {}
          };
        }

        if (!groupedData[unidade].Setores[setor]) {
          groupedData[unidade].Setores[setor] = {};
        }

        if (!groupedData[unidade].Setores[setor][cargo]) {
          groupedData[unidade].Setores[setor][cargo] = {
            Descricao: descricao,
            Sexos: { M: 0, F: 0 }
          };
        }

        // Atualiza a descrição se houver outra linha com o mesmo cargo
        if (groupedData[unidade].Setores[setor][cargo].Descricao !== descricao) {
          groupedData[unidade].Setores[setor][cargo].Descricao += `\n${descricao}`;
        }

        // Conta os sexos
        if (sexo === 'M') {
          groupedData[unidade].Setores[setor][cargo].Sexos.M += 1;
        } else if (sexo === 'F') {
          groupedData[unidade].Setores[setor][cargo].Sexos.F += 1;
        }
      });

      setAllDataArray(jsonData);
      setImportSuccess(true);

      // Log no console dos dados agrupados por unidade e setor
      console.log("Dados Agrupados por Unidade e Setor:");
      console.log(groupedData);

      // Cria um Blob com os dados JSON
      const jsonString = JSON.stringify(groupedData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });

      // Salva o Blob como um arquivo
      saveAs(blob, "dados.json");
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <h3 className="font-black text-sky-700 text-5xl">Importar Dados</h3>
      </div>
      <div className="flex items-center justify-center w-2/3 mx-auto mt-10">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Selecione um arquivo</span> ou arraste e solte</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Apenas XLSX</p>
          </div>
          <input id="dropzone-file" type="file" accept=".xlsx" className="hidden" onChange={handleOnChange} />
        </label>
      </div>
      {importSuccess && (
        <div className="text-green-600 font-semibold text-center mb-4 mt-2">
          Dados importados com sucesso!
        </div>
      )}
      <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
        {allDataArray && allDataArray.length > 0 && (
          <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {Object.keys(allDataArray[0]).map((header) => (
                  <th scope="col" className="px-6 py-3" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allDataArray.map((item, index) => (
                <tr className="border-b" key={index}>
                  {Object.values(item).map((value, subIndex) => (
                    <td
                      scope="row"
                      className="px-6 py-4 text-gray-700 whitespace-pre-line"
                      key={subIndex}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ImportXlsx;