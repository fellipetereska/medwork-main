import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, connect } from "../../../../services/api";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

function FrmCadastroUsuario({ onEdit, setOnEdit, getUsuario, usuarios }) {
	// Instanciando a variavel que vai referenciar o formulario
	const ref = useRef(null);

	const [
		createUserWithEmailAndPassword,
		error,
	] = useCreateUserWithEmailAndPassword(auth);

	const [tipo, setTipo] = useState(0);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cpf, setCpf] = useState('');
	const [emailcheck, setemailcheck] = useState(false);
	const [pasdCheck, setPasdCheck] = useState(false);

	// Colocando as informações do formulario nas variaveis
	useEffect(() => {
		if (onEdit) {
			const user = ref.current;

			//Passando o dado do input para a props
			user.nome_usuario.value = onEdit.nome_usuario;
			setCpf(onEdit.cpf_usuario);
			setEmail(onEdit.email);
			setPassword(onEdit.password);
			setTipo(onEdit.tipo)
		}
	}, [onEdit]);

	const signIn = async (email, password, displayName) => {
		try {
			const users = usuarios.filter((i) => i.email === email);

			if (users.length > 0) {
				toast.info("Usuário já cadastrado!");
				return "existe";
			} else {
				await createUserWithEmailAndPassword(email, password, displayName);

				if (error) {
					toast.warn("Erro ao registrar usuário!");
					console.log("Erro ao registrar usuário", error);
				}
				return "não existe"
			}
		} catch (error) {
			toast.warn("Erro ao registrar usuário!");
			console.log("Erro ao registrar usuario no FireBase", error.response.data)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = ref.current;

		const res = await signIn(email, password, user.nome_usuario.value);

		if (res === "existe") {
			handleClear();
			return;
		} else {
			if (
				!user.nome_usuario.value ||
				!user.cpf_usuario.value ||
				!user.email.value ||
				!user.senha.value ||
				!user.tipo) {
				return toast.warn("Preencha Todos os Campos!")
			}
			try {
				const userData = {
					nome_usuario: user.nome_usuario.value || "",
					cpf_usuario: cpf || "",
					email: user.email.value || "",
					password: user.senha.value || "",
					tipo: tipo || "0",
				}

				const url = onEdit
					? `${connect}/usuarios/${onEdit.id_usuario}`
					: `${connect}/usuarios`

				const method = onEdit ? 'PUT' : 'POST';

				const response = await fetch(url, {
					method,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				});

				if (!response.ok) {
					throw new Error(`Erro ao cadastrar/Editar Usuário. Status: ${response.status}`);
				};

				const responseData = await response.json();

				toast.success(responseData);
			} catch (error) {
				toast.warn("Erro ao cadastrar/atualizar o usuário")
				console.log("Erro ao cadastrar/atualizar Usuário", error)
			}
			handleClear();
			setOnEdit(null);
			getUsuario();
		}
	}

	const handleClear = () => {
		const user = ref.current;
		user.nome_usuario.value = "";
		setCpf('');
		setEmail('');
		setPassword('');
		setTipo('0');

		setOnEdit(null);
	};

	const handleFormatCpf = (inputValue) => {
		const numerosCpf = inputValue.replace(/[^\d]/g, '');
		const cpfFormatado = numerosCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
		return cpfFormatado;
	}

	const handleChangeCpf = (e) => {
		const inputValue = e.target.value;
		const cpfFormatado = handleFormatCpf(inputValue);
		setCpf(cpfFormatado);
	}

	const handlePasteCpf = (event) => {
		const inputCpf = event.clipboardData.getData('text/plain');
		const cpfFormatado = handleFormatCpf(inputCpf);
		setCpf(cpfFormatado);
	};

	const handleChangeMail = (e) => {
		const inputValue = e.target.value;
		const isValid = inputValue.includes('@') && inputValue.includes('.');

		setemailcheck(!isValid);
	}

	const handleSetPassd = (e) => {
    const inputPasd = e.target.value;
    const isValid = inputPasd.length < 6;
    setPasdCheck(isValid);
		setPassword(inputPasd)
}


	return (
		<div className="flex justify-center mt-10">
			<form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/3 px-3">
						<label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
							Nome:
						</label>
						<input
							className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
							type="text"
							name="nome_usuario"
							placeholder="Nome do Usuário"
						/>
					</div>
					<div className="w-full md:w-1/3 px-3">
						<label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
							CPF:
						</label>
						<input
							className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
							type="text"
							name="cpf_usuario"
							placeholder="CPF do Usuário"
							onChange={handleChangeCpf}
							onPaste={handlePasteCpf}
							value={cpf}
							maxLength={14}
						/>
					</div>
					<div className="w-full md:w-1/3 px-3">
						<label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
							Email
						</label>
						<input
							className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
							type="text"
							name="email"
							placeholder="Email do Usuário"
							value={email}
							onBlur={handleChangeMail}
							onChange={e => setEmail(e.target.value)}
						/>
						<p className={`text-xs font-medium text-red-600 px-1 mt-1 ${!emailcheck && "hidden"}`}>*Email Incompleto</p>
					</div>
					<div className="w-full md:w-1/3 px-3">
						<label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
							Senha
						</label>
						<input
							className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
							type="password"
							name="senha"
							placeholder="Senha do Usuário"
							value={password}
							onChange={handleSetPassd}
						/>
						<p className={`text-xs font-medium text-red-600 px-1 mt-1 ${!pasdCheck && "hidden"}`}>*Senha deve conter no minimo 6 caracteres</p>
					</div>
					<div className="w-full md:w-1/3 px-3">
						<label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
							Permissão:
						</label>
						<select
							className="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100"
							id="grid-usuario"
							name="tipo"
							value={tipo}
							onChange={e => setTipo(e.target.value)}
						>
							<option value="0">Selecione uma Permissão</option>
							<option value="1">Administrador</option>
							<option value="2">Técnico</option>
						</select>
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

export default FrmCadastroUsuario;