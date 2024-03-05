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

  const generateFilteredPdf = (filterCompany, filterContato, user, filterSetor, filterCargo) => {
    const pdfComponent = (
      <PDFDownloadLink
        document={
          <PdfGenerate
            companyName={nameCompany}
            companyId={companyId}
            unidades={unidades}
            setores={filterSetor}
            cargos={filterCargo}
            inventario={inventario}
            plano={plano}
            contatos={filterContato}
            riscos={riscos}
            medidasAdm={medidasAdm}
            medidasEpi={medidasEpi}
            medidasEpc={medidasEpc}
            processos={processos}
            company={filterCompany}
            user={user}
          />
        }
        fileName="relatorio.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Carregando o PDF..." : "Baixar o PDF"
        }
      </PDFDownloadLink>
    );

    setPdfComponent(pdfComponent);
  };

  const handleGenerate = async () => {
    await handleGet();
    try {
      const filterCompany = empresas.find((i) => i.id_empresa === companyId);
      const filterContato = contatos.find((i) => i.id_contato === filterCompany.fk_contato_id);
      const users = await checkSignIn();
      const mapUnidade = unidades.map((i) => i.id_unidade);
      const filterSetor = setores.filter((i) => mapUnidade.includes(i.fk_unidade_id));
      const mapSetor = filterSetor.map((i) => i.id_setor);
      const filterCargo = cargos.filter((i) => mapSetor.includes(i.fk_setor_id));

      generateFilteredPdf(filterCompany, filterContato, user, filterSetor, filterCargo);
    } catch (error) {
      console.log("Erro ao filtrad dados!", error)
    }
  };


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
        <h1 className="text-3xl font-extrabold text-sky-700">PGR</h1>
      </div>

      {/* Form */}
      <div className="flex justify-center mt-10">
        <form className="w-full max-w-7xl">
          <div className="flex flex-wrap -mx-3 mb-6 p-3">

            {/* Unidade */}
            <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                Unidade:
              </label>
              <div className="flex items-center w-full">
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
                  className={`flex cursor-pointer ml-4`}
                >
                  <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
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
            <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                Setor:
              </label>
              <div className="flex items-center w-full">
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
                    <button className="ml-4" onClick={handleClearSetor}>
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
                  <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
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
          {pdfComponent}
          <button type="button" onClick={handleGenerate}>
            Gerar
          </button>
        </form>
      </div>
    </>
  )
}

export default Laudos;