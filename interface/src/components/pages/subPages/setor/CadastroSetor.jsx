//Importando ferramentas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth'

//Importando componentes da tela
import Back from '../../../layout/Back'
import FrmCadastroSetor from "./frmCadastroSetor";
import GridCadastroSetor from "./gridCadastroSetor";
import SearchInput from "../components/SearchInput";

import { IoInformationCircleSharp } from "react-icons/io5";


function CadastroSetor({ }) {

	// Instanciando e Definindo como vazio
	const [onEdit, setOnEdit] = useState(null);
	const [nomeUnidade, setNomeUnidade] = useState(null);
	const [visible, setVisible] = useState(false);

	const { setores, setSetores, getSetores, unidades, getUnidades, companyId, loadSelectedCompanyFromLocalStorage } = useAuth(null);

	//Instanciando o Search
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredSetor, setFilteredSetor] = useState([]);

	useEffect(() => {
		loadSelectedCompanyFromLocalStorage();
	}, [])

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
		<div>
			<div className="flex w-full mt-6" onMouseLeave={() => setVisible(false)}>
				<div className="fixed z-50 m-2 -mt-4">
					<div className={`bg-gray-700 rounded-lg px-6 py-2 ${visible ? 'block' : 'hidden'} text-white`}>
						<h2 className="font-bold text-xl mb-2 text-gray-100 mt-2">Página Cadastro Setor</h2>
						<div>
							<p className="mb-2 text-justify font-light text-gray-300 flex">
								A página de cadastro de setor foi desenvolvida para oferecer uma experiência centrada na facilidade de uso e na gestão eficiente. Ao acessar essa funcionalidade, os usuários encontrarão um layout intuitivo e organizado.
							</p>
							<p className="mb-2 text-justify font-light text-gray-300 flex">
								No canto superior esquerdo da tela, destaca-se um botão que proporciona a facilidade de retorno à página principal de cadastros. Esse recurso visa garantir uma navegação ágil e intuitiva para os usuários. No centro da tela, encontra-se um formulário que possibilita o cadastro e a edição das informações referentes ao setor. Esse formulário foi projetado para ser claro e de fácil compreensão, simplificando o processo de inserção e modificação de dados.	Abaixo do formulário, implementamos um campo de pesquisa para facilitar a localização rápida de setores específicos. Esse recurso busca otimizar a experiência do usuário, permitindo que encontrem informações de maneira eficiente.
							</p>
							<p className="mb-2 text-justify font-light text-gray-300 flex">
								Além disso, apresentamos uma tabela organizada abaixo do campo de pesquisa, contendo os dados do setor, como Setor, Descrição e Unidade. Em uma coluna dedicada, são disponibilizados três botões distintos para cada setor: um ícone de lápis para edição, um ícone de corrente para vincular processos e um checkbox para desativar o setor. O botão de edição permite ajustar informações diretamente na tabela, enquanto o ícone de corrente abre um modal dedicado para vincular processos ao setor, proporcionando uma integração eficaz entre os dados.
							</p>
							<p className="mb-2 text-justify font-light text-gray-300 flex">
								Com essa abordagem, buscamos fornecer uma página de cadastro de setor que atenda às necessidades dos usuários, oferecendo uma experiência intuitiva, eficiente e completa para a gestão e organização das informações relacionadas aos setores da empresa.
							</p>
						</div>
					</div>
				</div>
			</div>


			<div className="grid grid-cols-3 mb-10 mt-10">
				{/* Botão para voltar */}
				<div className="">
					<Link to="/cadastros">
						<Back />
					</Link>
				</div>
				<div className="flex justify-center">
					<h1 className="text-3xl font-extrabold text-sky-700">Cadastrar Setor</h1>
				</div>
				<div>
					<div className="flex justify-end w-3/4">
						<div onMouseEnter={() => setVisible(true)}>
							<IoInformationCircleSharp className='text-sky-700' />
						</div>
					</div>
				</div>
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