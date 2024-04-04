import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Back from '../../../layout/Back'
import FrmCadastroContato from "./frmCadastroContato";
import GridCadastroContato from './gridCadastroContato';
import SearchInput from '../components/SearchInput';
import useAuth from '../../../../hooks/useAuth';
import { IoInformationCircleSharp } from "react-icons/io5";

function CadastroContato() {

  const { contatos, setContatos, getContatos } = useAuth(null);

  // Instanciando e Definindo como vazio
  const [onEdit, setOnEdit] = useState(null);
  const [visible, setVisible] = useState(false);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContato, setFilteredContato] = useState([]);

  const handleEdit = (selectedContato) => {
    setOnEdit(selectedContato)
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = contatos.filter((emp) => emp.nome_contato.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredContato(filtered);

    getContatos();
  }, [searchTerm, contatos]);

  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }

  return (
    <div>
      <div className="tab-content">

        {/* Popover */}
        <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
          <div className="fixed z-50 m-2 -mt-4">
            <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
              <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Contato</h2>
              <div>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  A página de cadastro de contato foi projetada para oferecer uma maneira eficiente e organizada de registrar informações essenciais relacionadas aos responsáveis pela empresa e unidades. Ao acessar essa funcionalidade, os usuários encontrarão um layout intuitivo que facilita o processo de cadastro.
                </p>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  No canto superior esquerdo da tela, um botão estrategicamente posicionado permite o retorno rápido à página principal de cadastros, proporcionando uma navegação fluida e direta. No centro da tela, apresentamos um formulário claro e de fácil compreensão para o cadastro de contatos. Esse formulário segue o mesmo padrão intuitivo das demais páginas, simplificando a inserção e modificação de dados relacionados aos responsáveis pela empresa e unidades. Abaixo do formulário, implementamos um campo de pesquisa que facilita a localização rápida de contatos específicos. Essa funcionalidade visa otimizar a experiência do usuário, garantindo eficiência na busca por informações.
                </p>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  Complementando a página, disponibilizamos uma tabela organizada com os dados dos contatos, incluindo informações relevantes como nome, cargo e email. Na mesma linha, são apresentados três botões distintos: um ícone de lápis para edição, um ícone de corrente para vincular contatos a setores ou unidades, e um checkbox para desativar o contato, se necessário. O ícone de edição permite ajustes no contato.
                </p>
                <p className="mb-2 text-justify font-light text-gray-300 flex">
                  Essa abordagem visa fornecer uma página de cadastro de contatos que atenda às necessidades dos usuários, oferecendo uma experiência intuitiva e eficiente na organização e gestão dos responsáveis pela empresa e unidades.
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
            <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Contato</h1>
          </div>
          <div className="flex justify-end w-3/4 items-center">
            <div onMouseEnter={() => setVisible(true)}>
              <IoInformationCircleSharp className='text-sky-700' />
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="mb-3">
          <FrmCadastroContato onEdit={onEdit} setOnEdit={setOnEdit} getContato={getContatos} />
        </div>

        {/* Search */}
        < div className="flex justify-center w-full mb-3">
          <div className="w-3/6">
            <SearchInput onSearch={handleSearch} placeholder="Buscar Empresa..." />
          </div>
        </div>

        {/* Grid */}
        < GridCadastroContato
          contato={filteredContato}
          setContato={setContatos}
          setOnEdit={handleEdit}
          getContato={getContatos}
        />
      </div>
    </div >
  )
}

export default CadastroContato;
