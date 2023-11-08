import { BsFillTrash3Fill, BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';

function GridCadastroContato({ contato, setContato, setOnEdit }) {
  
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    console.log(id)
    await axios
    .delete(`http://localhost:8800/contato/${id}`)
    .then(({data}) => {
        const newArray = contato.filter((item) => item.id !== id);

        setContato(newArray);
        toast.success(data);
    })
    .catch(({data}) => toast.error(data))
    console.log(id)

    setOnEdit(null);
}

  return (
    <div className="flex justify-center mb-20">
      <table className="w-5/6 shadow-md text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
              Email Secundario
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {contato.map((item, i) => (
            <tr key={i} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_contato}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.nome_contato}
              </th>
              <td className="px-6 py-4">
                {item.telefone_contato}
              </td>
              <td className="px-6 py-4">
                {item.email_contato}
              </td>
              <td className="px-6 py-4">
                {item.email_secundario_contato}
              </td>
              {/* <td className="px-5 py-4 gap-4 flex justify-start">
                <a className="font-medium text-blue-600 hover:text-blue-800" onClick={() => handleEdit(item)}>
                  <BsFillPencilFill />
                </a>
                <a className="font-medium text-red-600 hover:text-red-800" onClick={() => handleDelete(item.id)}>
                  <BsFillTrash3Fill />
                </a>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridCadastroContato;
