import { BsFillPencilFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';


function GridUsuarios({ usuario, setOnEdit }) {

  //Instanciando o id da Empresa
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setUsuarios(usuario);
  }, []);

  const handleEdit = (user) => {
    setOnEdit(user);
  };

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
              CPF
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo
            </th>
            <th scope="col" className="flex justify-center px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios && usuarios.map((item, i) => (
            <tr key={i} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.id_usuario}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.nome_usuario}
              </th>
              <td className="px-6 py-4">
                {item.cpf_usuario}
              </td>
              <td className="px-6 py-4">
                {item.email_usuario}
              </td>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.permissao_usuario}
              </th>
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
