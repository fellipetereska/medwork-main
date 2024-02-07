import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

//Importando os componentes
import { createTitle } from "./ReportComponents";
import { createTablePlano } from "./ReportComponents";


async function PlanoGenerate({ riscos, processos, empresa, unidades, setores, empresaId, filteredPlano, medidasAdm, medidasEpi, medidasEpc }) {
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
  }

  const findMedidas = (item, tipo) => {
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

  const setStatus = (item) => {
    try {
      let fillColor;

      switch (item) {
        case 'Não Realizado':
          fillColor = '#ffc971';

        default:
          fillColor = '#fff'
      }
      return { fillColor };
    } catch (error) {
      console.log("Erro ao definir cor do status!", error)
    }
  }

  const planoTable = filteredPlano.map((i) => [
    { text: i.id_plano, alignment: 'center', fontSize: 8, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: formatData(i.data), alignment: 'center', fontSize: 8, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: find(i.fk_unidade_id, 'nome_unidade'), bold: true, fontSize: 8, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: find(i.fk_setor_id, 'nome_setor'), fontSize: 8, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: find(i.fk_processo_id, 'descricao_processo'), fontSize: 8, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: find(i.fk_risco_id, 'nome_risco'), fontSize: 8, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: findMedidas(i.fk_medida_id, i.tipo_medida), fontSize: 8, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: i.responsavel, alignment: 'center', fontSize: 8, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: i.prazo, alignment: 'center', fontSize: 8, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: i.data_conclusão, alignment: 'center', fontSize: 8, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
    { text: i.status, alignment: 'center', fontSize: 8, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }], fillColor: setStatus(i.status).fillColor },
  ])

  const PlanoAcao = [
    createTablePlano(planoTable)
  ];

  return PlanoAcao;
}

export default PlanoGenerate