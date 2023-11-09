import { BsFillTrash3Fill, BsFillPencilFill, BsBoxArrowDown } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function GridUsuarios({ usuario, setOnEdit, handleEditModalOpen }) {

    //Instanciando o id da Empresa
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
          try {
            const response = await axios.get('http://localhost:8800/usuarios');
            setUsuarios(response.data);
          } catch (error) {
            console.error('Erro ao buscar usuários:', error);
          }
        };
    
        fetchUsuarios();
      }, []);

    // const handleDelete = async (id) => {
    //     await axios
    //         .delete(`http://localhost:8800/empresa/${id}`)
    //         .then(({ data }) => {
    //             const newArray = empresa.filter((item) => item.id_empresa !== id);

    //             setEmpresa(newArray);
    //             toast.success(data);
    //         })
    //         .catch(({ data }) => toast.error(data));
    //     console.log(id);

    //     setOnEdit(null);
    // }

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
                    {usuarios.map((item, i) => (
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
                                {/* <a className="font-medium text-red-600 hover:text-red-800">
                                    <BsFillTrash3Fill onClick={() => handleDelete(item.id_empresa)} />
                                </a> */}
                                {/* <a className="font-medium text-blue-600 hover:text-blue-800">
                                    <Link to="/cadastros">
                                        <BsBoxArrowDown onClick={() => handleOpenCompany(item.id_empresa)} />
                                    </Link>
                                </a> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GridUsuarios;
