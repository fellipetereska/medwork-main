import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { supabase } from '../../../../services/api'

function FrmCadastroSetor({ onEdit, setOnEdit, getSetor }) {

    // Instanciando a variavel que vai referenciar o formulario
    const ref = useRef(null);

    // Colocando as informações do formulario nas variaveis
    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            //Passando o dado do input para a props
            user.nome_setor.value = onEdit.nome_setor;
            user.descricao_ambiente.value = onEdit.descricao_ambiente
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.nome_setor.value || !user.descricao_ambiente.value) {
        return toast.warn("Preencha Todos os Campos!");
    }

    try {
        if (onEdit) {
            // Se `onEdit` estiver definido, trata-se de uma edição
            await supabase
                .from("setor")
                .upsert([
                    {
                        id_setor: onEdit.id_setor, // Use o identificador exclusivo do registro
                        nome_setor: user.nome_setor.value,
                        descricao_ambiente: user.descricao_ambiente.value,
                    }
                ]);
            toast.success("Registro atualizado com sucesso!");
        } else {
            // Caso contrário, é uma inserção
            const { data, error } = await supabase
                .from("setor")
                .upsert([
                    {
                        nome_setor: user.nome_setor.value,
                        descricao_ambiente: user.descricao_ambiente.value,
                    }
                ]);

            if (error) {
                throw error;
            }

            toast.success("Registro inserido com sucesso!");
        }
    } catch (error) {
        toast.error("Erro ao salvar o registro");
        console.error(error);
    }

    // Limpar campos e resetar estado de edição
    user.nome_setor.value = "";
    user.descricao_ambiente.value = "";
    setOnEdit(null);

    // Atualizar os dados (chamando getSetor)
    getSetor();
};



    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_setor.value = "";
        user.descricao_ambiente.value = "";
    };

    return (
        <div class="flex justify-center mt-10">
            <form class="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Nome do Setor
                        </label>
                        <input
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                            type="text"
                            name="nome_setor"
                            placeholder="Nome do Setor"
                        />
                    </div>
                    <div class="w-full md:w-2/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Descrição do Ambiente
                        </label>
                        <input
                            class="apperance-none block w-full bg-gray-100 rounded h-20 py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white"
                            type="text"
                            name="descricao_ambiente"
                            placeholder="Descrição do Ambiente"
                        />
                    </div>
                    <div class="w-full px-3 pl-8 flex justify-end">
                        <div>
                            <button onClick={handleClear} class="shadow mt-4 bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Limpar
                            </button>
                        </div>
                        <div class="px-3 pl-8">
                            <button class="shadow mt-4 bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
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