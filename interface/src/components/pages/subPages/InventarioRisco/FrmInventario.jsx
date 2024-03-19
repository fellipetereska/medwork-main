import React, { useEffect, useRef, useState } from "react";
import { connect } from "../../../../services/api";
import { toast } from "react-toastify";

import LoadingScreen from "../components/LoadingScreen";
import ModalSearchUnidade from "../components/Modal/ModalSearchUnidade";
import ModalSearchSetor from "../components/Modal/ModalSearchSetor";
import ModalSearchProcesso from '../components/Modal/ModalSearchProcesso';
import ModalSearchRisco from '../components/Modal/ModalSearchRisco';
import ModalMedidasDefine from "../components/Modal/ModalMedidasDefine";
import ModalSearchAparelhos from '../components/Modal/ModalSearchAparelhos';
import ModalConclusao from '../components/Modal/ModalConclusao';

import icon_sair from '../../../media/icon_sair.svg';
import icon_lupa from '../../../media/icon_lupa.svg';
import icon_warn from "../../../media/icon_warn.svg";

function FrmInventario({
  unidades,
  cargos,
  setores,
  setoresProcessos,
  processos,
  processosRiscos,
  riscos,
  onEdit,
  companyId,
  setOnEdit,
  riscosMedidas,
  medidasAdm, medidasEpi, medidasEpc,
  getGlobalSprm, setGlobalSprm, globalSprm,
  companyName,
  getInventario,
  aparelhos,
  inventario,
  conclusoes,
}) {

  const user = useRef();

  const [loading, setLoading] = useState(false);

  const [filteredSetores, setFilteredSetores] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [filteredRiscos, setFilteredRiscos] = useState([]);

  const [showModalUnidade, setShowModalUnidade] = useState(false);
  const [showModalSetor, setShowModalSetor] = useState(false);
  const [showModalProcesso, setShowModalProcesso] = useState(false);
  const [showModalRisco, setShowModalRisco] = useState(false);
  const [showModalMedidas, setShowModalMedidas] = useState(false);
  const [showModalAparelhos, setShowModalAparelhos] = useState(false);
  const [showModalConclusoes, setShowModalConclusoes] = useState(false);
  const [isMedidasSet, setIsMedidasSet] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [filteredInventarioRisco, setFiltereinventarioRisco] = useState([]);

  const [unidadeId, setUnidadeId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [processoId, setProcessoId] = useState('');
  const [riscoId, setRiscoId] = useState('');
  const [aparelhoId, setAparelhoId] = useState('');
  const [nomeUnidade, setNomeUnidade] = useState('');
  const [setorNome, setSetorNome] = useState('');
  const [processoNome, setProcessoNome] = useState('');
  const [riscoNome, setRiscoNome] = useState('');
  const [aparelhoNome, setAparelhoNome] = useState('');

  //Inputs Form
  const [consequencia, setConsequencia] = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pessoasExpostas, setPessoasExpostas] = useState('');
  const [limiteTolerancia, setLimiteTolerancia] = useState('');
  const [medicao, setMedicao] = useState('');
  const [checkMedicao, setCheckMedicao] = useState(false);
  const [probabilidade, setProbabilidade] = useState('');
  const [severidade, setSeveridade] = useState('');
  const [nivel, setNivel] = useState('');
  const [metodologia, setMetodologia] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [conclusao, setConclusao] = useState('');
  const [anexo, setAnexo] = useState('');
  const [data, setData] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [plano, setPlano] = useState(false);
  const [ltcat, setLtcat] = useState(true);
  const [lip, setLip] = useState(true);
  const [invent, setInvent] = useState(true);

  //Funções do Modal
  //Função para abrir o Modal
  const openModalUnidade = () => setShowModalUnidade(true);
  const openModalSetor = () => setShowModalSetor(true);
  const openModalProcesso = () => setShowModalProcesso(true);
  const openModalRisco = () => setShowModalRisco(true);
  const openModalMedidas = () => setShowModalMedidas(true);
  const openModalAparelhos = () => setShowModalAparelhos(true);
  const openModalConclusoes = () => setShowModalConclusoes(true);
  //Função para fechar o Modal
  const closeModalUnidade = () => setShowModalUnidade(false);
  const closeModalSetor = () => setShowModalSetor(false);
  const closeModalProcesso = () => setShowModalProcesso(false);
  const closeModalRisco = () => setShowModalRisco(false);
  const closeModalAparelhos = () => setShowModalAparelhos(false);
  const closeModalConclusoes = () => setShowModalConclusoes(false);
  const closeModalMedidas = () => {
    getGlobalSprm();
    setShowModalMedidas(false);
  };

  const obterDataFormatada = () => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  useEffect(() => {
    setData(obterDataFormatada)
  }, [])

  useEffect(() => {
    if (showModalSetor && unidadeId) {
      const filtered = setores.filter((i) => i.fk_unidade_id === unidadeId);
      setFilteredSetores(filtered);
    }
  }, [showModalSetor, unidadeId, setores]);

  // Função para atualizar a Unidade
  const handleUnidadeSelect = async (unidadeId, nomeUnidade) => {
    closeModalUnidade();
    setUnidadeId(unidadeId)
    setNomeUnidade(nomeUnidade)
    handleClearSetor();
    setLoading(false);
    setLoading(true);
  };

  const handleClearUnidade = () => {
    setUnidadeId(null);
    setNomeUnidade(null);
    handleClearProcesso();
    handleClearRisco();
    handleClearSetor();
    setFilteredSetores([]);
  };

  // Função para atualizar o Setor
  const handleSetorSelect = async (SetorId, SetorName) => {
    closeModalSetor();
    setSetorId(SetorId);
    setSetorNome(SetorName);
    handleClearProcesso();
    setPessoasExpostas('');

    const filteredProcessosSetores = setoresProcessos.filter((i) => i.fk_setor_id === SetorId);
    const IdsProcesso = filteredProcessosSetores.map((item) => item.fk_processo_id);
    const filteredProcessos = processos.filter((i) => IdsProcesso.includes(i.id_processo));

    setFilteredProcessos(filteredProcessos);


    const findCargo = cargos.find((i) => i.fk_setor_id === SetorId);
    const selectFuncMasc = findCargo ? findCargo.func_masc : 0
    const selectFuncFem = findCargo ? findCargo.func_fem : 0
    const selectFuncMenor = findCargo ? findCargo.func_menor : 0

    if (selectFuncFem != undefined || selectFuncMasc != undefined || selectFuncMenor != undefined) {
      const sum = selectFuncFem + selectFuncMasc + selectFuncMenor;
      if (sum === 0) {
        setPessoasExpostas('0')
      } else {
        setPessoasExpostas(sum);
      }
    }
  };

  const handleClearSetor = () => {
    setSetorId(null);
    setSetorNome(null);
    setPessoasExpostas('');
    handleClearProcesso();
    handleClearRisco();
    setFilteredProcessos([]);
  };

  // Função para atualizar o Processo
  const handleProcessoSelect = async (ProcessoId, ProcessoNome) => {
    closeModalProcesso();
    setProcessoId(ProcessoId);
    setProcessoNome(ProcessoNome);
    handleClearRisco();

    const filteredProcessosRiscos = processosRiscos.filter((i) => i.fk_processo_id === ProcessoId);
    const idsRiscos = filteredProcessosRiscos.map((item) => item.fk_risco_id);
    const filteredRiscos = riscos.filter((i) => idsRiscos.includes(i.id_risco));

    setFilteredRiscos(filteredRiscos);
  };

  const handleClearProcesso = () => {
    setProcessoId(null);
    setProcessoNome(null);
    handleClearRisco();
    setFilteredRiscos([]);
  };

  const verify = async (riscoId) => {
    getInventario();
    try {
      const idsUnidades = inventario.map((i) => i.fk_unidade_id);
      const idsSetores = inventario.map((i) => i.fk_setor_id);
      const idsProcessos = inventario.map((i) => i.fk_processo_id);
      const idsRiscos = inventario.map((i) => i.fk_risco_id);

      const filterInventarioUnidade = inventario.filter((i) => i.fk_unidade_id === unidadeId);
      const filterInventarioSetor = filterInventarioUnidade.filter((i) => i.fk_setor_id === setorId);
      const filterInventarioProcesso = filterInventarioSetor.filter((i) => i.fk_processo_id === processoId);
      const filterInventarioRisco = filterInventarioProcesso.find((i) => i.fk_risco_id === riscoId);
      setFiltereinventarioRisco(filterInventarioRisco)


      if (riscoId) {
        const filterIdUnidade = idsUnidades.includes(unidadeId);
        const filterIdsSetores = idsSetores.includes(setorId);
        const filterIdsProcesso = idsProcessos.includes(processoId);
        const filteridsRicos = idsRiscos.includes(riscoId);

        if (filterIdUnidade === true && filterIdsSetores === true && filterIdsProcesso === true && filteridsRicos === true) {
          setIsVerify(true);
        } else {
          setIsVerify(false);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar cadastro duplicado!", error)
    }
  };

  // Função para atualizar o Risco
  const handleRiscoSelect = async (RiscoId, RiscoNome) => {
    closeModalRisco();
    setRiscoId(RiscoId);
    setRiscoNome(RiscoNome);

    const filteresRiscosMedidas = riscosMedidas.filter((i) => i.fk_risco_id === RiscoId);
    const riscoSelecionado = riscos.find((i) => i.id_risco === RiscoId);

    if (riscoSelecionado) {
      setRiscosInput(riscoSelecionado);
    }

    // Criar um array para armazenar as medidas e tipos
    const medidasTipos = filteresRiscosMedidas.map((filteredRiscosMedidas) => ({
      medidaId: filteredRiscosMedidas.fk_medida_id,
      medidaTipo: filteredRiscosMedidas.tipo,
    }));

    await handleRiscoEscolhido(RiscoId, medidasTipos);
    await verify(RiscoId);
  };

  const handleRiscoEscolhido = async (RiscoId, medidasTipos) => {
    try {
      for (const { medidaId, medidaTipo } of medidasTipos) {
        const verificarResponse = await fetch(
          `${connect}/verificar_sprm?fk_setor_id=${setorId}&fk_risco_id=${RiscoId}&fk_medida_id=${medidaId}&tipo_medida=${medidaTipo}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!verificarResponse.ok) {
          throw new Error(`Erro ao verificar a existência. Status: ${verificarResponse.status}`);
        }

        const verificarData = await verificarResponse.json();

        // Se a combinação já existir, continue para a próxima iteração
        if (verificarData.existeCombinação) {
          continue;
        }


        // Caso contrário, adicione a nova medida
        const adicionarResponse = await fetch(`${connect}/global_sprm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fk_setor_id: setorId,
            fk_processo_id: processoId,
            fk_risco_id: RiscoId,
            fk_medida_id: medidaId,
            tipo_medida: medidaTipo,
            status: '0',
          }),
        });

        if (!adicionarResponse.ok) {
          throw new Error(`Erro ao adicionar medida. Status: ${adicionarResponse.status}`);
        }

        const adicionarData = await adicionarResponse.json();
        toast.success("Meddias Adicionadas com sucesso!");
      }
      getGlobalSprm();
    } catch (error) {
      console.error("Erro ao adicionar medidas", error);
    }
  };

  const handleClearRisco = () => {
    setLoading(true);
    setRiscoId('');
    setRiscoNome('');
    setRiscosInput('');
    setDescricao('');
    setCheckMedicao(false);
    setIsVerify(false);
  };

  const setRiscosInput = (risco) => {
    if (!risco) {
      setAvaliacao('');
      setLimiteTolerancia('');
      setConsequencia('');
      setMetodologia('');
      setSeveridade('');
      setMedicao('');
    } else {
      setAvaliacao(risco.classificacao_risco);
      setLimiteTolerancia(risco.limite_tolerancia_risco || '0');
      setConsequencia(risco.danos_saude_risco || 'N/A');
      setMetodologia(risco.metodologia_risco || 'N/A');
      setSeveridade(risco.severidade_risco || '0');

      if (risco.classificacao_risco === "Qualitativo") {
        setMedicao("0");
      } else {
        setMedicao('');
      }
    }
    setLoading(true);
  };

  const handleAparelhoSelect = async (aparelhoId, aparelhoNome) => {
    closeModalAparelhos();
    setAparelhoId(aparelhoId);
    setAparelhoNome(aparelhoNome);
  };

  const handleClearAparelhos = () => {
    closeModalAparelhos();
    setAparelhoId('');
    setAparelhoNome('');
  };

  const handleProbabilidadeChange = (event) => {
    const selectedProbabilidade = parseInt(event.target.value, 10);
    const severidadeValue = parseInt(severidade, 10);

    if (!isNaN(selectedProbabilidade) && !isNaN(severidadeValue)) {
      const nivelValue = selectedProbabilidade * severidadeValue;
      setProbabilidade(selectedProbabilidade);

      if (nivelValue >= 1 && nivelValue <= 6) {
        setNivel("Baixo");
      } else if (nivelValue >= 7 && nivelValue <= 12) {
        setNivel("Moderado");
      } else if (nivelValue >= 13 && nivelValue <= 16) {
        setNivel("Alto");
      } else if (nivelValue >= 20 && nivelValue <= 25) {
        setNivel("Crítico");
      } else {
        setNivel(null);
      }
    }
  };

  const handleMedicaoCheck = () => {
    setCheckMedicao(!checkMedicao);
    if (medicao === '0') {
      setMedicao('');
    } else {
      setMedicao('0');
    }
  };

  useEffect(() => {
    const handleOnEdit = async () => {
      if (onEdit) {
        try {
          if (onEdit.fk_unidade_id) {
            const unidadeSelect = unidades.find((i) => i.id_unidade === onEdit.fk_unidade_id);
            await handleUnidadeSelect(onEdit.fk_unidade_id, unidadeSelect.nome_unidade);
          }
          if (onEdit.fk_setor_id) {
            const setorSelect = setores.find((i) => i.id_setor === onEdit.fk_setor_id);
            await handleSetorSelect(onEdit.fk_setor_id, setorSelect.nome_setor);
          }
          if (onEdit.fk_processo_id) {
            const processoSelect = processos.find((i) => i.id_processo === onEdit.fk_processo_id);
            await handleProcessoSelect(onEdit.fk_processo_id, processoSelect.nome_processo);
          }
          if (onEdit.fk_risco_id) {
            const riscoSelect = riscos.find((i) => i.id_risco === onEdit.fk_risco_id);
            await handleRiscoSelect(onEdit.fk_risco_id, riscoSelect.nome_risco);
          }

          setMedicao(onEdit.medicao || '');

          if (onEdit.fk_aparelho_id) {
            const aparelhoSelect = aparelhos.find((i) => i.id_aparelho === onEdit.fk_aparelho_id);
            await handleAparelhoSelect(onEdit.fk_aparelho_id, aparelhoSelect.nome_aparelho);
          }

          setFrequencia(onEdit.frequencia || '');
          setProbabilidade(onEdit.probabilidade || '');
          if (onEdit.nivel) {
            const nivelValue = onEdit.nivel;
            if (nivelValue >= 1 && nivelValue <= 6) {
              setNivel("Baixo");
            } else if (nivelValue >= 7 && nivelValue <= 12) {
              setNivel("Moderado");
            } else if (nivelValue >= 13 && nivelValue <= 16) {
              setNivel("Alto");
            } else if (nivelValue >= 20 && nivelValue <= 25) {
              setNivel("Crítico");
            } else {
              setNivel(null);
            }
          }

          setDescricao(onEdit.fontes || 'N/A');
          setComentarios(onEdit.comentarios || 'N/A');
          if (onEdit.data_inventario) {
            const data_formatada = new Date(onEdit.data_inventario).toISOString().split('T')[0];
            setData(data_formatada || '');
          }

          setIsVerify(false);
          setIsMedidasSet(true);
        } catch (error) {
          toast.error("Erro ao buscar os dados!");
          console.error("Erro ao buscar dados para edição", error);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    handleOnEdit();
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const medidasAplicadas = filteredGlobalSprm
      .filter((item) => item.status === 'Aplica')
      .map((item) => ({
        nome: find(item.fk_medida_id, item.tipo_medida),
        tipo: tipoDefine(item.tipo_medida),
      }));

    if (!nomeUnidade || !setorNome || !processoNome || !riscoNome || !medicao || !data) {
      toast.warn("Preencha todos os campos!");
      return
    }
    try {
      const inventarioData = {
        fk_empresa_id: companyId || '',
        fk_unidade_id: unidadeId || '',
        fk_setor_id: setorId || '',
        pessoas_expostas: pessoasExpostas || '',
        fk_processo_id: processoId || '',
        fk_risco_id: riscoId || '',
        fontes: descricao || '',
        medicao: medicao || '0',
        medidas: JSON.stringify(medidasAplicadas) || '',
        probabilidade: probabilidade || '',
        nivel: probabilidade * severidade || '',
        comentarios: comentarios || '',
        data_inventario: data || '',
        frequencia: frequencia || '',
        fk_aparelho_id: aparelhoId || '',
        conclusao: conclusao || '',
        anexo: anexo || '',
      };

      const url = onEdit
        ? `${connect}/inventario/${onEdit.id_inventario}`
        : `${connect}/inventario`

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventarioData),
      });

      if (!response.ok) {
        toast.error("Erro ao adicionar inventário!")
        throw new Error(`Erro ao adicionar inventário. Status: ${response.status}`)
      }

      const responseData = await response.json();

      toast.success(responseData);
      getInventario();
    } catch (error) {
      console.log("Erro ao inserir inventário: ", error)
    }

    handleClear();
  };

  const handleClear = () => {
    handleClearRisco();
    handleClearAparelhos();
    setConsequencia('');
    setComentarios('');
    setMedicao('');
    setProbabilidade('');
    setNivel('');
    setDescricao('');
    setOnEdit(null);
    setCheckMedicao(false);
    setIsMedidasSet(false);
    setFrequencia('');
    setIsVerify(false);
    setData(obterDataFormatada);
    handleClearConclusao();
  };

  const handleDescricaoFontesChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleComentariosChange = (event) => {
    setComentarios(event.target.value);
  };

  const handleMedicaoChange = (event) => {
    setMedicao(event.target.value);
  };

  const handleMedidaChange = () => {
    getGlobalSprm();
    closeModalMedidas();
    setIsMedidasSet(true);
  };

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 1:
          const admMedidas = medidasAdm.find((i) => i.id_medida_adm === item);
          return admMedidas ? admMedidas.descricao_medida_adm : 'N/A';
        case 2:
          const epiMedidas = medidasEpi.find((i) => i.id_medida === item);
          return epiMedidas ? epiMedidas.nome_medida : 'N/A';
        case 3:
          const epcMedidas = medidasEpc.find((i) => i.id_medida === item);
          return epcMedidas ? epcMedidas.descricao_medida : 'N/A';

        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const tipoDefine = (item) => {
    switch (item) {
      case 1:
        return 'Adm'
      case 2:
        return 'EPI'
      case 3:
        return 'EPC'

      default:
        return 'N/A'
    }
  };

  const handleChangeData = (event) => {
    setData(event.target.value);
  };

  const handleChangeSeveridade = (e) => {
    setSeveridade(e.target.value);
  };

  const handleChangeFrequencia = (e) => {
    setFrequencia(e.target.value);
  };

  const handleConclusaoChange = (event) => {
    setConclusao(event.target.value);
  };

  const handleConclusaoSelect = (item) => {
    if (!item) {
      return toast.warn("Nenhuma conclusão selecionada");
    }
    closeModalConclusoes();
    setConclusao(item.conclusao);
    setAnexo(item.anexo);
  };

  const handleClearConclusao = () => {
    setConclusao('');
    setAnexo('');
  };

  const filteredGlobalSprm = globalSprm.filter((i) => i.fk_setor_id === setorId && i.fk_risco_id === riscoId)

  return (
    <>
      {isVerify && (
        <>
          {/* PopOver */}
          <div className="block m-2 cursor-pointer" onClick={() => setIsVerify(false)}>
            <div className={`bg-orange-50 text-yellow-300 rounded-lg px-6 py-2 ${isVerify ? 'block' : 'hidden'} text-white`}>
              <div className="flex items-center gap-6">
                <div className="">
                  <img src={icon_warn} alt="" />
                </div>
                <div>
                  <h2 className="font-bold text-xl mb-2 mt-2">Risco já Cadastrado</h2>
                  <div>
                    <p className="text-sm">Risco: <span className="text-base font-bold text-yellow-300">{riscoNome}</span> - Porcesso: <span className="text-base font-bold text-yellow-300">{processoNome}</span> - Setor: <span className="text-base font-bold text-yellow-300">{setorNome}</span> - Unidade: <span className="text-base font-bold text-yellow-300">{nomeUnidade}.</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Formulário */}
      {loading && <LoadingScreen />}
      <div className={`flex justify-center ${isVerify ? '' : 'mt-10'}`}>
        <form className="w-full max-w-7xl" ref={user} onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6 p-3">

            <div className="flex w-full items-center">
              {/* Unidade */}
              <div className="w-full md:w-1/4 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                  Unidade:
                </label>
                <div className="flex items-center w-full">
                  {nomeUnidade ? (
                    <>
                      <button
                        className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                        onClick={openModalUnidade}
                      >
                        <p className="font-bold">
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
                      <p className="text-sm font-medium">
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
              <div className="w-full md:w-1/4 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                  Setor:
                </label>
                <div className="flex items-center w-full">
                  {setorNome ? (
                    <>
                      <button
                        className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                        onClick={openModalSetor}
                      >
                        <p className="font-bold">
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
                      <p className="px-2 text-sm font-medium">
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
              {/* Processo */}
              <div className="w-full md:w-1/4 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                  Processo:
                </label>
                <div className="flex items-center w-full">
                  {processoNome ? (
                    <>
                      <button
                        className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                        onClick={openModalProcesso}
                      >
                        <p className="font-bold">
                          {processoNome}
                        </p>
                      </button>
                      <button className="ml-4" onClick={handleClearProcesso}>
                        <img src={icon_sair} alt="" className="h-9" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                      onClick={openModalProcesso}
                    >
                      <p className="px-2 text-sm font-medium">
                        Nenhum Processo Selecionado
                      </p>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={openModalProcesso}
                    className={`flex cursor-pointer ml-4`}
                  >
                    <img src={icon_lupa} className="h-9" alt="Icone adicionar Processo"></img>
                  </button>
                </div>
                <ModalSearchProcesso
                  isOpen={showModalProcesso}
                  onCancel={closeModalProcesso}
                  children={filteredProcessos}
                  setorName={setorNome}
                  onSetorSelect={handleProcessoSelect}
                />
              </div>
              {/* Risco */}
              <div className="w-full md:w-1/4 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                  Risco:
                </label>
                <div className="flex items-center w-full">
                  {riscoNome ? (
                    <>
                      <button
                        className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                        onClick={openModalRisco}
                      >
                        <p className="font-bold">
                          {riscoNome}
                        </p>
                      </button>
                      <button className="ml-4" onClick={handleClearRisco}>
                        <img src={icon_sair} alt="" className="h-9" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                      onClick={openModalRisco}
                    >
                      <p className="px-2 text-sm font-medium">
                        Nenhum Risco Selecionado
                      </p>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={openModalRisco}
                    className={`flex cursor-pointer ml-4`}
                  >
                    <img src={icon_lupa} className="h-9" alt="Icone adicionar Risco"></img>
                  </button>
                </div>
                <ModalSearchRisco
                  isOpen={showModalRisco}
                  onCancel={closeModalRisco}
                  children={filteredRiscos}
                  setorName={riscoNome}
                  onSelect={handleRiscoSelect}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              {/* Data */}
              <div className="w-full md:w-1/4 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Data:
                </label>
                <input
                  className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  type="date"
                  name="data_inventario"
                  value={data}
                  onChange={handleChangeData}
                />
              </div>
              {/* Pessoas Expostas */}
              <div className="w-full md:w-1/4 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Pessoas Expostas:
                </label>
                <input
                  className={`${pessoasExpostas ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  type="tex"
                  name="pessoas_expostas"
                  placeholder="Pessoas Expostas"
                  value={pessoasExpostas}
                  disabled
                />
              </div>
              {/* Consequencias */}
              <div className="w-full md:w-1/4 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Consequências:
                </label>
                <input
                  className={`${consequencia ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  type="text"
                  name="consequencias"
                  placeholder="Consequências"
                  value={consequencia}
                  disabled
                />
              </div>
              {/* Avaliação */}
              <div className="w-full md:w-1/4 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Avaliação
                </label>
                <input
                  className={`${avaliacao ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  type="text"
                  name="avaliacao_risco"
                  placeholder="Avaliação do Risco"
                  value={avaliacao}
                  disabled
                />
              </div>
            </div>

            <div className="flex w-full">
              {/* Limite de Tolerância */}
              <div className="w-full md:w-3/12 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  LT:
                </label>
                <input
                  className={`${limiteTolerancia ? 'bg-gray-50 opacity-50 text-gray-600 cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  type="text"
                  name="limite_tolerancia"
                  placeholder="LT"
                  value={limiteTolerancia}
                  disabled
                  step="any"
                />
              </div>
              {/* Metodologia */}
              <div className="w-full md:w-1/3 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Metodologia:
                </label>
                <input
                  className={`${metodologia ? 'bg-gray-50 opacity-50 text-gray-600 cursor-not-allowed' : ''} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  name="metodologia_risco"
                  placeholder="Metodologia"
                  value={metodologia}
                  disabled
                />
              </div>
              {/* Medição */}
              <div className="w-full md:w-3/12 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Medição:
                </label>
                <input
                  className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white ${medicao === 'N/A' || medicao === "0" ? 'bg-gray-50 opacity-50 text-gray-600 cursor-not-allowed' : ''} ${checkMedicao ? 'bg-gray-50 opacity-50 text-gray-600 cursor-not-allowed' : ''}`}
                  type="number"
                  name="medicao_risco"
                  placeholder="Medição"
                  value={medicao}
                  disabled={medicao === "0" || medicao === "N/A" || checkMedicao}
                  onChange={handleMedicaoChange}
                  step="any"
                />
                <div className={`${medicao === '0' ? '' : ''} flex items-center gap-2 px-1 mb-3 mt-1`}>
                  <input
                    type="checkbox"
                    id="medica_risco"
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                    checked={checkMedicao}
                    onChange={handleMedicaoCheck}
                  />
                  <label className="text-sm font-ligth text-gray-500" htmlFor="medica_risco">Sem Medição</label>
                </div>
              </div>
              {/* Aparelho */}
              <div className={`w-full md:w-3/12 px-3 ${medicao > 0 ? 'opacity-100' : 'opacity-50'}`}>
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                  Aparelho:
                </label>
                <div className="flex items-center w-full">
                  {aparelhoNome ? (
                    <>
                      <button
                        className={`flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text`}
                        onClick={openModalAparelhos}
                      >
                        <p className="font-bold">
                          {aparelhoNome}
                        </p>
                      </button>
                      <button className="ml-4" onClick={handleClearAparelhos}>
                        <img src={icon_sair} alt="" className="h-9" />
                      </button>
                    </>
                  ) : (
                    <button
                      className={`flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text ${medicao > 0 ? '' : 'cursor-auto'}`}
                      onClick={openModalAparelhos}
                      disabled={medicao <= 0}
                    >
                      <p className="truncate text-sm font-medium">
                        Nenhum Aparelho Selecionado
                      </p>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={openModalAparelhos}
                    className={`flex ml-4 ${medicao <= 0 ? 'cursor-auto' : 'cursor-pointer'}`}
                    disabled={medicao <= 0}
                  >
                    <img src={icon_lupa} className="h-9" alt="Icone adicionar Aparelho"></img>
                  </button>
                </div>
                <ModalSearchAparelhos
                  isOpen={showModalAparelhos}
                  onCancel={closeModalAparelhos}
                  children={aparelhos}
                  onSelect={handleAparelhoSelect}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              {/* Frequencia */}
              <div className="w-full md:w-3/12 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Frequência:
                </label>
                <select
                  className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100`}
                  type="text"
                  name="frequencia"
                  value={frequencia}
                  onChange={handleChangeFrequencia}
                >
                  <option value="0"> Selecione uma Frequência</option>
                  <option value="Diaria">Diária</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Quinzenal">Quinzenal</option>
                  <option value="Mensal">Mensal</option>
                  <option value="Semestral">Semestral</option>
                  <option value="Anual">Anual</option>
                </select>
              </div>
              {/* Probabilidade */}
              <div className="w-full md:w-3/12 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Probabilidade:
                </label>
                <select
                  className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                  type="text"
                  name="probabilidade_risco"
                  placeholder="Probabilidade"
                  onChange={handleProbabilidadeChange}
                  value={probabilidade}
                  disabled={probabilidade === "N/A"}
                >
                  <option value="0"> Selecione</option>
                  <option value="1">Muito Baixa</option>
                  <option value="2">Baixa</option>
                  <option value="3">Média</option>
                  <option value="4">Alta</option>
                  <option value="5">Muito Alta</option>
                </select>
              </div>
              {/* Severidade */}
              <div className="w-full md:w-3/12 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Severidade:
                </label>
                <select
                  className={`${severidade ? "opacity-30" : ""} appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                  type="text"
                  name="severidade_risco"
                  value={severidade}
                  onChange={handleChangeSeveridade}
                  disabled={severidade === '0'}
                >
                  <option value="0"> Selecione</option>
                  <option value="1">Muito Baixa</option>
                  <option value="2">Baixa</option>
                  <option value="3">Média</option>
                  <option value="4">Alta</option>
                  <option value="5">Muito Alta</option>
                </select>
              </div>
              {/* Nível */}
              <div className="w-full md:w-3/12 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Nível:
                </label>
                <input
                  className={`appearance-none block w-full rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white ${nivel === "Baixo" ? "bg-green-200" : nivel === "Moderado" ? "bg-yellow-200" : nivel === "Alto" ? "bg-orange-200" : nivel === "Crítico" ? "bg-red-200" : "bg-gray-100"
                    }`}
                  type="text"
                  name="nivel_risco"
                  placeholder="Nível"
                  disabled
                  value={nivel || ""}
                />
              </div>
            </div>

            <div className="w-full flex items-center">
              {/* Descrição das Fontes */}
              <div className={`w-full ${riscoId ? 'md:w-1/3' : 'md:w-1/2'} px-3"`}>
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                  Descrição das Fontes:
                </label>
                <textarea
                  className="resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                  type="text"
                  name="descricao_fontes"
                  value={descricao}
                  placeholder="Descrição das Fontes ou Circunstâncias (Causas)"
                  onChange={handleDescricaoFontesChange}
                />
              </div>
              {/* Comentários */}
              <div className={`w-full ${riscoId ? 'md:w-1/3' : 'md:w-1/2'} px-3`}>
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gcomentarios">
                  Comentários:
                </label>
                <textarea
                  className="resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                  type="text"
                  name="comentarios"
                  placeholder="Comentários..."
                  value={comentarios}
                  onChange={handleComentariosChange}
                />
              </div>
              {/* Comentários */}
              {riscoId && (
                <div className="w-full md:w-1/3 px-3">
                  <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                    Conclusão:
                  </label>
                  <div className="flex items-center w-full">
                    {conclusao ? (
                      <>
                        <textarea
                          className="resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                          type="text"
                          name="conclusao"
                          placeholder="conclusão..."
                          value={conclusao}
                          onChange={handleConclusaoChange}
                        />
                        <button type="button" className="ml-4" onClick={handleClearConclusao}>
                          <img src={icon_sair} alt="" className="h-9" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                          onClick={openModalConclusoes}
                          type="button"
                        >
                          <p className="px-2 text-sm font-medium">
                            Nenhuma Conclusão Selecionada
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={openModalConclusoes}
                          className={`flex cursor-pointer ml-4`}
                        >
                          <img src={icon_lupa} className="h-9" alt="Icone adicionar Conclusão"></img>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>


            {/* Medidas */}
            <div className="border-b border-gray-200 w-full mt-5"></div>
            <div className="text-4xl font-bold text-sky-700 mt-5 mb-5 w-full flex justify-center">
              <h1>Medidas</h1>
            </div>
            <div className="w-full flex">
              {/* Medidas de Controle */}
              <div className="w-full md:w-1/3 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Medidas de Controle:
                </label>
                <div>
                  <button
                    type="button"
                    className="w-full bg-gray-100 px-4 py-2 hover:bg-gray-200 font-semibold text-base rounded-md text-sky-700"
                    onClick={openModalMedidas}
                  >
                    Defina as Medidas
                  </button>
                </div>
                <ModalMedidasDefine
                  isOpen={showModalMedidas}
                  onCancel={closeModalMedidas}
                  companyName={companyName}
                  globalSprm={filteredGlobalSprm}
                  medidasAdm={medidasAdm}
                  medidasEpi={medidasEpi}
                  medidasEpc={medidasEpc}
                  medidasDefine={handleMedidaChange}
                  plano={plano}
                />
              </div>
              {/* Medidas de Controle Aplicadas*/}
              <div className="w-full md:w-1/3 px-3">
                <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-raza_social">
                  Medidas Aplicadas:
                </label>
                {filteredGlobalSprm.filter((c) => c.status && c.status === 'Aplica')
                  .map((item, i) => (
                    <ul key={i}>
                      <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-50">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-sm font-medium text-gray-900">
                              {find(item.fk_medida_id, item.tipo_medida)}
                            </p>
                            <p className="text-sm text-gray-500 truncate"></p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            {tipoDefine(item.tipo_medida)}
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
              </div>
            </div>



            {/* Botões */}
            <div className="w-full px-3 pl-8 flex justify-end mt-10">
              <div className="px-3 pl-8">
                <button onClick={() => handleClear()} className="w-full shadow mt-4 bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                  Limpar
                </button>
              </div>
              <div className="px-3 pl-8">
                <button className={`w-full shadow mt-4 bg-green-600  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${isMedidasSet ? 'hover:bg-green-700' : 'cursor-not-allowed opacity-50'}`} type="submit" disabled={!isMedidasSet}>
                  Adicionar
                </button>
              </div>
            </div>

          </div>
        </form >
        <ModalConclusao
          isOpen={showModalConclusoes}
          onCancel={closeModalConclusoes}
          riscoId={riscoId}
          riscos={riscos}
          onSelect={handleConclusaoSelect}
          ltcat={ltcat}
          lip={lip}
          inventario={invent}
        />
      </div >
    </>
  );
}

export default FrmInventario;