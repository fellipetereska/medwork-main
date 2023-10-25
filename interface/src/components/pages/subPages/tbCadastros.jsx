import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

import CadastroEmpresa from "./empresa/frmCadastroEmpresas";
import GridCadastroEmpresa from './empresa/gridCadastroEmpresa';
import CadastroSetor from "./setor/frmCadastroSetor";
import GridCadastroSetor from "./setor/gridCadastroSetor";
import EditModal from "./ModalCadastro";

function TabCadastroEmpresa() {

    console.log("Rendereziado")

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

    //Instanciando Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

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
        data = empresa;
        if(data){
            setIsEditModalOpen(true);
            setEditData(data);
        }
        console.log("Chamado", isEditModalOpen)
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };

    const handleEdit = (data) => {
        setEditData(data);
        setIsEditModalOpen(true);
    };

    const handleCancelEdit = () => {
        setEditData(null);
        setIsEditModalOpen(false);
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
                        <div className="border-b border-gray-200 mb-10">
                            <CadastroEmpresa onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getEmpresa} />
                        </div>
                        <EditModal data={editData} onCancel={handleCancelEdit} onSave={handleSave} isOpen={isEditModalOpen}>{console.log(isEditModalOpen)}</EditModal>
                        <GridCadastroEmpresa empresa={empresa} setEmpresa={setEmpresa} setOnEdit={setOnEdit} handleEditModalOpen={handleEditModalOpen} />
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
