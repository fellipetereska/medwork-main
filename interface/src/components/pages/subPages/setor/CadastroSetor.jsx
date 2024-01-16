//Importando ferramentas
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from "../../../../services/api"; //Conexão com o banco de dados

//Importando componentes da tela
import Back from '../../../layout/Back'
import FrmCadastroSetor from "./frmCadastroSetor";
import GridCadastroSetor from "./gridCadastroSetor";
import SearchInput from "../components/SearchInput";


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
			const response = await fetch(`${connect}/setores`)

			if (!response.ok) {
				throw new Error(`Erro ao buscar setores. Status: ${response.status}`)
			}

			const data = await response.json();
			setSetor(data);
		} catch (error) {
			toast.error("Erro ao buscar setores", error);
		}
	};

	const gettUnidade = async () => {
		try {
			const response = await fetch(`${connect}/unidades`)

			if (!response.ok) {
				throw new Error(`Erro ao buscar unidades. Status: ${response.status}`)
			}

			const data = await response.json();
			setUnidade(data);
		} catch (error) {
			toast.error("Erro ao buscar unidades", error);
		}
	};

	//Renderizando os dados
	useEffect(() => {
		getSetor();
		gettUnidade();
	}, []);


	//Função para Pesquisa
	useEffect(() => {
		const filtred = setor.filter((set) => set.nome_setor.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
		setFilteredSetor(filtred);
	}, [searchTerm, setor]);

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
			<FrmCadastroSetor
				onEdit={onEdit}
				setOnEdit={setOnEdit}
				getSetor={getSetor}
				unidades={nomeUnidade}
				setor={setor}
				unidade={unidade}
			/>

			{/* Barra de pesquisa */}
			<div className="flex justify-center w-full mt-6 mb-4">
				<div className="w-3/6">
					<SearchInput
						onSearch={handleSearch}
						placeholder="Buscar Setor..." />
				</div>
			</div>

			{/* Tabela Setor */}
			<GridCadastroSetor
				setor={filteredSetor}
				setSetor={setSetor}
				setOnEdit={handleEdit}
				unidade={unidade}
			/>
		</div>
	)
}

export default CadastroSetor;