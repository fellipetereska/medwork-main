import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

import GridHome from "./subPages/GridHome";
import SearchInput from "./subPages/components/SearchInput";
import { IoInformationCircleSharp } from "react-icons/io5";

function Home() {

  const { empresas, getEmpresas, contatos, getContatos, companyId, handleSetCompanyId } = useAuth(null);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleSetCompanyId();
  }, []);

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
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Home</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A tela inicial do nosso sistema oferece uma maneira fácil e rápida de encontrar informações. No topo da página, há uma barra de pesquisa para localizar a empresa desejada com agilidade. Abaixo da barra de pesquisa, apresentamos uma tabela organizada e fácil de ler com todas as empresas ativas. Cada linha representa uma empresa e fornece informações importantes, como nome, razão social, CNPJ e contato.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Para usar o sistema, basta clicar na empresa desejada na tabela. Essa abordagem simplificada permite que os usuários selecionem a empresa para fazer modificações, inventário de riscos e plano de ação, gerando relatórios como PGR, LTCAT e LIP. A tela inicial foi projetada para facilitar a navegação, tornando a seleção de empresas rápida e eficiente.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 justify-between w-full items-center">
        <div></div>
        <div className="w-full">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
        </div>
        <div className="flex justify-end w-3/4">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
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