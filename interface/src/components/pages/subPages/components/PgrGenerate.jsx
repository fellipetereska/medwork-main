import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


async function PgrGenerate({ inventario, riscos, processos, empresa }) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        // case 'nome_unidade':
        //   const unidadeEncontrada = unidade.find((c) => c.id_unidade === item);
        //   return unidadeEncontrada ? unidadeEncontrada.nome_unidade : 'N/A';

        // case 'nome_setor':
        //   const setorEncontrado = setor.find((c) => c.id_setor === item);
        //   return setorEncontrado ? setorEncontrado.nome_setor : 'N/A';

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
                return riscoEncontrado.nome_risco;
              case 'grupo_risco':
                return riscoEncontrado.grupo_risco;
              case 'consequencia':
                return riscoEncontrado.danos_saude_risco;
              case 'avaliacao':
                return riscoEncontrado.classificacao_risco;
              case 'limite_tolerancia':
                return riscoEncontrado.limite_tolerancia_risco;
              case 'metodologia':
                return riscoEncontrado.metodologia_risco;
              case 'severidade':
                return riscoEncontrado.severidade_risco;
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

  const reportTitle = [
    {
      text: 'Programa de Gerenciamento de Riscos (PGR)',
      fontSize: 18,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];

  const dados = inventario.map((i) => [
    { text: i.id_inventario, fontSize: 8, margin: [0, 2, 0, 2] },
    { text: i.data_inventario, fontSize: 8, margin: [0, 2, 0, 2] },
    { text: find(i.fk_processo_id, 'descricao_processo'), fontSize: 8, margin: [0, 2, 0, 2] },
    { text: find(i.fk_risco_id, 'nome_risco'), fontSize: 8, margin: [0, 2, 0, 2] },
  ]);

  const details = [
    { text: empresa || "Erro ao buscar nome da empresa" },
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            { text: 'ID', style: 'tableHeader', fontSize: 10 },
            { text: 'Data', style: 'tableHeader', fontSize: 10 },
            { text: 'Processo', style: 'tableHeader', fontSize: 10 },
            { text: 'Risco', style: 'tableHeader', fontSize: 10 },
          ],
          ...dados
        ],

      },
      layout: 'headerLineOnly'
    }
  ];

  const rodape = [];

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: [rodape]
  };

  return pdfMake.createPdf(docDefinitions);

}

export default PgrGenerate