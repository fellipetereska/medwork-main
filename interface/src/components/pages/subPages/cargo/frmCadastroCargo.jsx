import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect, supabase } from '../../../../services/api' //Conexão com o banco de dados
import icon_lupa from '../../../media/icon_lupa.svg'
import icon_sair from '../../../media/icon_sair.svg'
import ModalSearchSetor from '../components/Modal/ModalSearchSetor'


function FrmCadastroCargo({ onEdit, setOnEdit, getCargo, set, setor, unidades }) {

  // Instanciando a variavel que vai referenciar o formulario
  const ref = useRef(null);
  const [setorId, setSetorId] = useState(null);
  const [setorNome, setSetorNome] = useState(null);
  const [funcMasc, setFuncMasc] = useState('');
  const [funcFem, setFuncFem] = useState('');
  const [funcMenor, setFuncMenor] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [filteredSetores, setFilteredSetores] = useState([]);

  useEffect(() => {
    const filterunidades = unidades.map((i) => i.id_unidade);
    const filtersetor = setor.filter((i) => filterunidades.includes(i.fk_unidade_id));
    setFilteredSetores(filtersetor);
  }, [unidades, setor]);

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      //Passando o dado do input para a props
      user.nome_cargo.value = onEdit.nome_cargo || '';
      user.descricao.value = onEdit.descricao || '';
      setFuncMasc(onEdit.func_masc || 0);
      setFuncFem(onEdit.func_fem || 0);
      setFuncMenor(onEdit.func_menor || 0);

      if (set && onEdit.fk_setor_id) {
        setSetorId(onEdit.fk_setor_id);
        setSetorNome(set);
      } else {
        setSetorId(null);
        setSetorNome(null);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [onEdit, setor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome_cargo.value ||
      !setorId) {
      return toast.warn("Preencha Todos os Campos!")
    }
    try {
      const cargoData = {
        nome_cargo: user.nome_cargo.value || null,
        descricao: user.descricao.value || null,
        func_masc: funcMasc || 0,
        func_fem: funcFem || 0,
        func_menor: funcMenor || 0,
        fk_setor_id: setorId || null,
        ativo: 1,
      }

      const url = onEdit
        ? `${connect}/cargos/${onEdit.id_cargo}`
        : `${connect}/cargos`;

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cargoData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar/editar cargo. Status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData);
    } catch (error) {
      console.log(error)
    }

    handleClear();
    getCargo();
  }

  const handleClear = () => {
    // Limpa todos os campos do formulário
    const user = ref.current;
    user.nome_cargo.value = "";
    user.descricao.value = "";
    setFuncMasc('');
    setFuncFem('');
    setFuncMenor('');
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

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const numberValue = parseInt(numericValue, 10);

    if (isNaN(numberValue) || numberValue < 0) {
      e.target.value = '';
    } else {
      e.target.value = numberValue;
    }
  };

  const handleFocusInputFuncMasc = (e) => {
    const inputValue = e.target.value;

    if (inputValue === 0 || inputValue === '') {
      setFuncMasc(0);
    } else {
      setFuncMasc(funcMasc)
    }
  }

  const handleFocusInputFuncFem = (e) => {
    const inputValue = e.target.value;

    if (inputValue === 0 || inputValue === '') {
      setFuncFem(0);
    } else {
      setFuncFem(funcFem)
    }
  }

  const handleFocusInputFuncMenor = (e) => {
    const inputValue = e.target.value;

    if (inputValue === 0 || inputValue === '') {
      setFuncMenor(0);
    } else {
      setFuncMenor(funcMenor)
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/5 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cargo">
              Nome do Cargo
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              id="cargo"
              type="text"
              name="nome_cargo"
              placeholder="Nome do Cargo"
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
              Quantidade de Funcionários
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="func_masc"
              placeholder="Masculinos"
              onInput={handleInputChange}
              value={funcMasc}
              onFocus={handleFocusInputFuncMasc}
              onChange={(e) => setFuncMasc(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-7 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="func_fem"
              placeholder="Femininos"
              onInput={handleInputChange}
              value={funcFem}
              onFocus={handleFocusInputFuncFem}
              onChange={(e) => setFuncFem(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/5 px-3">
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-7 leading-tight focus:outline-gray-100 focus:bg-white"
              type="number"
              name="func_menor"
              placeholder="Menores de Idade"
              onInput={handleInputChange}
              value={funcMenor}
              onFocus={handleFocusInputFuncMenor}
              onChange={(e) => setFuncMenor(e.target.value)}
            />
          </div>
          <div className="w-full md:w-2/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              className="resize-none apperance-none block w-full bg-gray-100 rounded h-20 py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              id="descricao"
              name="descricao"
              placeholder="Descrição do Cargo"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
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
              children={filteredSetores}
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