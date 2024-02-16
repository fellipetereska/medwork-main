import { BsFillPencilFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

function GridUsuarios({ usuario, setOnEdit }) {

  const handleEdit = (user) => {
    setOnEdit(user);
  };

  const filterTipo = (item) => {
    try{
      switch (item) {
        case 0:
          return "Sem Permissão";
        case 1:
          return "Administrador";
        case 2:
          return "Técnico"
        default:
          return "N/A"
      }
    }catch(error){
      toast.warn("Erro ao filtrar Permissões do Usuário")
      console.log("Erro ao filtrar tipo", error)
    }
  }

  return (
    <div className="flex justify-center mb-20">
      <table className="w-5/6 shadow-md text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              CPF
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Permissão
            </th>
            <th scope="col" className="flex justify-center px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {usuario && usuario.map((item, i) => (
            <tr key={i} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                {item.id_usuario}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap truncate">
                {item.nome_usuario}
              </th>
              <td className="px-6 py-4">
                {item.cpf_usuario}
              </td>
              <td className="px-6 py-4 truncate">
                {item.email}
              </td>
              <td className="px-6 py-4 text-center">
                {filterTipo(item.tipo)}
              </td>
              <td className="py-4 flex justify-center">
                <a className="font-medium text-blue-600 hover:text-blue-800">
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

export default GridUsuarios;
