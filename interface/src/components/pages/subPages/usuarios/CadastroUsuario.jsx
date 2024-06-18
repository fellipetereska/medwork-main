import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

import FrmCadastroUsuario from './frmCadastroUsuario';
import GridUsuarios from './gridUsuarios';
import { Link } from "react-router-dom";
import Back from '../../../layout/Back';
import { IoInformationCircleSharp } from "react-icons/io5";
import SearchInput from "../components/SearchInput";

function CadastroUsuario() {

  const { handleSetCompanyId, companyId, getUsuarios, setUsuarios, usuarios } = useAuth(null);

  // Instanciando e Definindo como vazio
  const [onEdit, setOnEdit] = useState(null);
  const [visible, setVisible] = useState(false);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  useEffect(() => {
    handleSetCompanyId();
  }, []);

  useEffect(() => {
    getUsuarios();
  }, [companyId])

  const handleEdit = (selectedUser) => {
    setOnEdit(selectedUser)
  };

  //Função para Pesquisa
  useEffect(() => {
    try {
      const filtred = usuarios.filter((user) => user.nome_usuario.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
      setFilteredUsuarios(filtred);
    } catch (error) {
      console.log("Erro ao filtrar usuários!", error)
    }
  }, [searchTerm, usuarios]);

  const handleSearch = (term) => {
    setSearchTerm(term)
  }


  return (
    <>
      <div className="tab-content">

        {/* Popover */}
        <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
          <div className="fixed z-50 m-2 -mt-4">
            <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
              <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Usuário</h2>
              <div>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  A página de cadastro de usuários foi meticulosamente projetada para oferecer uma forma eficiente e organizada de cadastrar usuários para utilizar o sistema.
                </p>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  No canto superior esquerdo da tela, destaca-se um botão que proporciona a facilidade de retorno à página principal de gestão, esse recurso visa garantir uma navegação ágil e intuitiva para os usuários. No centro da tela, apresentamos um formulário claro e de fácil compreensão. Esse formulário segue o mesmo padrão intuitivo das demais páginas, facilitando a inserção e a modificação de dados, o campo de permissão define quais acessos o usuário recebera no sistema. Abaixo do formulário, implementamos um campo de pesquisa para facilitar a localização rápida de usuários específicos. Esse recurso busca otimizar a experiência do usuário, permitindo que encontrem informações de maneira eficiente. Além disso, apresentamos uma tabela organizada abaixo do campo de pesquisa, contendo os dados do usuário, como nome, cpf, email e permissão. Em uma coluna dedicada, é disponibilizado um botão para edição dos dados: um ícone de lápis. O botão de edição permite ajustar informações diretamente na tabela.
                </p>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  Com essa abordagem, buscamos fornecer uma página de cadastro que atenda às necessidades dos usuários, oferecendo uma experiência intuitiva, eficiente e completa para a gestão e organização das informações.
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
            <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Usuário</h1>
          </div>
          <div className="flex justify-end w-3/4 items-center">
            <div onMouseEnter={() => setVisible(true)}>
              <IoInformationCircleSharp className='text-sky-700' />
            </div>
          </div>
        </div>

        {/* Formulário, Tabela e Barra de Pesquisa */}
        <div>
          <FrmCadastroUsuario
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getUsuario={getUsuarios}
            usuarios={usuarios}
          />

          <div className="flex justify-center w-full mb-8">
            <div className="w-3/6">
              <SearchInput onSearch={handleSearch} placeholder="Buscar Usuário..." />
            </div>
          </div>

          <GridUsuarios
            usuario={filteredUsuarios}
            setOnEdit={handleEdit}
          />
        </div>
      </div>
    </>
  )
}

export default CadastroUsuario;
