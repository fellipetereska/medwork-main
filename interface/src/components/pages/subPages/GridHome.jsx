import { BsFillTrash3Fill, BsFillPencilFill, BsBoxArrowDown } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function GridHome({ empresas, setEmpresa, setOnEdit, handleEditModalOpen }) {

    //Instanciando o id da Empresa
    const [idEmpresa, setIdEmpresa] = useState(null);
    const [nomeEmpresa, setNomeEmpresa] = useState(null);
    const [contatoNomes, setContatoNomes] = useState({});
    const [contatos, setContatos] = useState([]);
    const { selectCompany } = useAuth();
    const [selectEmpresa, setSelectEmpresa] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    const { empresa } = useAuth();

    useEffect(() => {
        const fetchContatos = async () => {
            try {
                const response = await axios.get('http://localhost:8800/contato');
                setContatos(response.data);
            } catch (error) {
                console.error('Erro ao buscar contatos:', error);
            }
        };

        fetchContatos();
    }, []);

    const findContactName = (fkContatoId) => {
        const contato = contatos.find((c) => c.id_contato === fkContatoId);
        return contato ? contato.nome_contato : 'N/A';
    };

    const handleEdit = (empresa) => {
        setOnEdit(empresa);
        handleEditModalOpen();
    };

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

    const handleOpenCompany = async (id) => {
        if (!id) {
            toast.warn("Selecione uma Empresa!");
            return;
        }

        try {
            await selectCompany(id);
            toast.success(`Empresa ${empresa.nome_empresa} Selecionada!`)
            navigate('/cadastros')
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div class="relative overflow-x-auto sm:rounded-lg flex sm:justify-center">
            <table class="w-full xl:w-5/6 shadow-md text-sm m-8 text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Empresa
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Razão Social
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CNPJ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contato
                        </th>
                        <th scope="col" className="flex justify-center px-6 py-3">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((item, i) => (
                        <tr key={i} class="border-b bg-white">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.id_empresa}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.nome_empresa}
                            </th>
                            <td className="px-6 py-4">
                                {item.razao_social}
                            </td>
                            <td className="px-6 py-4">
                                {item.cnpj_empresa}
                            </td>
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {findContactName(item.fk_contato_id)}
                            </th>
                            <td className="py-4 flex justify-center">
                                {/* <a className="font-medium text-red-600 hover:text-red-800">
                                    <BsFillTrash3Fill onClick={() => handleDelete(item.id_empresa)} />
                                </a> */}
                                <a className="font-medium text-blue-600 hover:text-blue-800">
                                    <BsBoxArrowDown onClick={() => handleOpenCompany(item.id_empresa)} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GridHome;
