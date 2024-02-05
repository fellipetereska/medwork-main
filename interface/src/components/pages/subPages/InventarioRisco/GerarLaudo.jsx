// GerarLaudo.jsx
import React from "react";
import PgrGenerate from "../components/PgrGenerate";

function GerarLaudo({ inventario, processos, riscos, empresa }) {
  const handleGenerate = async () => {
    try {
      const pdfDoc = await PgrGenerate({ inventario, processos, riscos, empresa });

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
