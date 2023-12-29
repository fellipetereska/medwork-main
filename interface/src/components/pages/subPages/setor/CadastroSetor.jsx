//Importando ferramentas
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { supabase } from "../../../../services/api"; //Conexão com o banco de dados

//Importando componentes da tela
import Back from '../../../layout/Back'
import GridCadastroSetor from "./gridCadastroSetor";
import SearchInput from "../components/SearchInput";
import { MdOutlineAddHomeWork } from "react-icons/md";
import ModalSetor from './ModalSetor'


function CadastroSetor({ }) {

	// Instanciando e Definindo como vazio
	const [setor, setSetor] = useState([]);
	const [onEdit, setOnEdit] = useState(null);
	const [unidade, setUnidade] = useState(null);
	const [nomeUnidade, setNomeUnidade] = useState(null);
	const [showModal, setShowModal] = useState(false);

	//Instanciando o Search
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredSetor, setFilteredSetor] = useState([]);

	// Pegando os dados da tabela Setor
	const getSetor = async () => {
		try {
			const { data } = await supabase.from("setor").select();
			const sortedData = data.sort((a, b) => {
				// Ordenar por status do checkbox (ativo ou inativo)
				if (a.ativo !== b.ativo) {
					return a.ativo ? -1 : 1;
				}

				// Ordenar por ordem alfabética
				return a.nome_setor.localeCompare(b.nome_setor);
			});
			setSetor(sortedData);


		} catch (error) {
			toast.error(error);
		}
	};

	const gettUnidade = async () => {
		try {
			const { data } = await supabase.from("unidade").select();
			setUnidade(data);
		} catch (error) {
			toast.error(error);
		}
	};

	//Renderizando os dados
	useEffect(() => {
		getSetor();
		gettUnidade();
	}, []);


	//Função para Pesquisa
	useEffect(() => {
		const filtered = setor.filter((set) => {
			const nomeSetorLowerCase = set.nome_setor && set.nome_setor.toLowerCase();
			const ambienteSetorLowerCase = set.ambiente_setor && set.ambiente_setor.toLowerCase();
			const descricaoSetorLowerCase = set.observacao_setor && set.observacao_setor.toLowerCase();

			return (
				(nomeSetorLowerCase && nomeSetorLowerCase.includes(searchTerm.toLowerCase())) ||
				(ambienteSetorLowerCase && ambienteSetorLowerCase.includes(searchTerm.toLowerCase())) ||
				(descricaoSetorLowerCase && descricaoSetorLowerCase.includes(searchTerm.toLowerCase()))
			);
		});

		setFilteredSetor(filtered);
	}, [searchTerm, setor, nomeUnidade]);

	//Função para Busca
	const handleSearch = (term) => {
		// Atualizar o estado do termo de pesquisa com o valor fornecido
		setSearchTerm(term);
	}

	//Funções do Modal
	//Função para abrir o Modal
	const openModal = () => setShowModal(true);
	//Função para fechar o Modal
	const closeModal = () => setShowModal(false);

	//Função para edição
	const handleEdit = (selectedSetor) => {
		setOnEdit(selectedSetor)

		if (selectedSetor.fk_unidade_id) {
			const unidadeInfo = unidade.find((c) => c.id_unidade === selectedSetor.fk_unidade_id);
			if (unidadeInfo) {
				setNomeUnidade(unidadeInfo.nome_unidade)
			}
		}
	};

	useEffect(() => {
		if (onEdit) {
			openModal()
		}
	}, [onEdit]);


	return (
		<div className="p-6">
			<div className="flex justify-center items-center mb-10 mt-10">
				{/* Botão para voltar */}
				<div className="absolute left-0">
					<Link to="/cadastros">
						<Back />
					</Link>
				</div>
				<h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Setor</h1>
			</div>

			{/* Formulário de Cadastro */}
			{/* <FrmCadastroSetor
				onEdit={onEdit}
				setOnEdit={setOnEdit}
				getSetor={getSetor}
				unidades={nomeUnidade}
			/> */}

			{/* Barra de pesquisa */}
			<div className="flex justify-center w-full mt-6">
				<div className="w-3/6">
					<SearchInput
						onSearch={handleSearch}
						placeholder="Buscar Setor..." />
				</div>
			</div>

			<div className="flex justify-end w-11/12 mt-6">
				<button
					type="button"
					onClick={openModal}
					class="text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-xl px-5 py-2">
					<MdOutlineAddHomeWork />
				</button>
			</div>

			<ModalSetor
				isOpen={showModal}
				onCancel={closeModal}
				onEdit={onEdit}
				setOnEdit={setOnEdit}
				getSetor={getSetor}
				unidades={unidade}
			/>

			{/* Tabela Setor */}
			<GridCadastroSetor
				setor={filteredSetor}
				setSetor={setSetor}
				setOnEdit={handleEdit}
			/>
		</div>
	)
}

export default CadastroSetor;