// GerarLaudo.jsx
import React, { useEffect, useState } from "react";
import PgrGenerate from "../components/PgrGenerate/PgrGenerate";
import { toast } from "react-toastify";

function GerarLaudo({ inventario, processos, riscos, empresa, unidades, setores, empresaId }) {

  const [filteredInventario, setFilteredInventario] = useState([]);

  useEffect(() => {
    try {
      const filtered = inventario.filter((i) => i.fk_empresa_id === empresaId);
      setFilteredInventario(filtered);
    } catch (error) {
      toast.warn("Erro ao filtrar inventário!")
      console.log("Erro ao filtrar inventario!", error);
    }
  }, [empresaId, inventario])


  const handleGenerate = async () => {
    try {
      const pdfDoc = await PgrGenerate({ filteredInventario, processos, riscos, empresa, unidades, setores, empresaId });

      pdfDoc.download();
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
