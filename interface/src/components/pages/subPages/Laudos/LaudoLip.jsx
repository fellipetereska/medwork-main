import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import LipGenerate from "../components/LaudoGenerate/LipGenerete";
import InsalubridadeGenerate from "../components/LaudoGenerate/InsalubridadeGenerate";
import PericulosidadeGenerate from "../components/LaudoGenerate/PericulosidadeGenerate";
import ModalSearchSetor from "../../subPages/components/Modal/ModalSearchSetor";
import ModalSearchUnidade from "../../subPages/components/Modal/ModalSearchUnidade"

import Back from '../../../layout/Back';
import { IoInformationCircleSharp } from "react-icons/io5";
import icon_sair from '../../../media/icon_sair.svg'
import icon_lupa from '../../../media/icon_lupa.svg'

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
    getPdfVersion, pdfVersion,
  } = useAuth(null);


  const [nameCompany, setNameCompany] = useState(null);
  const [filteredInventario, setFilteredInventario] = useState([]);
  const [filteredSetores, setFilteredSetores] = useState([]);
  const [filteredUnidade, setFilteredUnidades] = useState([]);

  // Inputs Form
  const [unidadeId, setUnidadeId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [nomeUnidade, setNomeUnidade] = useState('');
  const [setorNome, setSetorNome] = useState('');
  const [data, setData] = useState('');
  const [laudo, setLaudo] = useState('');

  // Laudo
  const [pdfComponent, setPdfComponent] = useState(null);
  const [generatedPdf, setGeneratedPdf] = useState(null);
  const [pdfGrid, setPdfGrid] = useState(false);

  // Popover
  const [visible, setVisible] = useState(false);

  // Modal
  const [showModalUnidade, setShowModalUnidade] = useState(false);
  const [showModalSetor, setShowModalSetor] = useState(false);



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
    getPdfVersion();
  };

  useEffect(() => {
    handleGet();
  }, [companyId]);

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
  //Função para fechar o Modal
  const closeModalUnidade = () => setShowModalUnidade(false);
  const closeModalSetor = () => setShowModalSetor(false);

  // Função para atualizar a Unidade
  // Função para atualizar a Unidade
  const handleUnidadeSelect = (unidadeId, nomeUnidade) => {
    closeModalUnidade();
    setUnidadeId(unidadeId)
    setNomeUnidade(nomeUnidade)
    handleClearSetor();
    const inventarioFilter = inventario.filter((i) => i.fk_unidade_id === unidadeId);
    setFilteredInventario(inventarioFilter);
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
    const setorFilter = setores.filter((i) => i.id_setor === SetorId);
    setFilteredSetores(setorFilter);
  };

  const handleClearSetor = () => {
    setSetorId(null);
    setSetorNome(null);
  };


  const handleGenerate = async () => {
    await handleGet();
    try {

      const filterRisco = riscos.filter((i) => i.lip_risco === 1);
      const mapRisk = filterRisco.map((i) => i.id_risco);

      let filterUnidades;
      let filterSetor;
      let mapUnidades;
      let mapSetor;
      let filterInventario;

      if (unidadeId) {
        filterUnidades = unidades.filter((i) => i.id_unidade === unidadeId);
        mapUnidades = filterUnidades.map((i) => i.id_unidade);
        filterSetor = setores.filter((i) => i.fk_unidade_id === unidadeId);
        mapSetor = filterSetor.map((i) => i.id_setor);


        if (setorId) {
          filterSetor = setores.filter((i) => i.id_setor === setorId);
          mapSetor = filterSetor.map((i) => i.id_setor);
        }
      } else {
        filterUnidades = unidades;
        mapUnidades = filterUnidades.map((i) => i.id_unidade);
        filterSetor = setores.filter((i) => mapUnidades.includes(i.fk_unidade_id));
        mapSetor = filterSetor.map((i) => i.id_setor);
      }


      // Stoped Here
      if (laudo === "LI") {
        filterInventario = inventario.filter((i) => mapRisk.includes(i.fk_risco_id) && i.fk_empresa_id === companyId && mapUnidades.includes(i.fk_unidade_id) && mapSetor.includes(i.fk_setor_id));
      }
      console.log("Inventario filtrado", filterInventario);

      if (filterInventario.length === 0) {
        return toast.warn("Selecione outro setor ou outra unidade!");
      }

      const filterCompany = empresas.find((i) => i.id_empresa === companyId);
      const filterContato = contatos.find((i) => i.id_contato === filterCompany.fk_contato_id);
      await checkSignIn();
      const filterCargo = cargos.filter((i) => mapSetor.includes(i.fk_setor_id));


      if (laudo === "LP") {
        const res = await generateLP(filterInventario, filterCompany, filterContato, filterSetor, filterCargo, filterUnidades, user, data);
        handleDownloadLtcat(res);
        setGeneratedPdf(res);
      } else if (laudo === "LI") {
        const res = await generateLI(filterInventario, filterCompany, filterContato, filterSetor, filterCargo, filterUnidades, user, data);
        handleDownloadLtcat(res);
        setGeneratedPdf(res);
      } else {
        const res = await generatePdf(filterInventario, filterCompany, filterContato, filterSetor, filterCargo, filterUnidades, user, data);
        handleDownloadLtcat(res);
        setGeneratedPdf(res);
      }
    } catch (error) {
      console.log("Erro ao filtrar dados!", error)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePdf = async (filterInventario, filterCompany, filterContato, filterSetor, filterCargo, filterUnidades, user, data) => {
    return (
      <LipGenerate
        inventario={filterInventario}
        unidades={filterUnidades}
        setores={filterSetor}
        processos={processos}
        riscos={riscos}
        aparelhos={aparelhos}
        company={filterCompany}
        user={user}
        data={data}
        contatos={filterContato}
        cargos={filterCargo}
      />
    );
  };

  const generateLI = async (filterInventario, filterCompany, filterContato, filterSetor, filterCargo, filterUnidades, user, data) => {
    return (
      <InsalubridadeGenerate
        inventario={filterInventario}
        unidades={filterUnidades}
        setores={filterSetor}
        processos={processos}
        riscos={riscos}
        aparelhos={aparelhos}
        company={filterCompany}
        user={user}
        data={data}
        contatos={filterContato}
        cargos={filterCargo}
      />
    );
  };

  const generateLP = async (filterInventario, filterCompany, filterContato, filterSetor, filterCargo, filterUnidades, user, data) => {
    return (
      <PericulosidadeGenerate
        inventario={filterInventario}
        unidades={filterUnidades}
        setores={filterSetor}
        processos={processos}
        riscos={riscos}
        aparelhos={aparelhos}
        company={filterCompany}
        user={user}
        data={data}
        contatos={filterContato}
        cargos={filterCargo}
      />
    );
  };

  const handleDownloadLtcat = async (pgr) => {
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
  };


  // Clear
  const handleClear = () => {
    setPdfComponent(null);
    setPdfGrid(null);
    window.location.reload();
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


  // Data
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

  useEffect(() => {
    obterDataFormatada().then((dataFormatada) => {
      setData(dataFormatada);
    });
  }, []);

  // 

  const handleChangeLaudo = (item) => {
    setLaudo(item.target.value);
  }

  return (
    <>

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página para Gerar LIP</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página Laudo de Insalubridade e Periculosidade foi meticulosamente projetada para oferecer uma forma eficiente e organizada de gerar o LIP.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                No canto superior esquerdo da tela, destaca-se um botão que proporciona a facilidade de retorno à página principal de Laudos, esse recurso visa garantir uma navegação ágil e intuitiva para os usuários. No centro da tela, apresentamos um formulário claro e de fácil compreensão para o definir como deseja gerar o relatório, tem a opção de gerar com todos os dados, tem a opção de gerar apenas de uma unidade e tambem a opção de gerar apenas um setor, também conta com a opção de gerar o Laudo de Insalubridade, o Laudo de Periculosidade ou o Laudo de Insalubridade e Periculosidade. Além disso, apresentamos uma tabela organizada abaixo, contendo as versões do LTCAT. Em uma coluna dedicada é disponibilizado um botão utilizado para gerar e baixar aquela versão especifica. Ao gerar um relatório novo ou uma versão ficam disponibilizadas duas opções, uma para abrir o laudo em uma nova aba e outra para baixar o laudo. Para abrir em uma nova aba basta clicar no botao que surge ao gerar um laudo, localizado em cima da tabela no canto direito, e para baixar voce utiliza o mesmo botão que geroum, tanto um novo quanto uma versão.
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
        <div className="col-span-3 flex justify-center text-center">
          <h1 className="text-3xl font-extrabold text-sky-700">LIP - Laudo de Insalubridade e Periculosidade</h1>
        </div>
        <div className="col-span-1 flex justify-center pt-3">
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
            <div className="w-full md:w-1/4 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="data">
                Data:
              </label>
              <input
                className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 `}
                type="date"
                name="data_ltcat"
                id="data"
                value={data}
                onChange={handleChangeData}
              />
            </div>

            {/* Laudo */}
            <div className="w-full md:w-1/4 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="select_laudo">
                Laudo:
              </label>
              <select
                className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 `}
                type="date"
                name="select_laudo"
                id="select_laudo"
                value={laudo}
                onChange={handleChangeLaudo}
              >
                <option value="0">Selecione um Laudo</option>
                <option value="LI">Laudo de Insalubridade</option>
                <option value="LP">Laudo de Periculosidade</option>
                <option value="LIP">LIP - Ambos</option>
              </select>
            </div>

            {/* Unidade */}
            <div className="w-full md:w-1/4 px-3">
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
            <div className="w-full md:w-1/4 px-3">
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
      {/* <GridPgr
        children={pdfVersion}
        empresas={empresas}
        handleGenerate={handleGenerate}
        pdf={pdfGrid}
        companyId={companyId}
      /> */}

    </>
  )
}

export default LaudoPgr;