import React, { useState, useEffect, useRef } from "react";

function FrmElaboador({ onEdit, setOnEdit }) {

  const ref = useRef(null);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [registro, setRegistro] = useState('');
  const [emailError, setEmailError] = useState(false);


  useEffect(() => {

  }, []);

  useEffect(() => {

  }, [onEdit])

  const handleSubmit = () => {

  };

  const handleClear = () => {

  };

  const handleChangeCPF = (e) => {
    const data = e.target.value;
    const dataNum = data.replace(/\D/g, '');
    const truncatedData = dataNum.slice(0, 11);
    const formatedCpf = handleFormatCpf(truncatedData);
    setCpf(formatedCpf);
  };

  const handlePasteCpf = (e) => {
    const inputCpf = e.clipboardData.getData('text/plain');
    const cpfFormatado = handleFormatCpf(inputCpf);
    setCpf(cpfFormatado);
  };

  const handleFormatCpf = (item) => {
    return item.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  useEffect(() => {
    try {
      if (email === '') {
        setEmailError(false);
      }
    } catch (error) {
      console.error("Erro ao setar emailError", error)
    }
  }, [email]);


  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    const isValid = inputValue.includes('@') && inputValue.includes('.');
    setEmail(inputValue);
    isValid ? setEmailError(false) : setEmailError(true);
  };

  const handlePhoneChange = (e) => {
    const data = e.target.value;
    const dataNum = data.replace(/\D/g, '');
    const truncateData = dataNum.slice(0, 14);
    const phone = handlePhoneFormat(truncateData);
    setTelefone(phone);
  };

  const handlePhoneFormat = (item) => {
    return item.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  };

  const handleCargoChange = (e) => {
    const data = e.target.value;
    setCargo(data);
  };

  const handleRegistroChange = (e) => {
    const inputValue = e.target.value;
    const register = handleFormatResgistro(inputValue);
    setRegistro(inputValue);
  };

  const handleFormatResgistro = (item) => {
    try {
      switch (cargo) {
        case '':
          return
        case 'Engenheiro':
          return item.replace(/^(\d{2})(\d{6})(\d{1})$/, '($1)/$2-$3');
        case 'Médico':
          return
        case 'Técnico':
          return

        default:
          return
      }
    } catch (error) {
      console.error("Erro ao formatar registro.", error)
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6 p-3">

            {/* Nome */}
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
                Nome:
              </label>
              <input
                className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                id="nome"
                type="text"
                name="nome_elaborador"
                placeholder="Nome do Elaborador"
                value={nome}
                onChange={(e) => setNome(e)}
              />
            </div>

            {/* CPF */}
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf">
                CPF:
              </label>
              <input
                className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                id="cpf"
                type="text"
                name="cpf_elaborador"
                placeholder="CPF do Elaborador"
                value={cpf}
                onChange={handleChangeCPF}
                onPaste={handlePasteCpf}
                max={14}
              />
            </div>

            {/* Email */}
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white ${emailError ? 'border border-red-600' : ''}`}
                id="email"
                type="text"
                name="email_elaborador"
                placeholder="Email do Elaborador"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-xs font-medium text-red-700 -mt-2">*Email incorreto</p>
              )}
            </div>

            {/* Telefone */}
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telefone">
                Telefone:
              </label>
              <input
                className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                type="text"
                name="telefone_elaborador"
                id="telefone"
                placeholder="Telefone do Elaborador"
                onChange={handlePhoneChange}
                value={telefone}
              />
            </div>

            {/* Cargo */}
            <div className="w-full md:w-1/3 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cargo">
                Cargo do Elaborador:
              </label>
              <select
                className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white`}
                name="cargo_elaborador"
                id="cargo"
                onChange={handleCargoChange}
                value={cargo}
              >
                <option value="">Selecione uma opção</option>
                <option value="Engenheiro">Engenheiro</option>
                <option value="Médico">Médico</option>
                <option value="Técnico">Técnico</option>
              </select>
            </div>

            {/* Registro */}
            <div className={`w-full md:w-1/3 px-3 ${cargo ? '' : 'opacity-50 cursor-not-allowed'}`}>
              <label className={`tracking-wide text-gray-700 text-xs font-bold mb-2 ${cargo ? '' : 'cursor-not-allowed'}`} htmlFor="registro">
                Registro:
              </label>
              <input
                className={`appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white ${cargo ? '' : 'cursor-not-allowed'}`}
                id="registro"
                type="text"
                name="registro_elaborador"
                placeholder="Código de Registro"
                disabled={!cargo}
                onChange={handleRegistroChange}
                value={registro}
              />
            </div>

            {/* Botões */}
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
    </>
  );
}

export default FrmElaboador;