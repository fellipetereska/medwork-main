import { BsFillTrash3Fill, BsFillPencilFill } from 'react-icons/bs'
import axios from 'axios';
import { toast } from 'react-toastify';

function GridCadastroEmpresa ({ users, setUsers, setOnEdit }) {

    const handleEdit = (item) => {
        console.log(item)
        setOnEdit(item);
    }

    const handleDelete = async (id) => {
        await axios
        .delete(`http://localhost:8800/${id}`)
        .then(({data}) => {
            const newArray = users.filter((user) => user.id !== id);

            setUsers(newArray);
            toast.success(data);
        })
        .catch(({data}) => toast.error(data))

        setOnEdit(null);
    }


    return (
            <div class="flex justify-center mb-20">
                <table class="w-5/6 shadow-md text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Empresa
                            </th>
                            <th scope="col" class="px-6 py-3">
                                CNPJ
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Endereco
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Contato
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Telefone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, i) => (
                            <tr key={i} class="bg-white border-b">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {item.nome_empresa}
                                </th>
                                <td class="px-6 py-4">
                                    {item.cnpj}
                                </td>
                                <td class="px-6 py-4">
                                    {item.endereco}
                                </td>
                                <td class="px-6 py-4">
                                    {item.contato}
                                </td>
                                <td class="px-6 py-4">
                                    {item.telefone}
                                </td>
                                <td class="px-5 py-4 gap-4 flex justify-start">
                                    <a class="font-medium text-blue-600 hover:text-blue-800">
                                        <BsFillPencilFill onClick={() => handleEdit(item)} />
                                    </a>
                                    <a class="font-medium text-red-600 hover:text-red-800">
                                        <BsFillTrash3Fill onClick={() => handleDelete(item)} />
                                    </a>
                                </td>
                            </tr>
                        ))};
                    </tbody>
                </table>
            </div>
    )
}

export default GridCadastroEmpresa;