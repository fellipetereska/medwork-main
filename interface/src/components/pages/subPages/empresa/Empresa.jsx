import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
import { supabase } from "../../../../services/api";

import CadastroEmpresa from "./frmCadastroEmpresas";
import GridCadastroEmpresa from './gridCadastroEmpresa';
import EditModal from "../ModalCadastro";
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'

function Empresa() {

    // Instanciando e Definindo como vazio
    const [data, setData] = useState(null);
    const [empresa, setEmpresa] = useState([]);
    const [contato, setContato] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [formData, setFormData] = useState({
        nome_empresa: '',
        razao_social: '',
        cnpj: '',
        endereco: '',
        cidade: '',
        contato: '',
        telefone: ''
    });

    //Instanciando o Search
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmpresas, setFilteredEmpresas] = useState([]);

    //Instanciando Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    // const [contatoNomes, setContatoNomes] = useState({});

    const openModal = (data) => {
        setIsEditModalOpen(true);
        setEditData(data)
    };


    const handleSave = () => {
        console.log("Dados Salvos", formData);
    };

    // Pegando os dados do banco
    const getEmpresa = async () => {
        try {
            const { data } = await supabase.from("empresa").select();
            setEmpresa(data)
            // const res = await axios.get("http://localhost:8800/empresa");
            // setEmpresa(res.data.sort((a, b) => (a.nome_empresa > b.nome_empresa ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    const getContato = async () => {
        try {
            const res = await axios.get("http://localhost:8800/contato");
            setContato(res.data);
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getEmpresa();
    }, []); // Chama apenas uma vez quando o componente é montado

    //Funções do Modal
    const handleEditModalOpen = (data) => {
        setIsEditModalOpen(true);
        setEditData(data);
    };

    const handleCancelEdit = () => {
        setEditData(null);
        setIsEditModalOpen(false);
    }

    const handleEdit = (selectedEmpresa) => {
        setOnEdit(selectedEmpresa)
    };

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
            <div className="tab-content mt-14 mb-32">
                <div>

                    <Link to="/cadastros">
                        <Back />
                    </Link>

                    <CadastroEmpresa onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getEmpresa} />

                    <EditModal
                        data={editData}
                        onCancel={handleCancelEdit}
                        onSave={handleSave}
                        isOpen={isEditModalOpen}
                    />

                    <div className="flex justify-center w-full mt-6">
                        <div className="w-3/6">
                            <SearchInput onSearch={handleSearch} />
                        </div>
                    </div>

                    <GridCadastroEmpresa
                        empresa={filteredEmpresas}
                        setEmpresa={setEmpresa}
                        setOnEdit={handleEdit}
                        handleEditModalOpen={() => handleEditModalOpen(data)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Empresa;
