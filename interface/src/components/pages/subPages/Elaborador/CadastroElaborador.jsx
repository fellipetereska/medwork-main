import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth';
import { connect } from "../../../../services/api";

import Back from '../../../layout/Back'
import FrmElaboador from './FrmElaborador';
import GridElaborador from './GridElaborador';
import SearchInput from '../components/SearchInput';
import { IoInformationCircleSharp } from "react-icons/io5";


function CadastroElaborador() {

  const [onEdit, setOnEdit] = useState(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getTable();
  }, [])

  const handleEdit = (selectedContato) => {
    setOnEdit(selectedContato)
  };

  useEffect(() => {
    const filtered = data.filter((emp) => emp.nome_elaborador.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getTable = async () => {
    try {
      const res = await fetch(`${connect}/elaboradores`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error(`Erro ao buscar tabela. Status: ${res.status}`)
      }

      const response = await res.json();
      setData(response);
    } catch (error) {
      console.error(`Erro ao buscar tabela. Status: ${error}`);
    }
  };


  return (
    <>

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Contato</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página de cadastro de elaborador foi projetada para oferecer uma maneira eficiente e organizada de registrar informações essenciais relacionadas aos responsáveis pelos laudos. Ao acessar essa funcionalidade, os usuários encontrarão um layout intuitivo que facilita o processo de cadastro.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                No canto superior esquerdo da tela, um botão estrategicamente posicionado permite o retorno rápido à página principal de gestão, proporcionando uma navegação fluida e direta. No centro da tela, apresentamos um formulário claro e de fácil compreensão para o cadastro de elaboradores. Esse formulário segue o mesmo padrão intuitivo das demais páginas, simplificando a inserção e modificação de dados relacionados aos responsáveis pelos laudos. Abaixo do formulário, implementamos um campo de pesquisa que facilita a localização rápida dos elaboradores específicos. Essa funcionalidade visa otimizar a experiência do usuário, garantindo eficiência na busca por informações.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Complementando a página, disponibilizamos uma tabela organizada com os dados dos elaboradores, incluindo informações relevantes como nome, telefone, email, cargo e registro. Na mesma linha, são apresentados dois botões distintos: um ícone de lápis para edição e um checkbox para desativar o elaborador, se necessário. O ícone de edição permite ajustes no cadastro.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Essa abordagem visa fornecer uma página de cadastro de contatos que atenda às necessidades dos usuários, oferecendo uma experiência intuitiva e eficiente na organização e gestão dos responsáveis pelos laudos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="grid grid-cols-3 mb-10 mt-10">
        {/* Botão para voltar */}
        <div className="">
          <Link to="/gestao">
            <Back />
          </Link>
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Elaborador</h1>
        </div>
        <div className="flex justify-end w-3/4 items-center">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
      </div>

      {/* Form */}
      <FrmElaboador
        getTable={getTable}
        onEdit={onEdit}
        setOnEdit={setOnEdit}
      />

      {/* Search */}
      < div className="flex justify-center w-full mb-3">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Elaborador..." />
        </div>
      </div>

      {/* Grid */}
      <GridElaborador
        data={filteredData}
        setOnEdit={setOnEdit}
      />
    </>
  );
}

export default CadastroElaborador;