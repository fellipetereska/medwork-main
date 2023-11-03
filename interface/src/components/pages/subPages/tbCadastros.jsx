import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { BsBuildingAdd } from 'react-icons/bs'

import CadastroEmpresa from "./empresa/frmCadastroEmpresas";
import GridCadastroEmpresa from './empresa/gridCadastroEmpresa';
import CadastroSetor from "./setor/frmCadastroSetor";
import GridCadastroSetor from "./setor/gridCadastroSetor";
import EditModal from "./ModalCadastro";
import SearchInput from "./components/SearchInput";

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
    const [editModalData, setEditModalData] = useState(null);
    const [empresaToEdit, setEmpresaToEdit] = useState(null);

    const handleSetFormEmpresa = (data) => {
        setFormEmpresa(data);
    };

    //Instanciando o Search
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmpresas, setFilteredEmpresas] = useState([]);

    //Instanciando Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const openModal = (data) => {
        setIsEditModalOpen(true);
        setEditData(data);
};
    

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    const handleInputChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
    const handleEditModalOpen = (data) => {
            setIsEditModalOpen(true);
            setEditData(data);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };

    const handleEdit = (empresa) => {
        setEmpresa(empresa);
        setIsEditModalOpen(false);
    };

    const handleCancelEdit = () => {
        setEditData(null);
        setIsEditModalOpen(false);
    }

    //Função para Pesquisa
    useEffect(() => {
        const filtered = empresa.filter((emp) => emp.nome_empresa.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredEmpresas(filtered);
    }, [searchTerm, empresa]);

    
    const handleSearch = (term) => {
        // Atualizar o estado do termo de pesquisa com o valor fornecido
        setSearchTerm(term);
    }

    return (
        <div>
            <div className="m-2 text-sm font-medium text-start text-gray-500 border-b border-gray-200">
                <button
                    className={`ml-1 inline-block p-4 rounded-t-lg bg-gray-100 text-gray-900 hover:text-gray-600 hover:bg-gray-200 ${activeTab === 0 ? 'active' : ''}`}
                    onClick={() => handleTabChange(0)}
                >
                    Cadastrar Empresa
                </button>
                <button
                    className={`ml-1 inline-block p-4 rounded-t-lg bg-gray-100 text-gray-900 hover:text-gray-600 hover:bg-gray-200 ${activeTab === 1 ? 'active' : ''}`}
                    onClick={() => handleTabChange(1)}
                >
                    Cadastrar Setor
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 0 && (
                    <div>
                        <div>
                            <div className="flex justify-end px-32 mb-10 mt-4 items-center">
                                <div className="w-11/12 px-20">
                                    <SearchInput onSearch={handleSearch} />
                                </div>
                                <button onClick={openModal} className="shadow flex justify-center items-center w-16 h-9 bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                    <BsBuildingAdd />
                                </button>
                            </div>


                        </div>
                        <EditModal 
                            data={editData} 
                            onCancel={handleCancelEdit} 
                            onSave={handleSave} 
                            isOpen={isEditModalOpen}
                        />

                        <GridCadastroEmpresa 
                            empresa={filteredEmpresas} 
                            setEmpresa={setEmpresa} 
                            setOnEdit={setOnEdit} 
                            handleEditModalOpen={handleEditModalOpen}
                            
                        />
                    </div>
                )}
            </div>
            <div className="tab-content">
                {activeTab === 1 && (
                    <div>
                        <div className="border-b border-gray-200 mb-10">
                            <CadastroSetor onEdit={onEdit} setOnEdit={setOnEdit} getSetor={getSetor} />
                        </div>
                        <GridCadastroSetor setor={setor} setSetor={setSetor} setOnEdit={setOnEdit} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TabCadastroEmpresa;
