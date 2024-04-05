import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
import ReactDOM from 'react-dom';

import PgrGenerate from "../components/LaudoGenerate/PgrGenerate";
import ModalSearchSetor from "../../subPages/components/Modal/ModalSearchSetor";
import ModalSearchUnidade from "../../subPages/components/Modal/ModalSearchUnidade";
import ModalSearchElaborador from "../components/Modal/ModalSearchElaborador";

import icon_sair from '../../../media/icon_sair.svg'
import icon_lupa from '../../../media/icon_lupa.svg'
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { connect } from "../../../../services/api";
import GridLaudo from "./Grids/GridLaudo";
import { FaDownload } from "react-icons/fa6";
import Back from '../../../layout/Back'
import { Link } from "react-router-dom";
import { IoInformationCircleSharp } from "react-icons/io5";


function LaudoPgr() {

  const {
    loadSelectedCompanyFromLocalStorage, companyId, selectedCompany,
    getUnidades, unidades,
    getSetores, setores, setSetores,
    getEmpresas, empresas,
    getCargos, cargos,
    getProcessos, processos,
    getRiscos, riscos,
    getMedidasAdm, medidasAdm, getMedidasEpi, medidasEpi, getMedidasEpc, medidasEpc,
    getSetoresProcessos, setSetoresProcessos, setoresProcessos,
    getProcessosRiscos, setProcessosRiscos, processosRiscos,
    getRiscosMedidas, setRiscosMedidas, riscosMedidas,
    getInventario, inventario,
    getGlobalSprm, setGlobalSprm, globalSprm, getGlobalSprmByRiscoId,
    getPlano, setPlano, plano,
    getUsuarios, usuarios,
    getContatos, contatos,
    checkSignIn, user,
    getAparelhos, aparelhos,
    getLaudoVersion, laudoVersion,
    getTable,
  } = useAuth(null);

  const [filteredInventario, setFilteredInventario] = useState([]);
  const [filteredPlano, setFilteredPlano] = useState([]);
  const [filteredSetores, setFilteredSetores] = useState([]);
  const [filteredUnidade, setFilteredUnidades] = useState([]);
  const [laudos, setLaudos] = useState([]);
  const [elaboradores, setElaboradores] = useState([]);
  const [filteredElaborador, setFilteredElaborador] = useState([]);

  const [showModalUnidade, setShowModalUnidade] = useState(false);
  const [showModalSetor, setShowModalSetor] = useState(false);
  const [showModalElaborador, setShowModalElaborador] = useState(false);
  const [exists, setExists] = useState(false);
  const [pdfGrid, setPdfGrid] = useState(false);
  const [visible, setVisible] = useState(false);

  const [nameCompany, setNameCompany] = useState('');
  const [unidadeId, setUnidadeId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [elaboradorId, setElaboradorId] = useState('');
  const [nomeUnidade, setNomeUnidade] = useState('');
  const [setorNome, setSetorNome] = useState('');
  const [elaboradorNome, setElaboradorNome] = useState('');
  const [data, setData] = useState('');
  const [comentario, setComentario] = useState('');
  const [versao, setVersao] = useState('');

  const [generatedPdf, setGeneratedPdf] = useState(null);
  const [pdfComponent, setPdfComponent] = useState(null);



  useEffect(() => {
    loadSelectedCompanyFromLocalStorage();
  }, []);

  const handleGet = async () => {
    setNameCompany(selectedCompany ? selectedCompany.nome_empresa : '');
    getUnidades();
    getSetores();
    getCargos();
    getProcessos();
    getRiscos();
    getSetoresProcessos();
    getProcessosRiscos();
    getInventario();
    getRiscosMedidas();
    getMedidasAdm();
    getMedidasEpi();
    getMedidasEpc();
    getPlano();
    getUsuarios();
    getContatos();
    getEmpresas();
    getAparelhos();
    getLaudoVersion();
    const authors = await getTable('elaboradores');
    setElaboradores(authors);
  };

  useEffect(() => {
    handleGet();
  }, [companyId]);

  useEffect(() => {
    const pdfExists = laudoVersion.filter((i) => i.fk_empresa_id === companyId && i.laudo === 'pgr');
    setLaudos(pdfExists);
    if (pdfExists) {
      setVersao(pdfExists.length + 1);
      setExists(true);
    } else {
      setVersao(1);
      setExists(false);
    }
  }, [laudoVersion]);

  useEffect(() => {
    try {
      // Filtrando o inventario pelo id da Empresa
      const inventarioFilter = inventario.filter((i) => i.fk_empresa_id === companyId);
      setFilteredInventario(inventarioFilter);

      // Filtrando o plano de ação pelo id da Empresa 
      const planoFilter = plano.filter((i) => i.fk_empresa_id === companyId);
      setFilteredPlano(planoFilter);

    } catch (error) {
      toast.warn("Erro ao filtrar dados!")
      console.log("Erro ao filtrar dados!", error);
    }
  }, [companyId, inventario, plano]);

  useEffect(() => {
    if (showModalSetor && unidadeId) {
      const filtered = setores.filter((i) => i.fk_unidade_id === unidadeId);
      setFilteredSetores(filtered);
    }
  }, [showModalSetor, unidadeId, setores]);

  //Funções do Modal
  //Função para abrir o Modal
  const openModalUnidade = () => setShowModalUnidade(true);
  const openModalSetor = () => setShowModalSetor(true);
  const openModalElaborador = () => setShowModalElaborador(true);
  //Função para fechar o Modal
  const closeModalUnidade = () => setShowModalUnidade(false);
  const closeModalSetor = () => setShowModalSetor(false);
  const closeModalElaborador = () => setShowModalElaborador(false);

  const handleSubmit = async () => {
    if (!comentario) {
      toast.warn("Campo comentário em branco!");
      return;
    } else {
      try {
        const pdfVersionData = {
          data: data,
          fk_empresa_id: companyId,
          laudo: 'pgr',
          versao: versao,
          comentario: comentario,
        }

        const response = await fetch(`${connect}/laudo_version`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pdfVersionData),
        });


        if (!response.ok) {
          throw new Error(`Erro ao gerar versão do PGR`);
        };

        toast.success(`PGR Gerado com sucesso, Versão: ${versao}`);
        getLaudoVersion();
        setNomeUnidade('');
        setUnidadeId('');
        setSetorNome('');
        setSetorId('');
        setComentario('');
      } catch (error) {
        console.error("Erro ao adicionar versão do pdf!", error)
      }
    }

  };

  const generatePdf = async (filterCompany, filterContato, user, filterSetor, filterCargo, filterInventario, filterPlano, unidades, filterpdf, data, versao) => {
    return (
      <PgrGenerate
        unidades={unidades}
        setores={filterSetor}
        cargos={filterCargo}
        inventario={filterInventario}
        plano={filterPlano}
        contatos={filterContato}
        riscos={riscos}
        medidasAdm={medidasAdm}
        medidasEpi={medidasEpi}
        medidasEpc={medidasEpc}
        processos={processos}
        company={filterCompany}
        user={user}
        aparelhos={aparelhos}
        data={data}
        versao={versao}
        pdfVersion={filterpdf}
        elaborador={filteredElaborador}
      />
    );
  };

  const handleDownloadPGR = async (pgr, grid) => {
    if (grid) {
      const { blob } = await new Promise((resolve, reject) => {
        const pdfGenerated = (
          <PDFDownloadLink
            document={pgr}
            fileName={`PGR - ${nameCompany}` || 'Programa de Gerenciamento de Riscos'}
          >
            {({ blob, url, loading, error }) => (
              loading ? (<p className="text-sm text-gray-400 font-light cursor-not-allowed" disabled>Carregando PGR ...</p>) : (<FaDownload />)
            )}
          </PDFDownloadLink>
        );
        setPdfGrid(pdfGenerated)
      })
    } else {
      const { blob } = await new Promise((resolve, reject) => {
        const pdfGenerated = (
          <PDFDownloadLink
            document={pgr}
            fileName={`PGR - ${nameCompany}` || 'Programa de Gerenciamento de Riscos'}
          >
            {({ blob, url, loading, error }) => (
              <button
                type="button"
                disabled={loading}
                className={`${loading ? 'bg-gray-200 hover:bg-gray-200 text-gray-700' : 'bg-green-600'
                  } py-2 px-8 font-bold text-lg text-white rounded cursor-pointer hover:bg-green-700`}>
                {loading ? 'Gerando PDF...' : 'Baixar PDF'}
              </button>
            )}
          </PDFDownloadLink>
        );
        setPdfComponent(pdfGenerated)
      })
    }
  };

  const handleGenerate = async (companys, contacts, users, sectors, departaments, inventarios, planos, units, date, grid, version) => {
    await handleGet();
    // await handleSubmit();
    try {
      let filterUnidades;
      let filterSetor;

      if (unidadeId) {
        filterUnidades = unidades.filter((i) => i.id_unidade === unidadeId);
        filterSetor = setores.filter((i) => i.fk_unidade_id === unidadeId);
      } else {
        filterUnidades = unidades;
        const mapUnidade = filterUnidades.map((i) => i.id_unidade);
        filterSetor = setores.filter((i) => mapUnidade.includes(i.fk_unidade_id));
      }

      if (setorId) {
        filterSetor = setores.filter((i) => i.id_setor === setorId);
      }

      const filterCompany = empresas.find((i) => i.id_empresa === companyId);
      const filterContato = contatos.find((i) => i.id_contato === filterCompany.fk_contato_id);
      await checkSignIn();
      const mapSetor = filterSetor.map((i) => i.id_setor);
      const filterCargo = cargos.filter((i) => mapSetor.includes(i.fk_setor_id));
      const filterInventario = inventario.filter((i) => i.fk_empresa_id === companyId);
      const filterPlano = plano.filter((i) => i.fk_empresa_id === companyId);
      await getLaudoVersion();

      if (grid) {
        const res = await generatePdf(companys, contacts, users, sectors, departaments, inventarios, planos, units, laudos, date, version);
        handleDownloadPGR(res, grid)
        setGeneratedPdf(res)
      } else {
        const res = await generatePdf(filterCompany, filterContato, user, filterSetor, filterCargo, filterInventario, filterPlano, filterUnidades, laudos, data, versao);
        handleDownloadPGR(res)
        setGeneratedPdf(res)
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.log("Erro ao filtrar dados!", error)
    }
  };

  const handleClear = () => {
    setPdfComponent(null);
    setPdfGrid(null);
    setData(obterDataFormatada());
    setVersao(versao);
    setComentario('');
    handleClearUnidade();
    handleClearSetor();
    handleClearElaborador();
    window.location.reload();
  };

  const handleChangeData = async (event) => {
    const date = new Date(event.target.value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setData(formattedDate);
  };

  const obterDataFormatada = async () => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const openPdfInNewTab = (pdfComponent) => {
    const newWindow = window.open();

    ReactDOM.render(
      <PDFViewer style={{ width: '100%', height: '100vh', margin: '0', padding: '0' }}>
        {pdfComponent}
      </PDFViewer>,
      newWindow.document.body
    );
  };

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  useEffect(() => {
    obterDataFormatada().then((dataFormatada) => {
      setData(dataFormatada);
    });
  }, []);

  // Função para atualizar a Unidade
  const handleUnidadeSelect = (unidadeId, nomeUnidade) => {
    closeModalUnidade();
    setUnidadeId(unidadeId)
    setNomeUnidade(nomeUnidade)
    handleClearSetor();
    const inventarioFilter = inventario.filter((i) => i.fk_unidade_id === unidadeId);
    setFilteredInventario(inventarioFilter);
    const planoFilter = plano.filter((i) => i.fk_unidade_id === unidadeId);
    setFilteredPlano(planoFilter);
    const unidadesFilter = unidades.filter((i) => i.id_unidade === unidadeId);
    setFilteredUnidades(unidadesFilter);
  };

  const handleClearUnidade = () => {
    setUnidadeId(null);
    setNomeUnidade(null);
    handleClearSetor();
    setFilteredSetores([]);
  };

  const handleSetorSelect = (SetorId, SetorName) => {
    closeModalSetor();
    setSetorId(SetorId);
    setSetorNome(SetorName);

    const inventarioFilter = inventario.filter((i) => i.fk_setor_id === setorId);
    setFilteredInventario(inventarioFilter);
    const planoFilter = plano.filter((i) => i.fk_setor_id === setorId);
    setFilteredPlano(planoFilter);
    const setorFilter = setores.filter((i) => i.id_setor === SetorId);
    setFilteredSetores(setorFilter);
  };

  const handleClearSetor = () => {
    setSetorId(null);
    setSetorNome(null);
  };

  const handleElaboradorSelect = (authorsId, authorsName) => {
    setElaboradorId(authorsId);
    setElaboradorNome(authorsName);

    const filter = elaboradores.find((i) => i.id_elaborador === authorsId);
    setFilteredElaborador(filter);
    closeModalElaborador();
  }

  const handleClearElaborador = () => {
    setElaboradorId('');
    setElaboradorNome('');
  }

  return (
    <>

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página para Gerar PGR</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página Programa de Gerenciamento de Riscos foi meticulosamente projetada para oferecer uma forma eficiente e organizada de gerar o PGR.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                No canto superior esquerdo da tela, destaca-se um botão que proporciona a facilidade de retorno à página principal de Laudos, esse recurso visa garantir uma navegação ágil e intuitiva para os usuários. No centro da tela, apresentamos um formulário claro e de fácil compreensão para o definir como deseja gerar o relatório, tem a opção de gerar com todos os dados, tem a opção de gerar apenas de uma unidade e tambem a opção de gerar apenas um setor. Além disso, apresentamos uma tabela organizada abaixo, contendo as versões do PGR. Em uma coluna dedicada é disponibilizado um botão utilizado para gerar e baixar aquela versão especifica. Ao gerar um relatório novo ou uma versão ficam disponibilizadas duas opções, uma para abrir o laudo em uma nova aba e outra para baixar o laudo. Para abrir em uma nova aba basta clicar no botao que surge ao gerar um laudo, localizado em cima da tabela no canto direito, e para baixar voce utiliza o mesmo botão que geroum, tanto um novo quanto uma versão.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Titulo */}
      <div className="grid grid-cols-5 mb-10 mt-10">
        {/* Botão para voltar */}
        <div className="col-span-1">
          <Link to="/laudos">
            <Back />
          </Link>
        </div>
        <div className="col-span-3 flex justify-center">
          <h1 className="text-3xl font-extrabold text-sky-700">PGR - Pograma de Gerenciamento de Riscos</h1>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex justify-center mt-10">
        <form className="w-full max-w-7xl">
          <div className="flex flex-wrap -mx-3 mb-6 p-3">

            {/* Data */}
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                Data:
              </label>
              <input
                className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 `}
                type="date"
                name="data_inventario"
                value={data}
                onChange={handleChangeData}
              />
            </div>

            {/* Unidade */}
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_unidade_id">
                Unidade:
              </label>
              <div className="flex items-center w-full" id="grid-fk_unidade_id">
                {nomeUnidade ? (
                  <>
                    <button
                      className="flex appearance-none w-full hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                      onClick={openModalUnidade}
                    >
                      <p className="font-bold w-full">
                        {nomeUnidade}
                      </p>
                    </button>
                    <button className="ml-4" onClick={handleClearUnidade}>
                      <img src={icon_sair} alt="" className="h-9" />
                    </button>
                  </>
                ) : (
                  <button
                    className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                    onClick={openModalUnidade}
                  >
                    <p className="text-sm font-medium w-full">
                      Nenhuma Unidade Selecionado
                    </p>
                  </button>
                )}
                <button
                  type="button"
                  onClick={openModalUnidade}
                  className={`flex cursor-pointer ml-4 `}
                >
                  <img src={icon_lupa} className="h-9 cursor-pointer" alt="Icone adicionar unidade"></img>
                </button>
              </div>
              <ModalSearchUnidade
                isOpen={showModalUnidade}
                onCancel={closeModalUnidade}
                children={unidades}
                onContactSelect={handleUnidadeSelect}
              />
            </div>

            {/* Setor */}
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_setor_id">
                Setor:
              </label>
              <div className="flex items-center w-full" id="grid-fk_setor_id">
                {setorNome ? (
                  <>
                    <button
                      className="flex w-full appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                      onClick={openModalSetor}
                    >
                      <p className="font-bold w-full">
                        {setorNome}
                      </p>
                    </button>
                    <button className="ml-4 cursor-pointer" onClick={handleClearSetor}>
                      <img src={icon_sair} alt="" className="h-9" />
                    </button>
                  </>
                ) : (
                  <button
                    className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                    onClick={openModalSetor}
                  >
                    <p className="px-2 text-sm font-medium w-full">
                      Nenhum Setor Selecionado
                    </p>
                  </button>
                )}

                <button
                  type="button"
                  onClick={openModalSetor}
                  className={`flex cursor-pointer ml-4`}
                >
                  <img src={icon_lupa} className="h-9 cursor-pointer" alt="Icone adicionar unidade"></img>
                </button>
              </div>
              <ModalSearchSetor
                isOpen={showModalSetor}
                onCancel={closeModalSetor}
                children={filteredSetores}
                onContactSelect={handleSetorSelect}
              />
            </div>

            {/* ELaborador */}
            <div className="w-full md:w-4/12 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="elaborador">
                Elaborador:
              </label>
              <div className="flex items-center w-full" id="elaborador">
                {elaboradorId ? (
                  <>
                    <button
                      className="flex w-full appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                      onClick={openModalElaborador}
                    >
                      <p className="font-bold w-full">
                        {elaboradorNome}
                      </p>
                    </button>
                    <button className="ml-4 cursor-pointer" onClick={handleClearElaborador}>
                      <img src={icon_sair} alt="" className="h-9" />
                    </button>
                  </>
                ) : (
                  <button
                    className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                    onClick={openModalElaborador}
                  >
                    <p className="px-2 text-sm font-medium w-full">
                      Nenhum Elaborador Selecionado
                    </p>
                  </button>
                )}

                <button
                  type="button"
                  onClick={openModalElaborador}
                  className={`flex cursor-pointer ml-4`}
                >
                  <img src={icon_lupa} className="h-9 cursor-pointer" alt="Icone adicionar elaborador"></img>
                </button>
              </div>
              <ModalSearchElaborador
                isOpen={showModalElaborador}
                onCancel={closeModalElaborador}
                children={elaboradores}
                onSelect={handleElaboradorSelect}
              />
            </div>

            {/* Versão */}
            <div className="w-full md:w-1/12 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="versao">
                Versão:
              </label>
              <input
                className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 `}
                type="text"
                id="versao"
                name="versao"
                value={versao}
                placeholder="Versão do Laudo"
                disabled
              />
            </div>

            {/* Comentário */}
            <div className="w-full md:w-7/12 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="comentario">
                Comentário:
              </label>
              <textarea
                className={`resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 `}
                type="text"
                id="comentario"
                name="comentario"
                value={comentario}
                placeholder="Descreva as atualizações"
                onChange={handleComentarioChange}
              />
            </div>


          </div>

          {/* Botões */}
          <div className="flex justify-end mb-20 mt-10 gap-4">
            <button type="button" className="bg-red-600 py-2 px-8 font-bold text-lg text-white rounded cursor-pointer hover:bg-red-700" onClick={handleClear}>
              Limpar
            </button>
            {pdfComponent ? (
              pdfComponent
            ) : (
              <button type="button" className="bg-green-600 py-2 px-8 font-bold text-lg text-white rounded cursor-pointer hover:bg-green-700" onClick={handleGenerate}>
                Gerar PDF
              </button>
            )}
          </div>

        </form>
      </div>

      {/* Botão Abrir em nova aba */}
      {generatedPdf && (
        <div className="w-full flex justify-center">
          <div className="flex justify-end items-center mt-4 w-5/6">
            <button
              className="bg-teal-600 py-2 px-4 rounded font-bold text-white hover:bg-teal-700 cursor-pointer"
              onClick={() => openPdfInNewTab(generatedPdf)}
            >
              Abrir em Nova Aba
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      <GridLaudo
        children={laudos}
        empresas={empresas}
        handleGenerate={handleGenerate}
        pdf={pdfGrid}
        companyId={companyId}
      />

    </>
  )
}

export default LaudoPgr;