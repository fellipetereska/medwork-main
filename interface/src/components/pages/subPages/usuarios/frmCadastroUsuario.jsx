import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'


function FrmCadastroUsuario ({onEdit, setOnEdit, getUsuario}) {

    // Instanciando a variavel que vai referenciar o formulario
    const ref = useRef(null);

    // Colocando as informações do formulario nas variaveis
    useEffect( () => {
        if(onEdit) {
            const user = ref.current;

            //Passando o dado do input para a props
            user.nome_usuario.value = onEdit.nome_usuario;
            user.cpf_usuario.value = onEdit.cpf_usuario;
            user.email_usuario.value = onEdit.email_usuario;
            user.usuario.value = onEdit.usuario;
            user.senha.value = onEdit.senha;
            user.permissao_usuario.value = onEdit.permissao_usuario;
        }
    }, [onEdit]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome_usuario.value ||
            !user.cpf_usuario.value ||
            !user.email_usuario.value ||
            !user.usuario.value ||
            !user.senha.value ||
            !user.permissao_usuario){
                return toast.warn("Preencha Todos os Campos!")
            }
        
        if(onEdit){
            //Caso já tiver o cadastro ele vai colocar as opções para editar
            await axios
                .put(`http://localhost:8800/usuarios/${onEdit.id}`, {
                    nome_usuario: user.nome_usuario.value,
                    cpf_usuario: user.cpf_usuario.value,
                    email_usuario: user.email_usuario.value,
                    usuario: user.usuario.value,
                    senha: user.senha.value,
                    permissao_usuario: user.permissao_usuario.value
                }).then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data))
        } else {
            //Caso não tiver o cadastro ele cadastra
            await axios
            .post("http://localhost:8800/usuarios",{
                nome_usuario: user.nome_usuario.value,
                cpf_usuario: user.cpf_usuario.value,
                email_usuario: user.email_usuario.value,
                usuario: user.usuario.value,
                senha: user.senha.value,
                permissao_usuario: user.permissao_usuario.value
            }).then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data))
        }

        user.nome_usuario.value = "";
        user.cpf_usuario.value = "";
        user.email_usuario.value = "";
        user.usuario.value = "";
        user.senha.value = "";
        user.permissao_usuario.value = "";

        setOnEdit(null);
        getUsuario();
    }

    const handleClear = () => {
        // Limpa todos os campos do formulário
        const user = ref.current;
        user.nome_usuario.value = "";
        user.cpf_usuario.value = "";
        user.email_usuario.value = "";
        user.usuario.value = "";
        user.senha.value = "";
        user.permissao_usuario.value = "";
      };

    return(
        <div class="flex justify-center mt-10">
            <form class="w-full max-w-5xl" ref={ref} onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Nome:
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="nome_usuario"
                            placeholder="Nome"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            CPF:
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="cpf_usuario"
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
                            name="email_usuario"
                            placeholder="Email do Usuário"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Usuário
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="usuario"
                            placeholder="Nome de Usuário"
                        />
                        <p class="text-xs text-gray-400  mb-3">*Letras minúsculas e sem espaço</p>
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Senha
                        </label>
                        <input 
                            class="apperance-none block w-full bg-gray-100 rounded py-3 px-4 mb-3 mt-1 leading-tight focus:outline-gray-100 focus:bg-white" 
                            type="text" 
                            name="senha"
                            placeholder="Senha do Usuário"
                        />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                        <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nome_empresa">
                            Permissão:
                        </label>
                        <select
                            className="w-full appearance-none bg-gray-100 border-gray-200 mt-1 text-gray-400 py-3 px-4 rounded leading-tight focus:outline-none"
                            id="grid-usuario"
                            name="permissao_usuario"
                        >
                            <option>Selecione um Contato</option>
                            <option>Administrador</option>
                            <option>Técnico</option>
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

export default FrmCadastroUsuario;