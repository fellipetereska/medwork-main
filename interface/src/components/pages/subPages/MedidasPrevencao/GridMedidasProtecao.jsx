//Importando ferramentas
import { BsFillPencilFill } from 'react-icons/bs'; //Icone de Edição

function GridCadastroEmpresa({ children, set, setOnEdit }) {

  const handleEditClick = (empresa) => () => {
    handleEdit(empresa);
  };

  //Função para editar Item
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
              Medida de Proteção
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {children && children.map((item, i) => (
            <tr
              key={i}
              className={`border-b bg-white`}
            >
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_medida_adm}
              </th>
              <td className="px-4 py-4">
                {item.descricao_medida}
              </td>
              <td className="py-4 gap-4">
                <a className="flex justify-center font-medium text-blue-400 hover:text-blue-800">
                  <BsFillPencilFill onClick={handleEditClick(item)} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridCadastroEmpresa;
