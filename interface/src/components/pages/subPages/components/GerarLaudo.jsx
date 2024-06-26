import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import PgrGenerate from "./PgrGenerate/InentarioGenerate/InventarioGenerate";
import PlanoGenerate from "./PgrGenerate/PlanoGenerate/PlanoGenerate";
import CargosGenerate from "./PgrGenerate/CargosGenerate/CargosGenerate";
import ModalSearchSetor from "./Modal/ModalSearchSetor";
import ModalSearchUnidade from "./Modal/ModalSearchUnidade"

import icon_sair from '../../../media/icon_sair.svg'
import icon_lupa from '../../../media/icon_lupa.svg'

function GerarLaudo({
  inventario, plano,
  unidades, setores, cargos, processos, riscos,
  empresa, empresaId,
  medidasAdm, medidasEpi, medidasEpc,
}) {

  const [filteredInventario, setFilteredInventario] = useState([]);
  const [filteredPlano, setFilteredPlano] = useState([]);
  const [filteredSetores, setFilteredSetores] = useState([]);
  const [filteredUnidade, setFilteredUnidades] = useState([]);

  const [showModalUnidade, setShowModalUnidade] = useState(false);
  const [showModalSetor, setShowModalSetor] = useState(false);

  const [unidadeId, setUnidadeId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [nomeUnidade, setNomeUnidade] = useState('');
  const [setorNome, setSetorNome] = useState('');

  useEffect(() => {
    try {
      // Filtrando o inventario pelo id da Empresa
      const inventarioFilter = inventario.filter((i) => i.fk_empresa_id === empresaId);
      setFilteredInventario(inventarioFilter);

      // Filtrando o plano de ação pelo id da Empresa 
      const planoFilter = plano.filter((i) => i.fk_empresa_id === empresaId);
      setFilteredPlano(planoFilter);

    } catch (error) {
      toast.warn("Erro ao filtrar dados!")
      console.log("Erro ao filtrar dados!", error);
    }
  }, [empresaId, inventario, plano]);

  useEffect(() => {
    if (showModalSetor && unidadeId) {
      const filtered = setores.filter((i) => i.fk_unidade_id === unidadeId);
      setFilteredSetores(filtered);
    }
  }, [showModalSetor, unidadeId, setores]);

  const handleGenerate = async () => {
    try {
      const inventarioTable = await PgrGenerate({ filteredInventario, processos, riscos, empresa, unidades, setores, empresaId });
      const planoTable = await PlanoGenerate({ filteredPlano, processos, riscos, empresa, unidades, setores, empresaId, medidasAdm, medidasEpi, medidasEpc });
      const cargosGenerate = await CargosGenerate({ cargos, unidades, setores, empresaId });

      const content = [
        { text: 'Cargos', fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 50] },
        ...cargosGenerate.map(component => ({ ...component, pageOrientation: 'landscape', pageBreak: 'after' })),
        { text: 'Inventário de Riscos - PGR', fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 50] },
        ...inventarioTable.map(component => ({ ...component, pageOrientation: 'landscape', pageBreak: 'after' })),
        { text: 'Plano de Ação', fontSize: 22, bold: true, alignment: 'center', margin: [0, 10, 0, 50] },
        ...planoTable,
      ]

      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [10, 50, 10, 40],
        content,
      };

      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  //Funções do Modal
  //Função para abrir o Modal
  const openModalUnidade = () => setShowModalUnidade(true);
  const openModalSetor = () => setShowModalSetor(true);
  //Função para fechar o Modal
  const closeModalUnidade = () => setShowModalUnidade(false);
  const closeModalSetor = () => setShowModalSetor(false);

  // Função para atualizar a Unidade
  const handleUnidadeSelect = (unidadeId, nomeUnidade) => {
    closeModalUnidade();
    setUnidadeId(unidadeId)
    setNomeUnidade(nomeUnidade)
    handleClearSetor();
    const inventarioFilter = inventario.filter((i) => i.fk_unidade_id === unidadeId);
    setFilteredInventario(inventarioFilter);
    const planoFilter = plano.filter((i) => i.fk_unidade_id === unidadeId);
    setFilteredPlano(planoFilter);
    const unidadesFilter = unidades.filter((i) => i.id_unidade === unidadeId);
    setFilteredUnidades(unidadesFilter);
  };

  const handleClearUnidade = () => {
    setUnidadeId(null);
    setNomeUnidade(null);
    handleClearSetor();
    setFilteredSetores([]);
  };

  const handleSetorSelect = (SetorId, SetorName) => {
    closeModalSetor();
    setSetorId(SetorId);
    setSetorNome(SetorName);

    const inventarioFilter = inventario.filter((i) => i.fk_setor_id === setorId);
    setFilteredInventario(inventarioFilter);
    const planoFilter = plano.filter((i) => i.fk_setor_id === setorId);
    setFilteredPlano(planoFilter);
    const setorFilter = setores.filter((i) => i.id_setor === SetorId);
    setFilteredSetores(setorFilter);
  };

  const handleClearSetor = () => {
    setSetorId(null);
    setSetorNome(null);
  }


  return (
    <>
      {/* Titulo */}
      <div className="flex justify-center items-center mt-12 mb-10">
        <h1 className="text-3xl font-extrabold text-sky-700">Gerar Laudos</h1>
      </div>

      {/* Form */}
      <div className="flex justify-center mt-10">
        <form className="w-full max-w-7xl">
          <div className="flex flex-wrap -mx-3 mb-6 p-3">
            {/* Unidade */}
            <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                Unidade:
              </label>
              <div className="flex items-center w-full">
                {nomeUnidade ? (
                  <>
                    <button
                      className="flex appearance-none w-full hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                      onClick={openModalUnidade}
                    >
                      <p className="font-bold w-full">
                        {nomeUnidade}
                      </p>
                    </button>
                    <button className="ml-4" onClick={handleClearUnidade}>
                      <img src={icon_sair} alt="" className="h-9" />
                    </button>
                  </>
                ) : (
                  <button
                    className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                    onClick={openModalUnidade}
                  >
                    <p className="text-sm font-medium w-full">
                      Nenhuma Unidade Selecionado
                    </p>
                  </button>
                )}
                <button
                  type="button"
                  onClick={openModalUnidade}
                  className={`flex cursor-pointer ml-4`}
                >
                  <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
                </button>
              </div>
              <ModalSearchUnidade
                isOpen={showModalUnidade}
                onCancel={closeModalUnidade}
                children={unidades}
                onContactSelect={handleUnidadeSelect}
              />
            </div>
            {/* Setor */}
            <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
                Setor:
              </label>
              <div className="flex items-center w-full">
                {setorNome ? (
                  <>
                    <button
                      className="flex w-full appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                      onClick={openModalSetor}
                    >
                      <p className="font-bold w-full">
                        {setorNome}
                      </p>
                    </button>
                    <button className="ml-4" onClick={handleClearSetor}>
                      <img src={icon_sair} alt="" className="h-9" />
                    </button>
                  </>
                ) : (
                  <button
                    className="flex w-full appearance-none text-gray-400 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                    onClick={openModalSetor}
                  >
                    <p className="px-2 text-sm font-medium w-full">
                      Nenhum Setor Selecionado
                    </p>
                  </button>
                )}

                <button
                  type="button"
                  onClick={openModalSetor}
                  className={`flex cursor-pointer ml-4`}
                >
                  <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
                </button>
              </div>
              <ModalSearchSetor
                isOpen={showModalSetor}
                onCancel={closeModalSetor}
                children={filteredSetores}
                onContactSelect={handleSetorSelect}
              />
            </div>
          </div>
        </form>
      </div>

      {/* Botão de Gerar Laudo */}
      <div className="flex justify-center mt-10 mb-10">
        <button
          className="bg-teal-600 py-2 px-8 font-semibold text-white rounded-md shadow-md text-lg"
          onClick={handleGenerate}
        >
          Gerar PGR
        </button>
      </div>
    </>
  );
}

export default GerarLaudo;
