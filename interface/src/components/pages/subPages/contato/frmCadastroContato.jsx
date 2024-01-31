import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "../../../../services/api";


function FrmCadastroContato({ onEdit, setOnEdit, getContato }) {

  // Instanciando a variavel que vai referenciar o formulario
  const ref = useRef(null);

  const [mailCompleted1, setMailCompleted1] = useState(false);
  const [showMailError1, setShowMailError1] = useState(false);
  const [mailCompleted2, setMailCompleted2] = useState(false);
  const [showMailError2, setShowMailError2] = useState(false);

  // Colocando as informações do formulario nas variaveis
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      //Passando o dado do input para a props
      user.nome_contato.value = onEdit.nome_contato;
      user.telefone_contato.value = onEdit.telefone_contato;
      user.email_contato.value = onEdit.email_contato;
      user.email_secundario_contato.value = onEdit.email_secundario_contato
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome_contato.value ||
      !user.telefone_contato.value ||
      !user.email_contato.value) {
      return toast.warn("Preencha Todos os Campos!")
    }

    try {

      const contatoData = {
        nome_contato: user.nome_contato.value,
        telefone_contato: user.telefone_contato.value,
        email_contato: user.email_contato.value,
        email_secundario_contato: user.email_secundario_contato.value,
        ativo: 1,
      }

      const url = onEdit
        ? `${connect}/contatos/${onEdit.id_contato}`
        : `${connect}/contatos`;

      const method = onEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contatoData),
      })

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar/editar contato. Status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData);

    } catch (error) {
      console.log("Erro ao inserir ou atualizar contato!", error);
      toast.error("Erro ao inserir ou editar o contato. Verifique o console!");
    }


    user.nome_contato.value = "";
    user.telefone_contato.value = "";
    user.email_contato.value = "";
    user.email_secundario_contato.value = "";
    setOnEdit(null);
    setMailCompleted1(false);
    setMailCompleted2(false);

    getContato();
  }

  const handleClear = () => {
    // Limpa todos os campos do formulário
    const user = ref.current;
    user.nome_contato.value = "";
    user.telefone_contato.value = "";
    user.email_contato.value = "";
    user.email_secundario_contato.value = "";
    setMailCompleted1(false);
    setMailCompleted2(false);
    setOnEdit(null);
  };

  const handleInputChangePhone = (e) => {
    const inputValue = e.target.value;
    const phoneNumber = inputValue.replace(/\D/g, '');
    const formattedPhoneNumber = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6, 11)}`;
    e.target.value = formattedPhoneNumber;
  };

  const handleInputChangeMail1 = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setMailCompleted1(false);
    } else if (inputValue.includes('@') || inputValue.includes('.')) {
      setMailCompleted1(true);
    } else {
      setMailCompleted1(true);
    }
  }

  const handleClickMail1 = () => {
    if (!mailCompleted2) {
      setShowMailError2(true);
    }
  }

  const handleBlurMail2 = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setMailCompleted2(false);
    } else if (inputValue.includes('@') || inputValue.includes('.')) {
      setMailCompleted2(true);
    } else {
      setMailCompleted2(true);
    }
  }

  const handleClickMail2 = () => {
    if (!mailCompleted2) {
      setShowMailError2(true);
    }
  }



  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-5xl" ref={ref} onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Nome
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="nome_contato"
              placeholder="Nome do Contato"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Telefone
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="telefone_contato"
              onInput={handleInputChangePhone}
              placeholder="Telefone para Contato"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Email
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="email_contato"
              onBlur={handleInputChangeMail1}
              onClick={handleClickMail1}
              placeholder="Email para Contato"
            />
            <p className={`${showMailError1 ? "text-xs font-medium text-red-600 px-1 mt-1" : "hidden"}`}>*Email Incompleto</p>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
              Email Secundário
            </label>
            <input
              className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
              type="text"
              name="email_secundario_contato"
              onBlur={handleBlurMail2}
              onClick={handleClickMail2}
              placeholder="Email para Contato"
            />
            <p className={`${showMailError2 ? "text-xs font-medium text-red-600 px-1 mt-1" : "hidden"}`}>*Email Incompleto</p>
          </div>
          <div className="w-full px-3 pl-8 flex justify-end">
            <div>
              <button onClick={handleClear} className="shadow mt-4 bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
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

export default FrmCadastroContato;