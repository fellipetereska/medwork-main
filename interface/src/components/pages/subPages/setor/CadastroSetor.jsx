//Importando ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth'

//Importando componentes da tela
import Back from '../../../layout/Back'
import FrmCadastroSetor from "./frmCadastroSetor";
import GridCadastroSetor from "./gridCadastroSetor";
import SearchInput from "../components/SearchInput";


function CadastroSetor({ }) {

	// Instanciando e Definindo como vazio
	const [onEdit, setOnEdit] = useState(null);
	const [nomeUnidade, setNomeUnidade] = useState(null);

	const { setores, setSetores, getSetores, unidades, getUnidades, companyId, loadSelectedCompanyFromLocalStorage } = useAuth(null);

	//Instanciando o Search
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredSetor, setFilteredSetor] = useState([]);

	useEffect(() => {
		loadSelectedCompanyFromLocalStorage();
	},[])

	useEffect(() => {
		if (companyId) {
				getUnidades();
				getSetores();
		}
}, [companyId]);

	//Função para Pesquisa
	useEffect(() => {
		const filtred = setores.filter((set) => set.nome_setor.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
		setFilteredSetor(filtred);
	}, [searchTerm, setores]);

	//Função para Busca
	const handleSearch = (term) => {
		// Atualizar o estado do termo de pesquisa com o valor fornecido
		setSearchTerm(term);
	}

	//Função para edição
	const handleEdit = (selectedSetor) => {
		setOnEdit(selectedSetor)

		if (selectedSetor.fk_unidade_id) {
			const unidadeInfo = unidades.find((c) => c.id_unidade === selectedSetor.fk_unidade_id);
			if (unidadeInfo) {
				setNomeUnidade(unidadeInfo.nome_unidade)
			}
		}
	};

	const unidadesId = unidades.filter((i) => i.fk_empresa_id);
	const filteredSetores = setores.filter((i) => i.fk_unidade_id === unidadesId);

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
				getSetor={getSetores}
				unidades={nomeUnidade}
				setor={setores}
				unidade={unidades}
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
				setSetor={setSetores}
				getSetores={getSetores}
				setOnEdit={handleEdit}
				unidade={unidades}
			/>
		</div>
	)
}

export default CadastroSetor;