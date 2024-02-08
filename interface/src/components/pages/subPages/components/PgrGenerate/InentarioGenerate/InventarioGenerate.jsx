import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { createTableInventario } from "./ReportComponents";

async function PgrGenerate({
  filteredInventario,
  riscos,
  processos,
  unidades,
  setores,
}) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 'nome_unidade':
          const unidadeEncontrada = unidades.find((c) => c.id_unidade === item);
          return unidadeEncontrada ? unidadeEncontrada.nome_unidade : 'N/A';

        case 'nome_setor':
          const setorEncontrado = setores.find((c) => c.id_setor === item);
          return setorEncontrado ? setorEncontrado.nome_setor : 'N/A';

        case 'descricao_processo':
          const processoEncontrado = processos.find((c) => c.id_processo === item);
          return processoEncontrado ? processoEncontrado.descricao : 'N/A';

        case 'nome_risco':
        case 'grupo_risco':
        case 'consequencia':
        case 'avaliacao':
        case 'limite_tolerancia':
        case 'metodologia':
        case 'severidade':
        case 'unidade_medida':
          const riscoEncontrado = riscos.find((c) => c.id_risco === item);
          if (riscoEncontrado) {
            switch (tipo) {
              case 'nome_risco':
                return riscoEncontrado.nome_risco || "N/A";
              case 'grupo_risco':
                return riscoEncontrado.grupo_risco || "N/A";
              case 'consequencia':
                return riscoEncontrado.danos_saude_risco || "N/A";
              case 'avaliacao':
                return riscoEncontrado.classificacao_risco || "N/A";
              case 'limite_tolerancia':
                return riscoEncontrado.limite_tolerancia_risco || "N/A";
              case 'metodologia':
                return riscoEncontrado.metodologia_risco || "N/A";
              case 'severidade':
                return riscoEncontrado.severidade_risco || "N/A";
              case 'unidade_medida':
                return riscoEncontrado.unidade_medida_risco;
            }
          } else {
            return 'N/A';
          }
        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const formatData = (item) => {
    try {
      const data_formatada = new Date(item).toLocaleDateString('pr-BR');
      return data_formatada;
    } catch (error) {
      console.log("Erro ao formatar data!", error);
    }
  };

  const convertMedidas = (item) => {
    try {
      const medidasArray = JSON.parse(item);
      return medidasArray.map(({ nome, tipo }) => `${tipo}: ${nome}`).join('\n');
    } catch (error) {
      console.error("Erro ao converter medidas:", error);
      return 'N/A';
    }
  };

  const convertProbSev = (item) => {
    try {
      let fillColor;
      let text;

      switch (item) {
        case 1:
          fillColor = "#d8f3dc";
          text = "Muito Baixa";
          break;
        case 2:
          fillColor = "#caf0f8";
          text = "Baixa";
          break;
        case 3:
          fillColor = "#fff6cc";
          text = "Média";
          break;
        case 4:
          fillColor = "#ffc971";
          text = "Alta";
          break;
        case 5:
          fillColor = "#fcb9b2";
          text = "Muito Alta";
          break;
        default:
          fillColor = "white";
          text = "N/A";
      }

      return { text, fillColor };
    } catch (error) {
      console.log("Erro ao converter Probabilidade/Severidade!", error);
      return { text: "N/A", fillColor: "white" };
    }
  };

  const convertNivel = (item) => {
    try {
      let fillColor;

      if (item >= 1 && item <= 6) {
        fillColor = "#d8f3dc";
        return { text: "Baixo", fillColor };
      } else if (item >= 8 && item <= 12) {
        fillColor = "#fff6cc";
        return { text: "Moderado", fillColor };
      } else if (item >= 15 && item <= 16) {
        fillColor = "#ffc971";
        return { text: "Alto", fillColor };
      } else if (item >= 19) {
        fillColor = "#fcb9b2";
        return { text: "Crítico", fillColor };
      } else {
        fillColor = "white";
        return { text: "N/A", fillColor };
      }
    } catch (error) {
      console.log("Erro ao converter Nível!", error);
    }
  };

  const inventarioTable = filteredInventario.map((i) => [
    { text: i.id_inventario || '', alignment: 'center', fontSize: 5, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: formatData(i.data_inventario) || 'N/A', alignment: 'center', bold: true, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_unidade_id, 'nome_unidade') || 'N/A', bold: true, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_setor_id, 'nome_setor') || 'N/A', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_processo_id, 'descricao_processo') || 'N/A', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'nome_risco') || 'N/A', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'grupo_risco') || 'N/A', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'consequencia') || 'N/A', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.fontes || 'N/A', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.pessoas_expostas || 'N/A', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'avaliacao') || 'N/A', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.medicao + " " + find(i.fk_risco_id, 'unidade_medida') || 'N/A', alignment: 'center', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'limite_tolerancia') + " " + find(i.fk_risco_id, 'unidade_medida') || 'N/A', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'metodologia') || 'N/A', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: convertMedidas(i.medidas) || 'N/A', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { ...convertProbSev(i.probabilidade) || 'N/A', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: convertProbSev(i.probabilidade).fillColor },
    { ...convertProbSev(find(i.fk_risco_id, 'severidade')) || 'N/A', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: convertProbSev(find(i.fk_risco_id, 'severidade')).fillColor },
    { ...convertNivel(i.nivel) || 'N/A', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.comentarios || '', alignment: 'center', fontSize: 5, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }] },
  ]);

  const inventarioRiscos = [
    createTableInventario(inventarioTable),
  ];

  return inventarioRiscos;
}

export default PgrGenerate;
