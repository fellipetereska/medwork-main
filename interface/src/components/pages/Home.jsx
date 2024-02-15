import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

import GridHome from "./subPages/GridHome";
import SearchInput from "./subPages/components/SearchInput";

function Home() {

  const {empresas, getEmpresas, contatos, getContatos, companyId, handleSetCompanyId} = useAuth(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);

  useEffect(() => {
		handleSetCompanyId();
	},[]);

  useEffect(() => {
    getEmpresas();
    getContatos();
  }, [companyId]);

  //Função para Pesquisa
  useEffect(() => {
    const filtered = empresas.filter((emp) => emp.nome_empresa.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredEmpresas(filtered);
  }, [searchTerm, empresas]);


  const handleSearch = (term) => {
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
        contatos={contatos}
      />
    </div>
  )
}

export default Home;