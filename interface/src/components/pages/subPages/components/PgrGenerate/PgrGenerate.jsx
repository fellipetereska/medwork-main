import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

//Importando os componentes
import { createTitle } from "./ReportComponents";
import { createTableInventario } from "./ReportComponents";


async function PgrGenerate({ filteredInventario, riscos, processos, empresa, unidades, setores, empresaId }) {
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
                return riscoEncontrado.limite_tolerancia_risco|| "N/A";
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
  }

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

      switch (item) {
        case 1:
          fillColor = "#d8f3dc";
          return { text: "Muito Baixa", fillColor };
        case 2:
          fillColor = "#caf0f8";
          return { text: "Baixa", fillColor };
        case 3:
          fillColor = "#fff6cc";
          return { text: "Média", fillColor };
        case 4:
          fillColor = "ffc971";
          return { text: "Alta", fillColor };
        case 5:
          fillColor = "#fcb9b2";
          return { text: "Muito Alta", fillColor };
        default:
          fillColor = "white";
          return { text: "N/A", fillColor };
      }
    } catch (error) {
      console.log("Erro ao converter Probabilidade/Severidade!", error);
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
    { text: i.id_inventario, alignment: 'center', fontSize: 5, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: formatData(i.data_inventario), alignment: 'center', bold: true, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_unidade_id, 'nome_unidade'), bold: true, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_setor_id, 'nome_setor'), fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_processo_id, 'descricao_processo'), fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'nome_risco'), fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'grupo_risco'), alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'consequencia'), fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.fontes, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.pessoas_expostas, alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'avaliacao'), alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.medicao, alignment: 'center' + " " + find(i.fk_risco_id, 'unidade_medida'), alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'limite_tolerancia') + " " + find(i.fk_risco_id, 'unidade_medida'), alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_risco_id, 'metodologia'), fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: convertMedidas(i.medidas), fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: convertProbSev(i.probabilidade), alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: convertProbSev(i.probabilidade).fillColor },
    { text: convertProbSev(find(i.fk_risco_id, 'severidade')), alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: convertProbSev(find(i.fk_risco_id, 'severidade')).fillColor },
    { text: convertNivel(i.nivel), alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: convertNivel(i.nivel).fillColor },
    { text: i.comentarios, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
  ]);

  const inventarioRiscos = [
    createTableInventario(inventarioTable)
  ];

  const titlePage = [
    {
      text: 'Inventário de Riscos - PGR',
      fontSize: 22,
      bold: true,
      alignment: 'center',
    }
  ];

  const rodape = [];

  const docDefinitions = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [10, 50, 10, 40],

    header: [titlePage],
    content: inventarioRiscos,
    footer: [rodape]
  };

  return pdfMake.createPdf(docDefinitions);
}

export default PgrGenerate