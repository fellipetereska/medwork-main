import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'


function FrmCadastroUnidade ({onEdit, setOnEdit, getUsers}) {

    // Instanciando a variavel que vai referenciar o formulario
    const ref = useRef(null);

    const [contato, setContato] = useState(null);
    const [empresa, setEmpresa] = useState(null);

    //Buscar os contatos para colocar no select
    const fetchContato = async () => {
        try {
          const response = await axios.get("http://localhost:8800/contato");
          setContato(response.data);
        } catch (error) {
          console.error("Erro ao buscar contato:", error);
        }
    };

      useEffect(() => {
        fetchContato();
    });

    //Buscar as empresas para colocar no select
    const fetchEmpresa = async () => {
        try{
            const res = await axios.get("http://localhost:8800/empresa")
            setEmpresa(res.data);
        }catch (error){
            console.log("Erro ao buscar Empresa: ", error)
        }
    };

    useEffect(() => {
        fetchEmpresa();
    });

    // Colocando as informações do formulario nas variaveis
    useEffect( () => {
        if(onEdit) {
            const user = ref.current

            //Passando o dado do input para a props
            user.nome_unidade.value = onEdit.nome_unidade;
            user.cnpj_unidade.value = onEdit.cnpj_unidade;
            user.cep_unidade.value = onEdit.cep_unidade;
            user.endereco_unidade.value = onEdit.endereco_unidade;
            user.bairro_unidade.value = onEdit.bairro_unidade;
            user.cidade_unidade.value = onEdit.cidade_unidade;
            user.uf_unidade.value = onEdit.uf_unidade;
            user.fk_contato_id.value = onEdit.fk_contato_id;
            user.fk_empresa_id.value = onEdit.fk_empresa_id;
        }
    }, [onEdit]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome_unidade.value ||
            !user.cnpj_unidade.value ||
            !user.cep_unidade.value ||
            !user.endereco_unidade.value ||
            !user.bairro_unidade.value ||
            !user.cidade_unidade.value ||
            !user.uf_unidade.value ||
            !user.fk_contato_id.value ||
            !user.fk_empresa_id.value){
                return toast.warn("Preencha Todos os Campos!")
            }
        
        if(onEdit){
            //Caso já tiver o cadastro ele vai colocar as opções para editar
            await axios
                .put(`http://localhost:8800/unidade/${onEdit.id}`, {
                    nome_unidade: user.nome_unidade.value,
                    cnpj_unidade: user.cnpj_unidade.value,
                    cep_unidade: user.cep_unidade.value,
                    endereco_unidade: user.endereco_unidade.value,
                    bairro_unidade: user.bairro_unidade.value,
                    cidade_unidade: user.cidade_unidade.value,
                    uf_unidade: user.uf_unidade.value,
                    fk_contato_id: user.fk_contato_id.value,
                    fk_empresa_id: user.fk_empresa_id.value
                }).then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data))
        } else {
            //Caso não tiver o cadastro ele cadastra
            await axios
            .post(`http://localhost:8800/unidade`,{
                nome_unidade: user.nome_unidade.value,
                cnpj_unidade: user.cnpj_unidade.value,
                cep_unidade: user.cep_unidade.value,
                endereco_unidade: user.endereco_unidade.value,
                bairro_unidade: user.bairro_unidade.value,
                cidade_unidade: user.cidade_unidade.value,
                uf_unidade: user.uf_unidade.value,
                fk_contato_id: user.fk_contato_id.value,
                fk_empresa_id: user.fk_empresa_id.value,
            }).then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data))
        }

        user.nome_unidade.value = "";
        user.cnpj_unidade.value = "";
        user.cep_unidade.value = "";
        user.endereco_unidade.value = "";
        user.bairro_unidade.value = "";
        user.cidade_unidade.value = "";
        user.uf_unidade.value = "";
        user.fk_contato_id.value = "";
        user.fk_empresa_id.value = "";

        setOnEdit(null);
        getUsers();
    }

    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_unidade.value = "";
        user.cnpj_unidade.value = "";
        user.cep_unidade.value = "";
        user.endereco_unidade.value = "";
        user.bairro_unidade.value = "";
        user.cidade_unidade.value = "";
        user.uf_unidade.value = "";
        user.fk_contato_id.value = "";
        user.fk_empresa_id.value = "";
      };

    return(
        <div class="flex justify-center mt-10">
            <form class="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6 p-3">
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Nome da Unidade:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="nome_unidade"
                            placeholder="Nome da Unidade"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            CNPJ:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="cnpj_unidade"
                            placeholder="CNPJ da Unidade"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            CEP:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="cep_unidade"
                            placeholder="00000-000"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Endereço:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="endereco_unidade"
                            placeholder="Endereço da Unidade"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Bairro:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="bairro_unidade"
                            placeholder="Bairro da Unidade"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Cidade:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="cidade_unidade"
                            placeholder="Cidade da Unidade"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            UF:
                        </label>
                        <input
                            class="appearence-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="uf_unidade"
                            placeholder="UF da Unidade"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Contato:
                        </label>
                        <select
                            className="w-full appearance-none bg-gray-100 border-gray-200 mt-1 text-gray-400 py-3 px-4 rounded leading-tight focus:outline-none"
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
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Empresa:
                        </label>
                        <select
                            className="w-full appearance-none bg-gray-100 border-gray-200 mt-1 text-gray-400 py-3 px-4 rounded leading-tight focus:outline-none"
                            id="grid-contato"
                            name="fk_empresa_id"
                        >
                            <option value="">Selecione uma Empresa</option>
                            {empresa && empresa.map(empresa => (
                            <option key={empresa.id_empresa} value={empresa.id_empresa}>
                                {empresa.nome_empresa}
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

export default FrmCadastroUnidade;