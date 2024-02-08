import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { createTableCargo, createCargos } from "./ReportComponents";

async function PgrGenerate({
  empresaId, unidades, setores, cargos,
}) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const unidadesAll = unidades.filter((i) => i.fk_empresa_id === empresaId);

  const unidadesIds = unidadesAll.map((i) => i.id_unidade);

  const setoresIds = setores.filter((i) => unidadesIds.includes(i.fk_unidade_id));

  const setoresIdsCargos = setoresIds.map((setor) => setor.id_setor);
  const filterIdCargo = cargos.filter((cargo) => setoresIdsCargos.includes(cargo.fk_setor_id));

  const find = (item) => {
    try {
      if (!item) {
        return 'N/A';
      }

      const setoresEncontrados = setores.find((c) => c.id_setor === item);
      return setoresEncontrados ? setoresEncontrados.nome_setor : 'N/A';

    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const cargosTable = filterIdCargo.map((i) => [
    { text: i.id_cargo || 'N/A', alignment: 'center', fontSize: 5, bold: true, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.nome_cargo || 'N/A', alignment: 'center', bold: true, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.descricao || 'N/A', bold: true, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.func_masc || 0, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.func_fem || 0, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: i.func_menor || 0, fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
    { text: find(i.fk_setor_id) || 'N/A', alignment: 'center', fontSize: 5, border: [false, false, false, { color: '#666', width: 0.5 }] },
  ]);

  const cargosData = [
    createTableCargo(cargosTable),
  ];

  return cargosData;
}

export default PgrGenerate;
