import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { supabase } from "../../services/api";

import GridHome from "./subPages/GridHome";
import SearchInput from "./subPages/components/SearchInput";

function Home() {

    //Instanciando o id da Empresa
    const [nome_empresa, setNomeEmpresa] = useState(null);

    const [empresas, setEmpresa] = useState([]);
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

    // Pegando os dados do banco
    const getEmpresa = async () => {
        try {
            const { data } = await supabase.from("empresa").select();
            const sortData = data.sort((a, b) => {
                //Ordenar pro status (ativo ou inativo)
                if (a.ativo !== b.ativo) {
                    return a.ativo ? -1 : 1;
                }

                //Ordenar por ordem alfabética
                return a.nome_empresa.localeCompare(b.nome_empresa);
            })

            setEmpresa(sortData)
        } catch (error) {
            console.log("Erro ao buscar empresas: ", error);
        }
    };

    useEffect(() => {
        getEmpresa();
    }, []);


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

            <GridHome
                empresas={filteredEmpresas}
                setEmpresa={setEmpresa}
                fetchNomeEmpresa={fetchNomeEmpresa}

            />
        </div>
    )
}

export default Home;