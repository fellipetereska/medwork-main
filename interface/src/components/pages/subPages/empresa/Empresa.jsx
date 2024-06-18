//Importando Ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth';

//Importando componentes
import CadastroEmpresa from "./frmCadastroEmpresas";
import GridCadastroEmpresa from './gridCadastroEmpresa';
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'
import { IoInformationCircleSharp } from "react-icons/io5";

function Empresa() {

  const {
    getEmpresas,
    empresas,
    setEmpresas,
    getContatos,
    contatos
  } = useAuth(null);

  // Instanciando e Definindo como vazio
  const [onEdit, setOnEdit] = useState(null);
  const [contactName, setContactName] = useState(null);
  const [visible, setVisible] = useState(false);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);

  useEffect(() => {
    getEmpresas();
    getContatos();
  }, []);

  const handleEdit = (selectedEmpresa) => {
    setOnEdit(selectedEmpresa);

    if (selectedEmpresa.fk_contato_id) {
      const contactInfo = contatos.find((c) => c.id_contato === selectedEmpresa.fk_contato_id)
      if (contactInfo) {
        setContactName(contactInfo.nome_contato)
      }
    }
  };

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
    <div className="tab-content mb-10">

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Empresa</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página de cadastro de empresa foi cuidadosamente desenvolvida para proporcionar uma maneira eficaz e organizada de registrar informações fundamentais sobre as empresas associadas ao sistema.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Localizado no canto superior esquerdo da tela, um botão estrategicamente posicionado possibilita um retorno rápido à página principal de cadastros, garantindo uma navegação fluida e direta. No centro da tela, um formulário claro e de fácil compreensão está disponível para o cadastro de informações sobre a empresa. Seguindo o mesmo padrão intuitivo das demais páginas, esse formulário facilita a inserção e a modificação de dados relevantes relacionados à empresa. Os campos de inscrição estadual e inscrição municipal contam com um sistema de ativar ou inativar o campo, caso a empresa não tenha inscrição, tanto estadual quanto municipal, basta dar um check no checbox e seguir o cadastro. Já o campo de CNAE, ao ser inserido o código deve-se aguardar de 1 a 3 segundos para obter a resposta do grau de risco. Abaixo do formulário, um campo de pesquisa foi implementado para agilizar a localização rápida de empresas específicas, proporcionando uma experiência eficiente ao usuário. Complementando a página, uma tabela organizada exibe os dados das empresas, incluindo informações importantes como nome, CNPJ e contato. Nessa tabela, são apresentados dois botões distintos para cada empresa: um ícone de lápis para edição e um checkbox para desativar a empresa, se necessário. O ícone de edição permite ajustes diretos na tabela, proporcionando uma gestão integrada e eficaz das informações das empresas associadas ao sistema, já o checbox de inativação serve para inativar a empresa para o sistema.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Essa abordagem visa oferecer uma página de cadastro de empresa que atenda às necessidades dos usuários, proporcionando uma experiência intuitiva e eficiente na organização e gestão dessas informações.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="grid grid-cols-3 mb-10 mt-10">
        {/* Botão para voltar */}
        <div className="">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Empresa</h1>
        </div>
        <div className="flex justify-end w-3/4 items-center">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
      </div>


      {/* Formulário de cadastro */}
      <CadastroEmpresa
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getEmpresa={getEmpresas}
        contact={contactName}
        contatos={contatos}
      />


      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
        </div>
      </div>


      {/* Tabela Empresa */}
      <GridCadastroEmpresa
        empresa={filteredEmpresas}
        setEmpresa={setEmpresas}
        setOnEdit={handleEdit}
        getEmpresa={getEmpresas}
        contato={contatos}
      />
    </div>
  )
}

export default Empresa;
