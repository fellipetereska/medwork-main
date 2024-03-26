import React, { useEffect, useRef, useState } from "react";
import { connect } from "../../../../services/api";
import { toast } from "react-toastify";
import { IoInformationCircleSharp } from "react-icons/io5";

import LoadingScreen from "../components/LoadingScreen";
import ModalSearchUnidade from "../components/Modal/ModalSearchUnidade";
import ModalSearchSetor from "../components/Modal/ModalSearchSetor";
import ModalSearchProcesso from '../components/Modal/ModalSearchProcesso';
import ModalSearchRisco from '../components/Modal/ModalSearchRisco';
import ModalMedidasDefine from "../components/Modal/ModalMedidasDefine";
import ModalSearchAparelhos from '../components/Modal/ModalSearchAparelhos';
import ModalSearchConclusao from '../components/Modal/ModalSearchConclusao';
import Back from '../../../layout/Back'

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
  const [isMedidasSet, setIsMedidasSet] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  const [filteredInventarioRisco, setFiltereinventarioRisco] = useState([]);
  const [visible, setVisible] = useState(false);

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
  const [data, setData] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [plano, setPlano] = useState(false);
  const [filterConclusao, setFilterConclusao] = useState([]);
  const [filterConclusaoLtcat, setFilterConclusaoLtcat] = useState([]);
  const [filterConclusaoLi, setFilterConclusaoLi] = useState([]);
  const [filterConclusaoLp, setFilterConclusaoLp] = useState([]);
  const [conclusaoLtcat, setConclusaoLtcat] = useState('');
  const [conclusaoLtcatNome, setConclusaoLtcatNome] = useState('');
  const [conclusaoLi, setConclusaoLi] = useState('');
  const [conclusaoLiNome, setConclusaoLiNome] = useState('');
  const [conclusaoLp, setConclusaoLp] = useState('');
  const [conclusaoLpNome, setConclusaoLpNome] = useState('');
  const [ltcat, setLtcat] = useState(false);
  const [lip, setLip] = useState(false);
  const [laudo, setLaudo] = useState('');
  const [laudoTipo, setLaudoTipo] = useState('');

  //Funções do Modal
  //Função para abrir o Modal
  const openModalUnidade = () => setShowModalUnidade(true);
  const openModalSetor = () => setShowModalSetor(true);
  const openModalProcesso = () => setShowModalProcesso(true);
  const openModalRisco = () => setShowModalRisco(true);
  const openModalMedidas = () => setShowModalMedidas(true);
  const openModalAparelhos = () => setShowModalAparelhos(true);
  const openModalConclusoes = () => setShowModalConclusoes(true);
  const openModalConclusaoLtcat = () => {
    setLaudo('ltcat');
    setShowModalConclusoes(true);
    setFilterConclusao(filterConclusaoLtcat);
  }
  const openModalConclusaoLi = () => {
    setLaudo('insalubridade');
    setFilterConclusao(filterConclusaoLi);
    setShowModalConclusoes(true);
  }
  const openModalConclusaoLp = () => {
    setLaudo('periculosidade');
    setFilterConclusao(filterConclusaoLp);
    setShowModalConclusoes(true);
  }
  //Função para fechar o Modal
  const closeModalUnidade = () => setShowModalUnidade(false);
  const closeModalSetor = () => setShowModalSetor(false);
  const closeModalProcesso = () => setShowModalProcesso(false);
  const closeModalRisco = () => setShowModalRisco(false);
  const closeModalAparelhos = () => setShowModalAparelhos(false);
  const closeModalConclusoes = () => {
    setShowModalConclusoes(false);
  }
  const closeModalMedidas = () => {
    getGlobalSprm();
    setShowModalMedidas(false);
  };

  const obterDataFormatada = (dataBanco) => {
    if (dataBanco) {
      const data = new Date(dataBanco);
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
      return `${ano}-${mes}-${dia}`;
    } else {
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      return `${ano}-${mes}-${dia}`;
    }
  };

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
    setData('');
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
    setData(obterDataFormatada(onEdit ? onEdit.data_inventario : null));

    const filteresRiscosMedidas = riscosMedidas.filter((i) => i.fk_risco_id === RiscoId);
    const riscoSelecionado = riscos.find((i) => i.id_risco === RiscoId);

    if (riscoSelecionado) {
      setRiscosInput(riscoSelecionado);
    }

    const filteredConclusao = conclusoes.filter((i) => i.fk_risco_id === RiscoId);

    const filterLtcat = filteredConclusao.filter((i) => i.laudo === 'ltcat');
    const filterLip = filteredConclusao.filter((i) => i.laudo === 'lip');
    const filterLi = filterLip.filter((i) => i.tipo === "Insalubridade" || i.tipo === "Ambos");
    const filterLp = filterLip.filter((i) => i.tipo === "Periculosidade" || i.tipo === "Ambos");

    if (filterLtcat) {
      setFilterConclusaoLtcat(filterLtcat);
    }

    if (filterLi) {
      setFilterConclusaoLi(filterLi);
    }

    if (filterLp) {
      setFilterConclusaoLp(filterLp);
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
      if (!setorId) {
        return
      }
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
            status: 'Não Aplicavel',
          }),
        });

        if (!adicionarResponse.ok) {
          throw new Error(`Erro ao adicionar medida. Status: ${adicionarResponse.status}`);
        }

        const adicionarData = await adicionarResponse.json();
        toast.success("Medidas Adicionadas com sucesso!");
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
      setLtcat('');
    } else {
      setAvaliacao(risco.classificacao_risco);
      setLimiteTolerancia(risco.limite_tolerancia_risco || '0');
      setConsequencia(risco.danos_saude_risco);
      setMetodologia(risco.metodologia_risco);
      setSeveridade(risco.severidade_risco);
      risco.ltcat_risco > 0 ? setLtcat(true) : setLtcat(false);
      risco.lip_risco > 0 ? setLip(true) : setLip(false);

      if (risco.classificacao_risco === "Qualitativo") {
        setMedicao("0");
        setCheckMedicao(true);
      } else {
        setMedicao('');
        setCheckMedicao(false);
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
    if (onEdit) {
      try {
        if (onEdit.fk_unidade_id) {
          const unidadeSelect = unidades.find((i) => i.id_unidade === onEdit.fk_unidade_id);
          handleUnidadeSelect(onEdit.fk_unidade_id, unidadeSelect.nome_unidade);
          if (onEdit.fk_setor_id) {
            const setorSelect = setores.find((i) => i.id_setor === onEdit.fk_setor_id);
            handleSetorSelect(onEdit.fk_setor_id, setorSelect.nome_setor);
            if (onEdit.fk_processo_id) {
              const processoSelect = processos.find((i) => i.id_processo === onEdit.fk_processo_id);
              handleProcessoSelect(onEdit.fk_processo_id, processoSelect.nome_processo);
              if (setorId, onEdit.fk_risco_id) {
                const riscoSelect = riscos.find((i) => i.id_risco === onEdit.fk_risco_id);
                handleRiscoSelect(onEdit.fk_risco_id, riscoSelect.nome_risco);
              }
            }
          }
        }

        setMedicao(onEdit.medicao || '0');

        if (onEdit.fk_aparelho_id) {
          const aparelhoSelect = aparelhos.find((i) => i.id_aparelho === onEdit.fk_aparelho_id);
          handleAparelhoSelect(onEdit.fk_aparelho_id, aparelhoSelect.nome_aparelho);
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

        if (onEdit.conclusao_ltcat) {
          setLtcat(true);
          setConclusaoLtcat(onEdit.conclusao_ltcat);
        }
        if (onEdit.conclusao_li) {
          setLip(true);
          setConclusaoLi(onEdit.conclusao_li);
        }
        if (onEdit.conclusao_lp) {
          setLip(true);
          setConclusaoLtcat(onEdit.conclusao_lp);
        }

        setIsVerify(false);
        setIsMedidasSet(true);
      } catch (error) {
        toast.error("Erro ao buscar os dados!");
        console.error("Erro ao buscar dados para edição", error);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [onEdit, setorId]);

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
    console.log(data)
    try {
      const inventarioData = {
        data_inventario: data || '',
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
        frequencia: frequencia || '',
        fk_aparelho_id: aparelhoId || '',
        comentarios: comentarios || '',
        conclusao_ltcat: conclusaoLtcat || '',
        conclusao_li: conclusaoLi || '',
        conclusao_lp: conclusaoLp || '',
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
    setCheckMedicao(false);
    setProbabilidade('');
    setNivel('');
    setDescricao('');
    setOnEdit(null);
    setIsMedidasSet(false);
    setFrequencia('');
    setIsVerify(false);
    setData('');
    handleClearConclusaoLtcat();
    handleClearConclusaoLi();
    handleClearConclusaoLp();
  };

  const handleDescricaoFontesChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleComentariosChange = (event) => {
    setComentarios(event.target.value);
  };

  const handleMedicaoChange = (event) => {
    setMedicao(event.target.value);
    if (event.target.value === '0') {
      setCheckMedicao(true);
    }
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

  const handleConclusaoLtcatChange = (event) => {
    setConclusaoLtcat(event.target.value);
  };

  const handleConclusaoLiChange = (event) => {
    setConclusaoLi(event.target.value);
  };

  const handleConclusaoLpChange = (event) => {
    setConclusaoLp(event.target.value);
  };

  const handleConclusaoLtcatSelect = (conclusao, nome) => {
    if (!conclusao) {
      return toast.warn("Nenhuma conclusão selecionada");
    }

    setConclusaoLtcatNome(nome)
    setConclusaoLtcat(conclusao);
    closeModalConclusoes();
    setLaudo('');
  };

  const handleConclusaoLiSelect = (conclusao, nome) => {
    if (!conclusao) {
      return toast.warn("Nenhuma conclusão selecionada");
    }

    setConclusaoLiNome(nome)
    setConclusaoLi(conclusao);
    closeModalConclusoes();
    setLaudo('');
  };

  const handleConclusaoLpSelect = (conclusao, nome) => {
    if (!conclusao) {
      return toast.warn("Nenhuma conclusão selecionada");
    }

    setConclusaoLpNome(nome);
    setConclusaoLp(conclusao);
    closeModalConclusoes();
    setLaudo('');
  };

  const handleClearConclusaoLtcat = () => {
    setConclusaoLtcat('');

  };

  const handleClearConclusaoLi = () => {
    setConclusaoLi('');

  };

  const handleClearConclusaoLp = () => {
    setConclusaoLp('');

  };

  const filteredGlobalSprm = globalSprm.filter((i) => i.fk_setor_id === setorId && i.fk_risco_id === riscoId)

  return (
    <>
      {(isVerify && !onEdit) && (
        <>
          {/* PopOver */}
          <div className="block m-2 cursor-pointer" onClick={() => setIsVerify(false)}>
            <div className={`bg-orange-50 text-gray-600 rounded-lg px-6 py-2 ${isVerify ? 'block' : 'hidden'}`}>
              <div className="flex items-center gap-6">
                <div className="">
                  <img src={icon_warn} alt="" />
                </div>
                <div>
                  <h2 className="font-medium">Risco já Cadastrado</h2>
                  <div>
                    <p className="font-normal text-gray-700">Risco: {riscoNome} - Porcesso: {processoNome} - Setor: {setorNome}- Unidade: {nomeUnidade}.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Popover */}
      <div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
        <div className="fixed z-50 m-2 -mt-4">
          <div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Empresa</h2>
            <div>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                A página de Invenário de Risco foi cuidadosamente desenvolvida para proporcionar uma maneira eficaz e organizada de registrar as informações fundamentais sobre os riscos da empresa.
              </p>
              <p className="mb-2 text-justify font-light text-gray-300 flex">
                No centro da tela, um formulário claro e de fácil compreensão está disponível para o cadastro de informações dos riscos da empresa. Seguindo o mesmo padrão intuitivo das demais páginas, esse formulário facilita a inserção e a modificação de dados relevantes relacionados aos riscos. O formulário e separado em 3 etapas, a primeira etapa e a seleção da Unidade, do Setor, do Processo e do Risco (lembrando que todos os dados devem ser vinculados previamente), após teremos o campo de data. Os proximos campos são de preenchimento automático, Pessoas Expostas, são os funcionários dos cargos vinculados a esse setor, as Consequências, Avaliação, LT, Metodologia, são campos ja cadastrados previamente no risco, a medição fica disponivel caso o risco seja quantitativo, podendo ser desativada caso não haja medição, o aparelho fica disponivel assim quem a medição foi incluida, o campo de frequência e probabilidade são se seleção, a severidade vem do risco e o nivel e a probabilidade x severidade, a descrição das fontes e um campo de texto e os comentários também. A 2 etapada e a de conclusões, caso esse risco tenha uma conclusão o sistema libera automáticamente 3 campos para colocar a conclusão, também já previamente cadastrada no risco. A 3 etapa e a das medidas, todo risco já tem medidas vinculadas a ele, nessa parte você utilizando o botao de definir medidas, deve selecionar no select da tabela qual a referencia desse risco nessa empresa, se ela Aplica, Não Aplica ou se essa medida não é Aplicavel a essa empresa. Complementando a página, uma tabela organizada exibe os dados do inventário. Nessa tabela, é apresentado um botão de edição, caso necessário arrumar alguma informação.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="grid grid-cols-3 mb-10 mt-10">
        {/* Botão para voltar */}
        <div className="">
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-extrabold text-sky-700">Inventário de Risco</h1>
        </div>
        <div className="flex justify-end w-3/4 items-center">
          <div onMouseEnter={() => setVisible(true)}>
            <IoInformationCircleSharp className='text-sky-700' />
          </div>
        </div>
      </div>

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
              <div className={`w-full md:w-1/2 px-3`}>
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
              <div className={`w-full md:w-1/2 px-3`}>
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
            </div>

            {/* Conclusões */}
            {(riscoId && ltcat || lip) && (
              <>
                <div className="border-b border-gray-200 w-full mt-5"></div>
                <div className="text-4xl font-bold text-sky-700 mt-5 mb-5 w-full flex justify-center">
                  <h1>Conclusões</h1>
                </div>
                <div className="w-full flex">

                  {/* Conclusão LTCAT */}
                  {ltcat && (
                    <div className="w-full md:w-1/3 px-3">
                      <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="conclusaoLtcat">
                        Conclusão LTCAT:
                      </label>
                      <div className="flex items-center w-full">
                        {conclusaoLtcat ? (
                          <>
                            <div className="w-full">
                              <p className="text-xs">Conclusão: <span className="text-sm font-semibold">{conclusaoLtcatNome}</span></p>
                              <div className="flex w-full">
                                <textarea
                                  className="resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                                  type="text"
                                  id="conclusaoLtcat"
                                  name="conclusaoLtcat"
                                  value={conclusaoLtcat}
                                  onChange={handleConclusaoLtcatChange}
                                />
                                <button type="button" className="ml-4" onClick={handleClearConclusaoLtcat}>
                                  <img src={icon_sair} alt="" className="h-9" />
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                              onClick={openModalConclusaoLtcat}
                              type="button"
                            >
                              <p className="px-2 text-sm font-medium">
                                Nenhuma Conclusão Selecionada
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={openModalConclusaoLtcat}
                              className={`flex cursor-pointer ml-4`}
                            >
                              <img src={icon_lupa} className="h-9" alt="Icone adicionar Conclusão"></img>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Conclusão LI */}
                  {lip && (
                    <div className="w-full md:w-1/3 px-3">
                      <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="conclusaoLi">
                        Conclusão Insalubridade:
                      </label>
                      <div className="flex items-center w-full">
                        {conclusaoLi ? (
                          <>
                            <div className="w-full">
                              <p className="text-xs">Conclusão: <span className="text-sm font-semibold">{conclusaoLiNome}</span></p>
                              <div className="flex w-full">
                                <textarea
                                  className="resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                                  type="text"
                                  id="conclusaoLi"
                                  name="conclusaoLi"
                                  value={conclusaoLi}
                                  onChange={handleConclusaoLiChange}
                                />
                                <button type="button" className="ml-4" onClick={handleClearConclusaoLi}>
                                  <img src={icon_sair} alt="" className="h-9" />
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                              onClick={openModalConclusaoLi}
                              type="button"
                            >
                              <p className="px-2 text-sm font-medium">
                                Nenhuma Conclusão Selecionada
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={openModalConclusaoLi}
                              className={`flex cursor-pointer ml-4`}
                            >
                              <img src={icon_lupa} className="h-9" alt="Icone adicionar Conclusão"></img>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Conclusão LP */}
                  {lip && (
                    <div className="w-full md:w-1/3 px-3">
                      <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="conclusaoLp">
                        Conclusão Periculosidade:
                      </label>
                      <div className="flex items-center w-full">
                        {conclusaoLp ? (
                          <>
                            <div className="w-full">
                              <p className="text-xs">Conclusão: <span className="text-sm font-semibold">{conclusaoLpNome}</span></p>
                              <div className="flex w-full">
                                <textarea
                                  className="resize-none appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                                  type="text"
                                  id="conclusaoLp"
                                  name="conclusaoLp"
                                  value={conclusaoLp}
                                  onChange={handleConclusaoLpChange}
                                />
                                <button type="button" className="ml-4" onClick={handleClearConclusaoLp}>
                                  <img src={icon_sair} alt="" className="h-9" />
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                              onClick={openModalConclusaoLp}
                              type="button"
                            >
                              <p className="px-2 text-sm font-medium">
                                Nenhuma Conclusão Selecionada
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={openModalConclusaoLp}
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
                <ModalSearchConclusao
                  isOpen={showModalConclusoes}
                  onCancel={closeModalConclusoes}
                  onSelectLtcat={handleConclusaoLtcatSelect}
                  onSelectLi={handleConclusaoLiSelect}
                  onSelectLp={handleConclusaoLpSelect}
                  laudo={laudo}
                  conclusao={filterConclusao}
                />
              </>
            )}

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
      </div >
    </>
  );
}

export default FrmInventario;