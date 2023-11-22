//Importando ferramentas
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from '../../../../services/api' //Conexão com o banco de dados


function FrmCadastroSetor({ onEdit, setOnEdit, getSetor }) {

    //Instanciando Variaveis
    // Instanciando a variavel que vai referenciar o formulario
    const ref = useRef(null);
    const [unidade, setUnidade] = useState(null);

    // Colocando as informações do formulario nas variaveis
    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome_setor.value = onEdit.nome_setor;
            user.ambiente_setor.value = onEdit.ambiente_setor;
            user.observacao_setor.value = onEdit.observacao_setor;
            user.fk_unidade_id.value = onEdit.fk_unidade_id;
        }
    }, [onEdit]);

    //Função para adicionar ou atualizar dado
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        //Verificando se todos os campos foram preenchidos
        if (!user.nome_setor.value || !user.ambiente_setor.value) {
            return toast.warn("Preencha Todos os Campos!");
        }

        try {
            if (onEdit) {
                // Se `onEdit` estiver definido, trata-se de uma edição
                await supabase
                    .from("setor")
                    .upsert([
                        {
                            id_setor: onEdit.id_setor,
                            nome_setor: user.nome_setor.value,
                            ambiente_setor: user.ambiente_setor.value,
                            observacao_setor: user.observacao_setor.value,
                            fk_unidade_id: user.fk_unidade_id.value,
                        }
                    ]);
                toast.success(`Setor: ${onEdit.nome_setor} atualizado com sucesso!`);
            } else {
                // Caso contrário, é uma inserção
                const { data, error } = await supabase
                    .from("setor")
                    .upsert([
                        {
                            nome_setor: user.nome_setor.value,
                            ambiente_setor: user.ambiente_setor.value,
                            observacao_setor: user.observacao_setor.value,
                            fk_unidade_id: user.fk_unidade_id.value,
                        }
                    ]);

                if (error) {
                    toast.error("Erro ao inserir setor, verifique o console!");
                    console.log("Ero ao inserir setor! Erro: ", error)
                    throw error;
                }

                toast.success(`Setor inserido com sucesso!`);
            }
        } catch (error) {
            toast.error("Erro ao salvar o registro");
            console.error(error);
        }

        // Limpa campos e reseta estado de edição
        user.nome_setor.value = "";
        user.ambiente_setor.value = "";
        user.observacao_setor.value = "";
        user.fk_unidade_id.value = "";
        setOnEdit(null);

        // Atualiza os dados
        getSetor();
    };

    //Função para limpar o formulário
    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_setor.value = "";
        user.ambiente_setor.value = "";
        user.observacao_setor.value = "";
        user.fk_unidade_id.value = "";
    };

    //Buscando as unidades para o select
    const fetchUnidade = async () => {
        try {
            const { data } = await supabase.from("unidade").select();
            setUnidade(data);
        } catch (error) {
            console.error("Erro ao buscar contato:", error);
        }
    }

    useEffect(() => {
        fetchUnidade();
    })


    return (
        <div className="flex justify-center">
            <form className="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-2/4 px-3">
                        <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Nome do Setor
                        </label>
                        <input
                            className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                            name="nome_setor"
                            placeholder="Nome do Setor"
                        />
                    </div>
                    <div className="w-full md:w-2/4 px-3">
                        <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Unidade:
                        </label>
                        <select
                            className="w-full appearance-none bg-gray-100 border-gray-200 mt-1 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none"
                            id="grid-contato"
                            name="fk_unidade_id"
                        >
                            <option value="">Selecione uma Unidade</option>
                            {unidade && unidade.map(unidade => (
                                <option key={unidade.id_unidade} value={unidade.id_unidade}>
                                    {unidade.nome_unidade}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full md:w-3/3 px-3">
                        <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Descrição do Ambiente
                        </label>
                        <input
                            className="apperance-none block w-full bg-gray-100 rounded h-24 py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                            type="text"
                            name="ambiente_setor"
                            placeholder="Descrição do Ambiente"
                        />
                    </div>
                    <div className="w-full md:w-2/4 px-3">
                        <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Observação
                        </label>
                        <input
                            className="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                            type="text"
                            name="observacao_setor"
                            placeholder="Observação"
                        />
                        <p className="text-xs text-gray-400 mb-3">**Apenas se houver necessidade</p>
                    </div>
                    <div className="w-full pl-8 flex justify-end">
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

export default FrmCadastroSetor;