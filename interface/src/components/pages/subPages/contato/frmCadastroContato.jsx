import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'


function FrmCadastroContato ({onEdit, setOnEdit, getContato}) {

    // Instanciando a variavel que vai referenciar o formulario
    const ref = useRef(null);

    // Colocando as informações do formulario nas variaveis
    useEffect( () => {
        if(onEdit) {
            const user = ref.current;

            //Passando o dado do input para a props
            user.nome_setor.value = onEdit.nome_setor;
            user.telefone_contato.value = onEdit.telefone_contato;
            user.email_contato.value = onEdit.email_contato;
            user.email_secundario_contato.value = onEdit.email_secundario_contato
        }
    }, [onEdit]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome_contato.value ||
            !user.telefone_contato.value ||
            !user.email_contato.value ||
            !user.email_secundario_contato.value){
                return toast.warn("Preencha Todos os Campos!")
            }
        
        if(onEdit){
            //Caso já tiver o cadastro ele vai colocar as opções para editar
            await axios
                .put(`http://localhost:8800/contato/${onEdit.id}`, {
                    nome_contato: user.nome_contato.value,
                    telefone_contato: user.telefone_contato.value,
                    email_contato: user.email_contato.value,
                    email_secundario_contato: user.email_secundario_contato.value
                }).then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data))
        } else {
            //Caso não tiver o cadastro ele cadastra
            console.log("Dados a serem enviados:", {
                nome_contato: user.nome_contato.value,
                telefone_contato: user.telefone_contato.value,
                email_contato: user.email_contato.value,
                email_secundario_contato: user.email_secundario_contato.value
            });
            await axios
            .post("http://localhost:8800/contato",{
                nome_contato: user.nome_contato.value,
                telefone_contato: user.telefone_contato.value,
                email_contato: user.email_contato.value,
                email_secundario_contato: user.email_secundario_contato.value
            }).then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data))
        }

        user.nome_contato.value = "";
        user.telefone_contato.value = "";
        user.email_contato.value = "";
        user.email_secundario_contato.value = "";

        setOnEdit(null);
        getContato();
    }

    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_contato.value = "";
        user.telefone_contato.value = "";
        user.email_contato.value = "";
        user.email_secundario_contato.value = "";
      };

    return(
        <div class="flex justify-center mt-10">
            <form class="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Nome
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="nome_contato"
                            placeholder="Nome do Setor"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Telefone
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="telefone_contato"
                            placeholder="Telefone para Contato"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Email
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="email_contato"
                            placeholder="Email para Contato"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Email Secunário
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="email_secundario_contato"
                            placeholder="Email para Contato"
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

export default FrmCadastroContato;