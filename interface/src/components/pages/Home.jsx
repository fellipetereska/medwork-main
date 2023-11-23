import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { supabase } from "../../services/api";

import GridHome from "./subPages/GridHome";
import EditModal from "./subPages/ModalCadastro";
import SearchInput from "./subPages/components/SearchInput";

function Home() {

    //Instanciando o id da Empresa
    const [nome_empresa, setNomeEmpresa] = useState(null);

    const [empresas, setEmpresa] = useState([]);
    const [setor, setSetor] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
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

    //Recebendo o id do banco de dados e armazenando em idEmpresa
    const fetchNomeEmpresa = (nomeEmpresa) => {
        setNomeEmpresa(nomeEmpresa);
        console.log(nomeEmpresa) // Atualiza a variável de estado com o nome da empresa
    };

    //Instanciando o Search
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmpresas, setFilteredEmpresas] = useState([]);

    //Instanciando Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleSave = () => {
        console.log("Dados Salvos", formData);
    };

    // Pegando os dados do banco
    const getEmpresa = async () => {
        try {
            const { data } = await supabase.from("empresa").select();
            setEmpresa(data);
            // const res = await api.get("/empresa");
            // setEmpresa(res.data.sort((a, b) => (a.nome_empresa > b.nome_empresa ? 1 : -1)));
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

    const handleCancelEdit = () => {
        setEditData(null);
        setIsEditModalOpen(false);
    }

    //Função para Pesquisa
    useEffect(() => {
        const filtered = empresas.filter((emp) => emp.nome_empresa.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredEmpresas(filtered);
    }, [searchTerm, empresas]);


    const handleSearch = (term) => {
        // Atualizar o estado do termo de pesquisa com o valor fornecido
        setSearchTerm(term);
    }
    
    return (
        <div>
            <div className="flex justify-center w-full mt-6">
                <div className="w-3/6">
                    <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
                </div>
            </div>
            <EditModal
                data={editData}
                onCancel={handleCancelEdit}
                onSave={handleSave}
                isOpen={isEditModalOpen}
            />

            <GridHome
                empresas={filteredEmpresas}
                setEmpresa={setEmpresa}
                setOnEdit={setOnEdit}
                handleEditModalOpen={handleEditModalOpen}
                fetchNomeEmpresa={fetchNomeEmpresa}

            />
        </div>
    )
}

export default Home;