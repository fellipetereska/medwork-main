import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from '../../../../services/api' //Conexão com o banco de dados
import icon_lupa from '../../../media/icon_lupa.svg'
import icon_sair from '../../../media/icon_sair.svg'
import ModalSearchSetor from '../components/Modal/ModalSearchSetor'


function FrmCadastroCargo({ onEdit, setOnEdit, getCargo, set, getSetor }) {

  // Instanciando a variavel que vai referenciar o formulario
  const ref = useRef(null);
  const [setor, setSetor] = useState(null);
  const [setorId, setSetorId] = useState(null);
  const [setorNome, setSetorNome] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    //Adicionando o setor recebido do CadastroCargo.jsx na variavel setor
    setSetor(getSetor);
  })

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      //Passando o dado do input para a props
      user.nome_cargo.value = onEdit.nome_cargo || '';
      user.descricao.value = onEdit.descricao || '';
      user.func_masc.value = onEdit.func_masc || '';
      user.func_fem.value = onEdit.func_fem || '';
      user.func_menor.value = onEdit.func_menor || '';

      if (setor && onEdit.fk_setor_id) {
        setSetorId(onEdit.fk_setor_id);
        setSetorNome(setor);
      } else {
        setSetorId(null);
        setSetorNome(null);
      }
    }
  }, [onEdit, setor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome_cargo.value) {
      return toast.warn("Preencha Todos os Campos!")
    }
    try {
      const cargoData = {
        nome_cargo: user.nome_cargo.value || null,
        descricao: user.descricao.value || null,
        func_masc: user.func_masc.value || null,
        func_fem: user.func_fem.value || null,
        func_menor: user.func_menor.value || null,
        fk_setor_id: setorId || null,
      }

      if (onEdit) {
        //Caso já tiver o cadastro ele vai colocar as opções para editar
        await supabase
          .from("cargo")
          .upsert([
            {
              id_cargo: onEdit.id_cargo,
              ...cargoData,
            }
          ]);
        toast.success(`Cargo ${onEdit.nome_cargo} atualizado com sucesso!`);
      } else {
        const { error } = await supabase
          .from("cargo").upsert([cargoData]);

        if (error) {
          toast.error("Erro ao inserir Cargo, veifique o console!");
          console.log("Erro ao verificar Cargo: ", error);
          throw error;
        }

        toast.success("Cargo inserido com sucesso!");
      }
    } catch (error) {
      console.log(error)
    }

    user.nome_cargo.value = "";
    user.descricao.value = "";
    user.func_masc.value = "";
    user.func_fem.value = "";
    user.func_menor.value = "";
    setOnEdit(null);
    setSetorId(null);
    setSetorNome(null);

    getCargo();
  }

  const handleClear = () => {
    // Limpa todos os campos do formulário
    const user = ref.current;
    user.nome_cargo.value = "";
    user.descricao.value = "";
    user.fuc_masc.value = "";
    user.func_fem.value = "";
    user.func_menor.value = "";
    setOnEdit(null);
    setSetorId(null);
    setSetorNome(null);
  };

  //Funções do Modal
  //Função para abrir o Modal
  const openModal = () => setShowModal(true);
  //Função para fechar o Modal
  const closeModal = () => setShowModal(false);

  // Função para atualizar o Id Setor
  const handleSetorSelect = (SetorId, SetorName) => {
    closeModal();
    setSetorId(SetorId)
    setSetorNome(SetorName)
  };

  const handleClearSetor = () => {
    setSetorId(null);
    setSetorNome(null);
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/5 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Nome do Cargo
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="nome_cargo"
              placeholder="Nome do Cargo"
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Quantidade de Funcionários
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="func_masc"
              placeholder="Masculinos"
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-7 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="func_fem"
              placeholder="Femininos"
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-7 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="func_menor"
              placeholder="Menores de Idade"
            />
          </div>
          <div className="w-full md:w-2/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Descrição
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded h-20 py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="descricao"
              placeholder="Descrição do Setor"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fk_contato_id">
              Setor:
            </label>
            <div className="flex items-center w-full">
              {setorNome ? (
                <>
                  <button
                    className="flex appearance-none hover:shadow-sm text-sky-600 bg-gray-100 border-gray-200 justify-center mt-1 py-3 px-4 rounded leading-tight focus:outline-none with-text"
                    onClick={openModal}
                  >
                    <p name="fk_contato_id" className="px-2 text-sm font-sm text-gray-600">
                      Setor:
                    </p>
                    <p className="font-bold">
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
                  onClick={openModal}
                >
                  <p className="px-2 text-sm font-medium">
                    Nenhum Setor Selecionado
                  </p>
                </button>
              )}

              <button
                type="button"
                onClick={openModal}
                className={`flex cursor-pointer ml-4`}
              >
                <img src={icon_lupa} className="h-9" alt="Icone adicionar unidade"></img>
              </button>
            </div>
            <ModalSearchSetor
              isOpen={showModal}
              onCancel={closeModal}
              children={setor}
              onContactSelect={handleSetorSelect}
            />
          </div>
          <div className="w-full px-3 pl-8 flex justify-end">
            <div>
              <button onClick={handleClear} className="shadow mt-4 bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Limpar
              </button>
            </div>
            <div className="px-3 pl-8">
              <button className="shadow mt-4 bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FrmCadastroCargo;