//Componentes para montar o relatório

export const createTitle = (titulo) => {
  return {
    text: titulo,
    fontSize: 22,
    margin: [0, 0, 0, 10]
  }
}

export const createTableInventario = (item) => {
  return {
    table: {
      headerRows: 1,
      width: 'auto',
      body: [
        [
          { text: 'ID', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Data', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Unidade', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Setor', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Processo', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Risco', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Tipo', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Consequência', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Fontes', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Pessoas Expostas', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Avaliação', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Mediação', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Limite de Tolerância', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Metodologia', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Medidas', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Probabilidade', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Severidade', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Nível', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Comentários', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
        ],
        ...item
      ],
    },
    layout: {
      hLineWidth: function (i, node) { return 0.3; },
      hLineColor: function (i, node) { return '#dee2e6'; },
    },
  };
}

export const createTablePlano = (item) => {
  return {
    table: {
      headerRows: 1,
      width: 'auto',
      body: [
        [
          { text: 'ID', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Data', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Unidade', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Setor', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Responsável', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Processo', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Risco', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Medida', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Prazo', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Data de Conclusão', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 10 },
          { text: 'Status', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 10 },
        ],
        ...item
      ],
    },
    layout: {
      hLineWidth: function (i, node) { return 0.3; },
      hLineColor: function (i, node) { return '#dee2e6'; },
    },
  };
}