import { BsFillTrash3Fill, BsFillPencilFill, BsBoxArrowDown } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';

function GridCadastroEmpresa({ empresa, setEmpresa, setOnEdit, handleEditModalOpen }) {

    const handleEdit = (empresa) => {
        setOnEdit(empresa);
        handleEditModalOpen();
    };

    const handleDelete = async (id) => {
        await axios
            .delete(`http://localhost:8800/empresa/${id}`)
            .then(({ data }) => {
                const newArray = empresa.filter((item) => item.id_empresa !== id);

                setEmpresa(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));
        console.log(id);

        setOnEdit(null);
    }

    return (
        <div className="flex justify-center mb-20">
            <table className="w-5/6 shadow-md text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Empresa
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CNPJ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Endereco
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contato
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telefone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {empresa.map((item, i) => (
                        <tr key={i} className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.nome_empresa}
                            </th>
                            <td className="px-6 py-4">
                                {item.cnpj}
                            </td>
                            <td className="px-6 py-4">
                                {item.endereco}
                            </td>
                            <td className="px-6 py-4">
                                {item.contato}
                            </td>
                            <td className="px-6 py-4">
                                {item.telefone}
                            </td>
                            <td className="px-5 py-4 gap-4 flex justify-start">
                                <a className="font-medium text-red-600 hover:text-red-800">
                                    <BsFillTrash3Fill onClick={() => handleDelete(item.id_empresa)} />
                                </a>
                                <a className="font-medium text-blue-600 hover:text-blue-800">
                                    <BsBoxArrowDown onClick={() => handleEditModalOpen(item)} />
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
