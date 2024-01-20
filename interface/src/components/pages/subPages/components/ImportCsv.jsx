import React, { useState } from "react";

function ImportCsv() {

  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnCHange = (e) => {
    setFile(e.target.files[0])
  }

  const csvFileToArray = (string) => {
    const csvRows = string.split("\n");

    if (csvRows.length < 2) {
      // Não há dados suficientes para processar
      return;
    }

    // Assume que a primeira linha contém o cabeçalho
    const csvHeader = csvRows[0].split(";");
    const cleanedHeader = csvHeader.map(header => header.replace(/^"|"$/g, ''));

    const columnData = Object.fromEntries(cleanedHeader.map((header) => [header, []]));

    for (let i = 1; i < csvRows.length; i++) {
      const values = csvRows[i].split(";");
      for (let j = 0; j < cleanedHeader.length && j < values.length; j++) {
        const value = values[j] ? values[j].replace(/^"|"$/g, '') : '';
        columnData[cleanedHeader[j]].push(value);
      }
    }

    const newArray = columnData[cleanedHeader[0]].map((_, index) =>
      cleanedHeader.reduce((obj, header) => {
        const value = columnData[header][index] ? columnData[header][index] : '';
        obj[header] = value;
        return obj;
      }, {})
    );

    setArray(newArray);
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        // Adicione 'UTF-8' como segundo argumento para garantir a codificação correta
        csvFileToArray(text);
      };

      // Adicione 'UTF-8' como segundo argumento para garantir a codificação correta
      fileReader.readAsText(file, 'UTF-8');
    }
  }

  return (
    <>
      <div className="flex justify-center mt-10">
        <h3 className="font-black text-sky-700 text-5xl">Importar Dados</h3>
      </div>
      <form className="flex justify-center items-center m-32 gap-6">
        <div>
          <input type="file" id="csvFileInput" accept=".csv" onChange={handleOnCHange} />
        </div>
        <div>
          <button
            className="bg-sky-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-sky-700"
            onClick={(e) => handleOnSubmit(e)}
          >
            Import CSV
          </button>
        </div>
      </form>
      <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
        {array && array.length > 0 && (
          <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {Object.keys(array[0]).map((header) => (
                  <th scope="col" className="px-6 py-3" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {array.map((item, index) => (
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
}

export default ImportCsv;