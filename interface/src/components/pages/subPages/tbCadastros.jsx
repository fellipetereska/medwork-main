import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { BsBuildingAdd } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import CadastroEmpresa from "./empresa/frmCadastroEmpresas";
import GridCadastroEmpresa from './empresa/gridCadastroEmpresa';
import FrmCadastroSetor from "./setor/frmCadastroSetor";
import GridCadastroSetor from "./setor/gridCadastroSetor";
import EditModal from "./ModalCadastro";
import SearchInput from "./components/SearchInput";
import BotaoEmpresa from "./buttons/BotaoEmpresa";
import BotaoUnidade from "./buttons/BotaoUnidade";
import BotaoSetor from "./buttons/BotaoSetor";
import BotaoCargo from "./buttons/BotaoCargo";
import BotaoContato from "./buttons/BotaoContato";


function TabCadastroEmpresa() {

    // Instanciando e Definindo como vazio
    const [empresa, setEmpresa] = useState([]);
    const [setor, setSetor] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        nome_empresa: '',
        razao_social: '',
        cnpj_empresa: '',
        endereco_empresa: '',
        cidade: '',
        contato: '',
        telefone: ''
    });
    const [formEmpresa, setFormEmpresa] = useState({
        nome_empresa: '',
        razao_social: '',
        cnpj_empresa: '',
        endereco_empresa: '',
        cidade: '',
        contato: '',
        telefone: ''
    });
    // const [editModalData, setEditModalData] = useState(null);
    // const [empresaToEdit, setEmpresaToEdit] = useState(null);

    const handleSetFormEmpresa = (data) => {
        setFormEmpresa(data);
    };

    //Instanciando o Search
    // const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmpresas, setFilteredEmpresas] = useState([]);

    //Instanciando Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const openModal = (data) => {
        setIsEditModalOpen(true);
        setEditData(data)
    };


    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    // const handleInputChange = (e) => {
    //     e.preventDefault();

    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleSave = () => {
        console.log("Dados Salvos", formData);
    };

    // Pegando os dados do banco
    const getEmpresa = async () => {
        try {
            const res = await axios.get("http://localhost:8800/empresa");
            setEmpresa(res.data.sort((a, b) => (a.nome_empresa > b.nome_empresa ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    const getSetor = async () => {
        try {
            const res = await axios.get("http://localhost:8800/setor");
            setSetor(res.data.sort((a, b) => (a.nome_setor > b.nome_setor ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getEmpresa();
    }, []); // Chama apenas uma vez quando o componente é montado

    useEffect(() => {
        getSetor();
    }, []); // Chama apenas uma vez quando o componente é montado

    //Funções do Modal
    // const handleEditModalOpen = (data) => {
    //         setIsEditModalOpen(true);
    //         setEditData(data);
    // };

    // const handleEditModalClose = () => {
    //     setIsEditModalOpen(false);
    // };

    // const handleEdit = (empresa) => {
    //     setEmpresa(empresa);
    //     setIsEditModalOpen(false);
    // };

    const handleCancelEdit = () => {
        setEditData(null);
        setIsEditModalOpen(false);
    }

    // const handleteste = () => {
    //     console.log("Teste Botao")
    // }

    //Função para Pesquisa
    // useEffect(() => {
    //     const filtered = empresa.filter((emp) => emp.nome_empresa.toLowerCase().includes(searchTerm.toLowerCase()));
    //     setFilteredEmpresas(filtered);
    // }, [searchTerm, empresa]);


    // const handleSearch = (term) => {
    //     // Atualizar o estado do termo de pesquisa com o valor fornecido
    //     setSearchTerm(term);
    // }


    return (
        <>
            <div className="mt-16 px-12">
                <div class="grid xl:grid-cols-5 md:grid-cols-3 gap-6 bg-white">
                    <figure class="flex flex-col justify-center">
                        <Link to="/cadastro_empresa">
                            <BotaoEmpresa />
                        </Link>
                    </figure>
                    <figure class="flex flex-col justify-center">
                        <Link to="/cadastro_unidade">
                            <BotaoUnidade />
                        </Link>
                    </figure>
                    <figure class="flex flex-col justify-center">
                        <Link to="/cadastro_setor">
                            <BotaoSetor />
                        </Link>
                    </figure>
                    <figure class="flex flex-col justify-center">
                        <Link to="/cadastro_cargo">
                            <BotaoCargo />
                        </Link>
                    </figure>
                    <figure class="flex flex-col justify-center">
                        <Link to="/cadastro_contato">
                            <BotaoContato />
                        </Link>
                    </figure>
                </div>
                <div className="border-b border-gray-300 mt-8 mb-8"></div>
            </div>

            {/* <div className="mt-32 mb-32">
                    <div>
                        <div>
                            <div className="flex justify-center w-full gap-10">
                                <Link to="/cadastro_empresa">
                                    <BotaoEmpresa />
                                </Link>
                                <Link to="/cadastro_unidade">
                                    <BotaoUnidade />
                                </Link>
                                <Link to="/cadastro_setor">
                                    <BotaoSetor />
                                </Link>
                                <Link to="/cadastro_cargo">
                                    <BotaoCargo />
                                </Link>
                                <Link to="/cadastro_contato">
                                    <BotaoContato />
                                </Link>
                            </div>
                        </div>
                        <div className="border-b mt-5 mb-5 border-gray-200 mx-auto w-9/12"></div>
                        <div> */}
            {/* <div className="flex justify-center w-full gap-10">
                                    
                                    <BotaoUnidade />
                                    <BotaoSetor />
                                    <BotaoCargo />
                                </div> */}
            {/* </div> */}
            {/* <div>
                                <div className="flex justify-end px-32 mb-10 mt-14 items-center">
                                    <div className="w-11/12 px-20">
                                        <SearchInput onSearch={handleSearch} />
                                    </div>
                                    <button onClick={openModal} className="shadow flex justify-center items-center w-16 h-9 bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                        <BsBuildingAdd />
                                    </button>
                                </div>
                            </div> */}

            {/* <EditModal
                            data={editData}
                            onCancel={handleCancelEdit}
                            onSave={handleSave}
                            isOpen={isEditModalOpen}
                        /> */}

            {/* <GridCadastroEmpresa 
                                empresa={filteredEmpresas} 
                                setEmpresa={setEmpresa} 
                                setOnEdit={setOnEdit} 
                                handleEditModalOpen={handleEditModalOpen}
                                
                            /> */}
            {/* </div>
                </div> */}
        </>
    )
}

export default TabCadastroEmpresa;
