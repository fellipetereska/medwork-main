import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

import GerarLaudo from "./subPages/components/GerarLaudo";
import PdfGenerate from "./subPages/components/PdfGenerate";
import ModalSearchSetor from "./subPages/components/Modal/ModalSearchSetor";
import ModalSearchUnidade from "./subPages/components/Modal/ModalSearchUnidade"

import icon_sair from '../media/icon_sair.svg'
import icon_lupa from '../media/icon_lupa.svg'
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { connect } from "../../services/api";
import GridLaudos from "./subPages/GridLaudos";


function Laudos() {

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

  const [filteredInventario, setFilteredInventario] = useState([]);
  const [filteredPlano, setFilteredPlano] = useState([]);
  const [filteredSetores, setFilteredSetores] = useState([]);
  const [filteredUnidade, setFilteredUnidades] = useState([]);
  const [pdfComponent, setPdfComponent] = useState(null);

  const [showModalUnidade, setShowModalUnidade] = useState(false);
  const [showModalSetor, setShowModalSetor] = useState(false);

  const [nameCompany, setNameCompany] = useState(null);
  const [unidadeId, setUnidadeId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [nomeUnidade, setNomeUnidade] = useState('');
  const [setorNome, setSetorNome] = useState('');
  const [data, setData] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);

  const [company, setCompany] = useState([]);

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
  };

  useEffect(() => {
    handleGet();
  }, [companyId]);


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
  //Função para fechar o Modal
  const closeModalUnidade = () => setShowModalUnidade(false);
  const closeModalSetor = () => setShowModalSetor(false);

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

  const handleSubmit = async (blob) => {
    // try {
    //   const formData = new FormData();

    //   formData.append("pdfFile", blob, "pgr_document.pdf");

    //   const response = await fetch(`${connect}/pdf_version`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/pdf",
    //     },
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Erro ao salvar PDF no banco de dados");
    //   }

    //   toast.success("PDF Salvo com sucesso!")

    //   getPdfVersion();
    // } catch (error) {
    //   console.error("Erro ao adicionar versão do pdf!", error)
    // }
  };

  const generateFilteredPdf = async (filterCompany, filterContato, user, filterSetor, filterCargo, filterInventario, filterPlano) => {
    const { blob } = await new Promise((resolve, reject) => {
      const pdfGenerated = (
        <PDFDownloadLink
          document={
            <PdfGenerate
              companyName={nameCompany}
              companyId={companyId}
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
            />
          }
          fileName={`PGR - ${nameCompany}` || 'Programa de Gerenciamento de Riscos'}
        >
          {({ blob, url, loading, error }) => (
            <button
              type="button"
              disabled={loading}
              className={`${loading ? 'bg-yellow-600' : 'bg-green-600'
                } py-2 px-8 font-bold text-lg text-white rounded cursor-pointer hover:bg-green-700`}
              onClick={() => {
                if (!loading && blob) {
                  handleSubmit(blob);
                }
              }}
            >
              {loading ? 'Gerando PDF...' : 'Baixar PDF'}
            </button>
          )}
        </PDFDownloadLink>
      );

      setPdfComponent(pdfGenerated);
    });
  }

  const handleGenerate = async () => {
    await handleGet();
    try {
      const filterCompany = empresas.find((i) => i.id_empresa === companyId);
      const filterContato = contatos.find((i) => i.id_contato === filterCompany.fk_contato_id);
      await checkSignIn();
      const mapUnidade = unidades.map((i) => i.id_unidade);
      const filterSetor = setores.filter((i) => mapUnidade.includes(i.fk_unidade_id));
      const mapSetor = filterSetor.map((i) => i.id_setor);
      const filterCargo = cargos.filter((i) => mapSetor.includes(i.fk_setor_id));
      const filterInventario = inventario.filter((i) => i.fk_empresa_id === companyId);
      const filterPlano = plano.filter((i) => i.fk_empresa_id === companyId);

      await generateFilteredPdf(filterCompany, filterContato, user, filterSetor, filterCargo, filterInventario, filterPlano);
      handleSubmit();
    } catch (error) {
      console.log("Erro ao filtrad dados!", error)
    }
  };

  const handleClear = () => {
    setPdfComponent(null);
  };

  const handleChangeData = async (event) => {
    const res = new Date(event).toLocaleDateString('pr-BR');
    console.log(res);
    setData(res);
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

  return (
    <>
      {/* <GerarLaudo
        inventario={inventario}
        processos={processos}
        riscos={riscos}
        empresa={nameCompany}
        unidades={unidades}
        setores={setores}
        empresaId={companyId}
        plano={plano}
        medidasAdm={medidasAdm}
        medidasEpi={medidasEpi}
        medidasEpc={medidasEpc}
        cargos={cargos}
        getUnidades={getUnidades}
      /> */}

      <div className="flex justify-center items-center mt-12 mb-10">
        <h1 className="text-3xl font-extrabold text-sky-700">Laudos</h1>
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

            <div className="w-full md:w-1/3 px-3 opacity-25">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                Unidade:
              </label>
              <div className="flex items-center w-full">
                {nomeUnidade ? (
                  <>
                    <button
                      className="flex appearance-none w-full hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text cursor-not-allowed"
                      onClick={openModalUnidade} disabled
                    >
                      <p className="font-bold w-full">
                        {nomeUnidade}
                      </p>
                    </button>
                    <button className="ml-4 cursor-not-allowed" onClick={handleClearUnidade} disabled>
                      <img src={icon_sair} alt="" className="h-9" />
                    </button>
                  </>
                ) : (
                  <button
                    className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text cursor-not-allowed"
                    onClick={openModalUnidade}
                    disabled
                  >
                    <p className="text-sm font-medium w-full">
                      Nenhuma Unidade Selecionado
                    </p>
                  </button>
                )}
                <button
                  type="button"
                  onClick={openModalUnidade}
                  disabled
                  className={`flex cursor-not-allowed ml-4 `}
                >
                  <img src={icon_lupa} className="h-9 cursor-not-allowed" alt="Icone adicionar unidade"></img>
                </button>
              </div>
              <ModalSearchUnidade
                isOpen={showModalUnidade}
                onCancel={closeModalUnidade}
                children={unidades}
                onContactSelect={handleUnidadeSelect}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 opacity-25">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                Setor:
              </label>
              <div className="flex items-center w-full">
                {setorNome ? (
                  <>
                    <button
                      className="flex w-full appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text cursor-not-allowed"
                      onClick={openModalSetor} disabled
                    >
                      <p className="font-bold w-full">
                        {setorNome}
                      </p>
                    </button>
                    <button className="ml-4 cursor-not-allowed" onClick={handleClearSetor} disabled>
                      <img src={icon_sair} alt="" className="h-9" />
                    </button>
                  </>
                ) : (
                  <button
                    className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text cursor-not-allowed  "
                    onClick={openModalSetor} disabled
                  >
                    <p className="px-2 text-sm font-medium w-full">
                      Nenhum Setor Selecionado
                    </p>
                  </button>
                )}

                <button
                  type="button"
                  onClick={openModalSetor} disabled
                  className={`flex cursor-not-allowed ml-4`}
                >
                  <img src={icon_lupa} className="h-9 cursor-not-allowed" alt="Icone adicionar unidade"></img>
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

      <GridLaudos
        children={pdfVersion}

      />
    </>
  )
}

export default Laudos;