import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'


function CadastroEmpresa ({onEdit, setOnEdit, getUsers}) {

    // Instanciando a variavel que vai referenciar o formulario
    const ref = useRef(null);
    
    const [contato, setContato] = useState(null);

    //Busca os contatos para colocar no select
    const fetchContato = async () => {
        try {
          const response = await axios.get("http://localhost:8800/contato");
          setContato(response.data);
        } catch (error) {
          console.error("Erro ao buscar contato:", error);
        }
      }

      useEffect(() => {
        fetchContato();
      })

    // Colocando as informações do formulario nas variaveis
    useEffect( () => {
        if(onEdit) {
            const user = ref.current

            //Passando o dado do input para a props
            user.nome_empresa.value = onEdit.nome_empresa;
            user.razao_social.value = onEdit.razao_social;
            user.cnpj_empresa.value = onEdit.cnpj_empresa;
            user.inscricao_estadual_empresa.value = onEdit.inscricao_estadual_empresa;
            user.inscricao_municipal_empresa.value = onEdit.inscricao_municipal_empresa;
            user.fk_contato_id.value = onEdit.fk_contato_id;
        }
    }, [onEdit]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome_empresa.value ||
            !user.razao_social.value ||
            !user.cnpj_empresa.value ||
            !user.inscricao_estadual_empresa ||
            !user.inscricao_municipal_empresa ||
            !user.fk_contato_id.value){
                return toast.warn("Preencha Todos os Campos!")
            }
        if(onEdit){
            //Caso já tiver o cadastro ele vai colocar as opções para editar
            await axios
                .put(`http://localhost:8800/empresa/${onEdit.id_empresa}`, {
                    nome_empresa: user.nome_empresa.value,
                    razao_social: user.razao_social.value,
                    cnpj_empresa: user.cnpj_empresa.value,
                    inscricao_estadual_empresa: user.inscricao_estadual_empresa.value,
                    inscricao_municipal_empresa: user.inscricao_municipal_empresa.value,
                    fk_contato_id: user.fk_contato_id.value,
                }).then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data))
        } else {
            //Caso não tiver o cadastro ele cadastra
            await axios
            .post(`http://localhost:8800/empresa`,{
                    nome_empresa: user.nome_empresa.value,
                    razao_social: user.razao_social.value,
                    cnpj_empresa: user.cnpj_empresa.value,
                    inscricao_estadual_empresa: user.inscricao_estadual_empresa.value,
                    inscricao_municipal_empresa: user.inscricao_municipal_empresa.value,
                    fk_contato_id: user.fk_contato_id.value,
            }).then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data))
        }

        user.nome_empresa.value = "";
        user.razao_social.value = "";
        user.cnpj_empresa.value = "";
        user.inscricao_estadual_empresa.value = "";
        user.inscricao_municipal_empresa.value = "";
        user.fk_contato_id.value = "";

        setOnEdit(null);
        getUsers();
    }

    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_empresa.value = "";
        user.razao_social.value = "";
        user.cnpj_empresa.value = "";
        user.inscricao_estadual_empresa.value = "";
        user.inscricao_municipal_empresa.value = "";
        user.fk_contato_id.value = "";
      };

    return(
        <div class="flex justify-center mt-10">
            <form class="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6 p-3">
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Nome da Empresa:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="nome_empresa"
                            placeholder="Nome da empresa"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Razão Social:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="razao_social"
                            placeholder="Razão Social da Empresa"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            CNPJ:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="cnpj_empresa"
                            placeholder="00.000.000/0000-00"
                        />
                    </div>
                    {/* Colocar um select com a opção de isento */}
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Inscrição Estadual:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="inscricao_estadual_empresa"
                            placeholder="Inscrição Estadual"
                        />
                    </div>
                    {/* Colocar um select com a opção de isento */}
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Inscrição Municipal:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="inscricao_municipal_empresa"
                            placeholder="Inscrição Municipal"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Contato:
                        </label>
                        <select
                            className="w-full appearance-none bg-gray-100 border-gray-200 mt-1 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none"
                            id="grid-contato"
                            name="fk_contato_id"
                        >
                            <option value="">Selecione um Contato</option>
                            {contato && contato.map(contato => (
                            <option key={contato.id_contato} value={contato.id_contato}>
                                {contato.nome_contato}
                            </option>
                            ))}
                        </select>
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

export default CadastroEmpresa;