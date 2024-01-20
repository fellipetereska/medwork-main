import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ImportXlsx = () => {
  const [file, setFile] = useState(null);
  const [allDataArray, setAllDataArray] = useState([]);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setImportSuccess(false);
  };

  const xlsxFileToArray = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const groupedData = {};

        jsonData.forEach((item) => {
          const unidade = item['Nome Unidade'];
          const setor = item['Nome Setor'];
          const cargo = item['Nome Cargo'];
          const descricao = item['Descrição Detalhada do Cargo'];

          if (!groupedData[unidade]) {
            groupedData[unidade] = {};
          }

          if (!groupedData[unidade][setor]) {
            groupedData[unidade][setor] = [];
          }

          groupedData[unidade][setor].push({ cargo, descricao });
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
        saveAs(blob, "dados_agrupados.json");
      } catch (error) {
        console.error("Erro ao processar o arquivo:", error);
      }
    };
    reader.readAsBinaryString(file);
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      xlsxFileToArray(file);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <h3 className="font-black text-sky-700 text-5xl">Importar Dados</h3>
      </div>
      <form className="flex justify-center items-center m-10 gap-6">
        <div>
          <input type="file" id="xlsxFileInput" accept=".xlsx" onChange={handleOnChange} />
        </div>
        <div>
          <button
            className="bg-sky-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-sky-700"
            onClick={(e) => handleOnSubmit(e)}
          >
            Importar XLSX
          </button>
        </div>
      </form>
      {importSuccess && (
        <div className="text-green-600 font-semibold text-center mb-4">
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
