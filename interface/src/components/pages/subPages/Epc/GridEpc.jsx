import { BsFillPencilFill } from 'react-icons/bs';

function GridCadastroEpi({ children, setEpi, setOnEdit, find }) {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
      <table className="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              ID
            </th>
            <th scope="col" className="px-4 py-3">
              Medidas de Proteção Coletivas
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {children.map((item, i) => (
            <tr key={i} className={`border-b bg-white`}>
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_medida}
              </th>
              <td scope="row" className="px-4 py-4">
                {item.descricao_medida}
              </td>
              <td className="flex justify-center px-5 py-4 gap-4">
                <a className=" font-medium text-blue-400 hover:text-blue-800 cursor-pointer">
                  <BsFillPencilFill onClick={() => handleEdit(item)} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridCadastroEpi;
