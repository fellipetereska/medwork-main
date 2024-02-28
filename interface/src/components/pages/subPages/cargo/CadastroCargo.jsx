import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'

import FrmCadastroCargo from "./frmCadastroCargo";
import GridCadastroCargo from "./gridCadastroCargo";
import SearchInput from "../components/SearchInput";
import Back from '../../../layout/Back'
import { IoInformationCircleSharp } from "react-icons/io5";

function CadastroCargo() {

  const { cargos, setCargos, getCargos, getSetores, setores, companyId, loadSelectedCompanyFromLocalStorage, unidades, getUnidades } = useAuth(null)

  // Instanciando e Definindo como vazio
  const [setorNome, setSetorNome] = useState(null);
  const [onEdit, setOnEdit] = useState(null);
  const [visible, setVisible] = useState(false);

  //Instanciando o Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCargo, setFilteredCargo] = useState([]);

  useEffect(() => {
    loadSelectedCompanyFromLocalStorage();
  }, [])

  useEffect(() => {
    getCargos();
    getSetores();
    getUnidades();
  }, [companyId]);

  const findSetor = (fkSetorId) => {
    if (!setores) {
      return 'N/A';
    }

    const setor = setores.find((c) => c.id_setor === fkSetorId);
    return setor ? setor.nome_setor : 'N/A';
  }

  const findUnidades = (fkSetorId) => {
    try {
      const setor = setores.find((i) => i.id_setor === fkSetorId);
      const setorId = setor ? setor.fk_unidade_id : 'N/A'

      const unidade = unidades.find((i) => i.id_unidade === setorId);
      return unidade ? unidade.nome_unidade : 'N/A'
    } catch (error) {
      console.log("Erro ao buscar unidades da tabela cargo!", error)
    }
  }

  const handleEdit = (selectedCargo) => {
    setOnEdit(selectedCargo)

    if (selectedCargo.fk_setor_id) {
      const setorInfo = setores.find((c) => c.id_setor === selectedCargo.fk_setor_id)
      if (setorInfo) {
        setSetorNome(setorInfo.nome_setor);
      }
    }
  };

  //Função para Pesquisa
  useEffect(() => {
    const filtered = cargos.filter((carg) => carg.nome_cargo.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCargo(filtered);
  }, [searchTerm, cargos]);

  const handleSearch = (term) => {
    // Atualizar o estado do termo de pesquisa com o valor fornecido
    setSearchTerm(term);
  }


  return (
    <div className="tab-content">

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Cargo</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página de cadastro de cargos foi desenvolvida para proporcionar uma maneira eficiente e organizada de registrar informações cruciais relacionadas aos cargos no setor.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                No canto superior esquerdo da tela, um botão estrategicamente posicionado permite o retorno rápido à página principal de cadastros, garantindo uma navegação fluida e direta. No centro da tela, apresentamos um formulário claro e de fácil compreensão para o cadastro de cargos. Este formulário segue o mesmo padrão intuitivo das demais páginas, simplificando a inserção e modificação de dados referentes aos cargos na organização. Abaixo do formulário, implementamos um campo de pesquisa para agilizar a localização rápida de cargos específicos, otimizando a experiência do usuário. Complementando a página, disponibilizamos uma tabela organizada com os dados dos cargos, incluindo informações relevantes como nome, descrição do cargo, quantidade de funcionários, setor e unidade. Na mesma linha, são apresentados dois botões distintos: um ícone de lápis para edição e um checkbox para desativar o cargo, se necessário. O ícone de edição permite ajustes diretos na tabela, proporcionando uma gestão integrada e eficaz dos cargos no setor.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                Essa abordagem visa fornecer uma página de cadastro de cargos que atenda às necessidades dos usuários, oferecendo uma experiência intuitiva e eficiente na organização e gestão dessas informações na empresa.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 mb-10 mt-10">
        {/* Botão para voltar */}
        <div className="">
          <Link to="/cadastros">
            <Back />
          </Link>
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Cargo</h1>
        </div>
        <div className="flex justify-end w-3/4 items-center">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
      </div>

      <FrmCadastroCargo
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getCargo={getCargos}
        set={setorNome}
        setor={setores}
        unidades={unidades}
      />

      {/* Barra de pesquisa */}
      <div className="flex justify-center w-full">
        <div className="w-3/6">
          <SearchInput onSearch={handleSearch} placeholder="Buscar Cargo..." />
        </div>
      </div>

      {/* Tabela Empresa */}
      <GridCadastroCargo
        cargos={filteredCargo}
        setCargo={setCargos}
        getCargo={getCargos}
        setOnEdit={handleEdit}
        find={findSetor}
        setor={setores}
        unidades={unidades}
        findUnidades={findUnidades}
      />
    </div>
  )
}

export default CadastroCargo;
