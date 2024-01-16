import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect, supabase } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [company, setCompany] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [empresas, setEmpresas] = useState(null);

  const fetchUser = async () => {
    const { data } = await supabase.from("usuarios").select();
    setUsuarios(data);
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const signIn = async (usuario, senha, setRedirect) => {
    if (!usuario || !senha) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: usuario,
        password: senha
      })

      if (error) {
        toast.error("Erro ao fazer login. Verifique suas credenciais.");
        console.error("Erro de autenticação:", error);
        return;
      }

      await fetchUser();
      setRedirect(true);
      const userselect = selectUser(usuario);
      setUser(userselect);

      toast.success(`Login bem-sucedido! Bem-vindo, ${usuario}!`);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login. Verifique o console para mais detalhes.");
    }
  };


  const selectUser = (usermail) => {
    if (!usuarios) {
      toast.warn("Selecione um usuário!")
    }

    const username = usuarios.find((c) => c.email_usuario === usermail)

    return username ? username.nome_usuario : "N/A"
  }


  const signout = () => {
    setUser(null);
    setEmpresa(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        empresa,
        company,
        signed: !!user,
        signin: signIn,
        signout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
