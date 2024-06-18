//Componentes para montar o relatório

export const createTitle = (titulo) => {
  return {
    text: titulo,
    fontSize: 22,
    margin: [0, 0, 0, 10]
  }
}

export const createTableCargo = (item) => {
  return {
    table: {
      headerRows: 1,
      dontBreakRows: true,
      width: 'auto',
      body: [
        [
          { text: 'ID', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Cargo', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Descrição', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Masculinos', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Femininos', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Menores', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Setor', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
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

export const createCargos = (cargosTable, cargosTableFunc, cargosTableSetor) => {
  return {
    table: {
      headerRows: 1,
      dontBreakRows: true,
      width: 'auto',
      body: [
        [
          { text: 'ID', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Cargo', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Descrição', border: [false, false, false, true], fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Funcionários', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
          { text: 'Setor', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 6 },
        ],
        ...cargosTable,
        [
          {
            table: {
              body: [
                [
                  { text: 'Masculino', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 4 },
                  { text: 'Feminino', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 4 },
                  { text: 'Menor', border: [false, false, false, true], alignment: 'center', fillColor: '#eeeeee', fontSize: 4 },
                ],
                ...cargosTableFunc,
              ],
            },
            layout: {
              hLineWidth: function (i, node) { return 0.3; },
              hLineColor: function (i, node) { return '#dee2e6'; },
            },
          },
          ...cargosTableSetor,
        ],
      ],
    },
    layout: {
      hLineWidth: function (i, node) { return 0.3; },
      hLineColor: function (i, node) { return '#dee2e6'; },
      vLineWidth: function (i, node) { return 0; },
      pageOrientation: 'landscape',
      pageBreak: 'after'
    },
  };
};
