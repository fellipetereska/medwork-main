//Importando ferramentas
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { supabase } from "../../../../services/api"; //Conexão com o banco de dados

//Importando componentes da tela
import Back from '../../../layout/Back'
import FrmCadastroSetor from "./frmCadastroSetor";
import GridCadastroSetor from "./gridCadastroSetor";
import SearchInput from "../components/SearchInput";


function CadastroSetor() {

	// Instanciando e Definindo como vazio
	const [setor, setSetor] = useState([]);
	const [onEdit, setOnEdit] = useState(null);
	const [unidade, setUnidade] = useState(null);
	const [nomeUnidade, setNomeUnidade] = useState(null);

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

	//Função para edição
	const handleEdit = (selectedSetor) => {
		setOnEdit(selectedSetor)

		if (selectedSetor.fk_unidade_id) {
			const unidadeInfo = unidade.find((c) => c.id_unidade === selectedSetor.fk_unidade_id);
			if (unidadeInfo) {
				setNomeUnidade(unidade.nome_unidade)
			}
		}
	};

	//Função para Pesquisa
	useEffect(() => {
		const filtered = setor.filter((set) => set.nome_setor.toLowerCase().includes(searchTerm.toLowerCase()));
		setFilteredSetor(filtered);
	}, [searchTerm, setor]);

	//Função para Busca
	const handleSearch = (term) => {
		// Atualizar o estado do termo de pesquisa com o valor fornecido
		setSearchTerm(term);
	}


	return (
		<div className="p-6">
			{/* Botão para voltar */}
			<Link to="/cadastros">
				<Back />
			</Link>

			{/* Formulário de Cadastro */}
			<FrmCadastroSetor
				onEdit={onEdit}
				setOnEdit={setOnEdit}
				getSetor={getSetor}
				unidades={nomeUnidade}
			/>

			{/* Barra de pesquisa */}
			<div className="flex justify-center w-full mt-6">
				<div className="w-3/6">
					<SearchInput onSearch={handleSearch} placeholder="Buscar Setor..." />
				</div>
			</div>

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