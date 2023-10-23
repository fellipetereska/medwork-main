import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'


function CadastroSetor ({onEdit, setOnEdit, getUsers}) {

    // Instanciando a variavel que vai referenciar o formulario
    const ref = useRef(null);

    // Colocando as informações do formulario nas variaveis
    useEffect( () => {
        if(onEdit) {
            const user = ref.current;

            //Passando o dado do input para a props
            user.nome_empresa.value = onEdit.nome_empresa;
            user.descricao.value = onEdit.descricao
        }
    }, [onEdit]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome_setor.value ||
            !user.descricao.value){
                return toast.warn("Preencha Todos os Campos!")
            }
        
        if(onEdit){
            //Caso já tiver o cadastro ele vai colocar as opções para editar
            await axios
                .put(`http://localhost:8800/setores/${onEdit.id}`, {
                    nome_setor: user.nome_setor.value,
                    descricao: user.descricao.value,
                }).then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data))
        } else {
            //Caso não tiver o cadastro ele cadastra
            console.log("Dados a serem enviados:", {
                nome_setor: user.nome_setor.value,
                descricao: user.descricao.value,
            });
            await axios
            .post("http://localhost:8800/setores",{
                nome_setor: user.nome_setor.value,
                descricao: user.descricao.value,
            }).then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data))
        }

        user.nome_setor.value = "";
        user.descricao.value = "";

        setOnEdit(null);
        getUsers();
    }

    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_setor.value = "";
        user.descricao.value = "";
      };

    return(
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
                            placeholder="Nome da empresa"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Descrição
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded h-20 py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="descricao"
                            placeholder="Razão Social da Empresa"
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

export default CadastroSetor;