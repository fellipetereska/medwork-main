import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import PgrGenerate from "./PgrGenerate/PgrGenerate";
import PlanoGenerate from "./PlanoGenerate/PlanoGenerate";

function GerarLaudo({ inventario, processos, riscos, empresa, unidades, setores, empresaId, plano, medidasAdm, medidasEpi, medidasEpc }) {

  const [filteredInventario, setFilteredInventario] = useState([]);
  const [filteredPlano, setFilteredPlano] = useState([]);

  useEffect(() => {
    try {
      const inventarioFilter = inventario.filter((i) => i.fk_empresa_id === empresaId);
      setFilteredInventario(inventarioFilter);
      const planoFilter = plano.filter((i) => i.fk_empresa_id === empresaId);
      setFilteredPlano(planoFilter)
    } catch (error) {
      toast.warn("Erro ao filtrar dados!")
      console.log("Erro ao filtrar dados!", error);
    }
  }, [empresaId, inventario, plano])


  const handleGenerate = async () => {
    try {
      const inventarioTable = await PgrGenerate({ filteredInventario, processos, riscos, empresa, unidades, setores, empresaId });
      const planoTable = await PlanoGenerate({ filteredPlano, processos, riscos, empresa, unidades, setores, empresaId, medidasAdm, medidasEpi, medidasEpc })

      const content = [
        { text: 'Inventário de Riscos - PGR', fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        inventarioTable,
        { text: 'Plano de Ação', fontSize: 22, bold: true, alignment: 'center', margin: [0, 10, 0, 10] },
        planoTable,
      ]

      const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [10, 50, 10, 40],
        content,
      };

      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10 mb-10">
        <button
          className="bg-teal-600 py-2 px-8 font-semibold text-white rounded-md shadow-md text-lg"
          onClick={handleGenerate}
        >
          Gerar PDF
        </button>
      </div>
    </>
  );
}

export default GerarLaudo;
