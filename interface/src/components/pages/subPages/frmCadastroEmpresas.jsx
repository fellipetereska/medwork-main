import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'


function CadastroEmpresa ({onEdit, setOnEdit, getUsers}) {

    // Instanciando a variavel que vai referenciar o formulario
    const ref = useRef(null);

    // Colocando as informações do formulario nas variaveis
    useEffect( () => {
        if(onEdit) {
            const user = ref.current;

            //Passando o dado do input para a props
            user.nome_empresa.value = onEdit.nome_empresa;
            user.razao_social.value = onEdit.razao_social;
            user.cnpj_empresa.value = onEdit.cnpj_empresa;
            user.endereco_empresa.value = onEdit.endereco_empresa;
            user.cidade.value = onEdit.cidade;
            user.contato.value = onEdit.contato;
            user.telefone.value = onEdit.telefone;

            console.log("onEdit.cnpj_empresa:", onEdit.cnpj_empresa);
        }
    }, [onEdit]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome_empresa.value ||
            !user.razao_social.value ||
            !user.cnpj_empresa.value ||
            !user.endereco_empresa.value ||
            !user.cidade.value ||
            !user.contato.value ||
            !user.telefone.value){
                return toast.warn("Preencha Todos os Campos!")
            }
        
        if(onEdit){
            //Caso já tiver o cadastro ele vai colocar as opções para editar
            await axios
                .put(`http://localhost:8800/${onEdit.id}`, {
                    nome_empresa: user.nome_empresa.value,
                    razao_social: user.razao_social.value,
                    cnpj: user.cnpj_empresa.value,
                    endereco: user.endereco_empresa.value,
                    cidade: user.cidade.value,
                    contato: user.contato.value,
                    telefone: user.telefone.value,
                }).then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data))
        } else {
            //Caso não tiver o cadastro ele cadastra
            await axios
            .post("http://localhost:8800",{
                nome_empresa: user.nome_empresa.value,
                razao_social: user.razao_social.value,
                cnpj: user.cnpj_empresa.value,
                endereco: user.endereco_empresa.value,
                cidade: user.cidade.value,
                contato: user.contato.value,
                telefone: user.telefone.value,
            }).then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data))
        }

        user.nome_empresa.value = "";
        user.razao_social.value = "";
        user.cnpj_empresa.value = "";
        user.endereco_empresa.value = "";
        user.cidade.value = "";
        user.contato.value = "";
        user.telefone.value = "";

        setOnEdit(null);
        getUsers();
    }

    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_empresa.value = "";
        user.razao_social.value = "";
        user.cnpj_empresa.value = "";
        user.endereco_empresa.value = "";
        user.cidade.value = "";
        user.contato.value = "";
        user.telefone.value = "";
      };

    return(
        <div class="flex justify-center mt-10 mb-20">
            <form class="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Nome da Empresa:
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
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
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
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
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="cnpj_empresa"
                            placeholder="00.000.000/0000-00"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Endereço:
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="endereco_empresa"
                            placeholder="Endereço da Empresa"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Cidade:
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="cidade"
                            placeholder="Cidade"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Responsável:
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="contato"
                            placeholder="Nome do Responsável"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Telefone:
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="number" 
                            name="telefone"
                            placeholder="(00) 00000-0000"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <div>
                            <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                                Setor:
                            </label>
                            <select class="block appearance-none w-full bg-gray-100 border-gray-200 mt-1 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none" id="grid-state">
                                <option>Selecione uma Opção</option>
                            </select>
                        </div>
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