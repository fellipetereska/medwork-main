import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "../../services/api";

import GridHome from "./subPages/GridHome";
import SearchInput from "./subPages/components/SearchInput";

function Home() {

    //Instanciando o id da Empresa
    const [nome_empresa, setNomeEmpresa] = useState(null);
    const [empresas, setEmpresa] = useState([]);
    const [contato, setContato] = useState([]);


    //Recebendo o id do banco de dados e armazenando em idEmpresa
    const fetchNomeEmpresa = (nomeEmpresa) => {
        setNomeEmpresa(nomeEmpresa);
    };

    //Instanciando o Search
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmpresas, setFilteredEmpresas] = useState([]);

    // Pegando os dados do banco
    const getEmpresa = async () => {
        try {
            const response = await fetch(`${connect}/empresas`);

            if (!response.ok) {
                throw new Error(`Erro ao buscar empresa. Status: ${response.status}`);
            }

            const data = await response.json();
            setEmpresa(data);
        } catch (error) {
            console.log("Erro ao buscar empresas: ", error);
        }
    };

    const getContato = async () => {
        try {
            const response = await fetch(`${connect}/contatos`);

            if (!response.ok) {
                throw new Error(`Erro ao buscar contatos! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setContato(responseData);
        } catch (error) {
            console.log("Erro ao buscar contatos!", error)
        }
    }

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
                contato={contato}
                setEmpresa={setEmpresa}
                fetchNomeEmpresa={fetchNomeEmpresa}

            />
        </div>
    )
}

export default Home;