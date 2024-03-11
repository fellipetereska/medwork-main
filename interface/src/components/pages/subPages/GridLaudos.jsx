import React from "react";
import { toast } from "react-toastify";

function GridLaudos({ children, handleCreateIframe, setPdfBlob }) {

  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            
            <th scope="col" className="px-6 py-3">
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {children && children.map((item, i) => (
            <tr
              key={i}
              className={`border-b bg-white cursor-pointer hover:bg-gray-50`}
              onClick={() => toast.info("Clicou!")}
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_pdf}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridLaudos;
