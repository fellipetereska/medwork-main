//Importando Ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api"; //Conexão com o banco

//Importando componentes
import CadastroAparelhos from "./FrmAparelhos";
import GridAParelhos from './GridAparelhos';
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'
import { IoInformationCircleSharp } from "react-icons/io5";

function Aparelhos() {

  // Instanciando e Definindo como vazio
  const [aparelhos, setAparelhos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [visible, setVisible] = useState(false);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Pegando os dados da tabela Empresa
  const getAparelhos = async () => {
    try {
      const response = await fetch(`${connect}/aparelhos`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Aparelhos. Status: ${response.status}`);
      }

      const data = await response.json();
      setAparelhos(data);
    } catch (error) {
      console.log("Erro ao buscar Aparelhos: ", error.message);
    }
  };

  useEffect(() => {
    getAparelhos();
  }, []);

  const handleEdit = (selected) => {
    setOnEdit(selected);
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = aparelhos.filter((mp) => mp.nome_aparelho.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(filtered);
  }, [searchTerm, aparelhos]);


  const handleSearch = (term) => {
    setSearchTerm(term);
  }


  return (
    <div className="tab-content mb-32">

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Aparelho</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página de cadastro de Aparelho foi projetada para oferecer uma maneira eficiente e organizada de registrar informações essenciais relacionadas aos aparelhos utilizados nas visitas técnicas.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                No canto superior esquerdo da tela, um botão estrategicamente posicionado permite o retorno rápido à página principal de gestão, proporcionando uma navegação fluida e direta. No centro da tela, apresentamos um formulário claro e de fácil compreensão para o cadastro de aparelhos. Esse formulário segue o mesmo padrão intuitivo das demais páginas, simplificando a inserção e modificação de dados. Abaixo do formulário, implementamos um campo de pesquisa que facilita a localização rápida de aparelhos específicos. Essa funcionalidade visa otimizar a experiência do usuário, garantindo eficiência na busca por informações. Complementando a página, disponibilizamos uma tabela organizada com os dados dos aparelhos, incluindo informações relevantes como nome, marca, modelo e data de calibragem. Na mesma linha, é apresentado um botao: um ícone de lápis para edição. O ícone de edição permite ajustes no aparelho.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Essa abordagem visa fornecer uma página de cadastro de aparelhos que atenda às necessidades dos usuários, oferecendo uma experiência intuitiva e eficiente na organização e gestão dos aparelhos utilizados nas medições.
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
          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Aparelho</h1>
        </div>
        <div className="flex justify-end w-3/4 items-center">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
      </div>

      {/* Formulário de cadastro */}
      <CadastroAparelhos
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        get={getAparelhos}
      />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Aparelhos..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridAParelhos
        children={filtered}
        set={setAparelhos}
        setOnEdit={handleEdit}
      />
    </div>
  )
}

export default Aparelhos;
