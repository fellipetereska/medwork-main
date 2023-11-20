import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageToken = localStorage.getItem('token');
      console.log('Stored token:', storageToken);

      if (storageToken) {
        setToken(storageToken);

        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedEmpresa = JSON.parse(localStorage.getItem('empresa'));

        if (storedUser) {
          setUser(storedUser);
          console.log('User loaded from localStorage:', storedUser);
        } else {
          try {
            const res = await axios.post(`http://localhost:8800/validate`, null, {
              headers: { Authorization: storageToken },
            });

            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            console.log('User loaded from token validation:', res.data.user);
          } catch (error) {
            console.error('Erro ao validar o token:', error);
            signout();
          }
        }

        if (storedEmpresa) {
          setEmpresa(storedEmpresa);
          console.log('Empresa loaded from localStorage:', storedEmpresa);
        }
      }
    };

    loadingStoreData();
  }, []);


  const signin = async (usuario, senha) => {
    try {
      const res = await axios.post(`http://localhost:8800/login`, { usuario, senha })
      if (res.data.user) {
        setUser(res.data.user)
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log(error)
    }
  };

  const selectCompany = async (id_empresa) => {
    try {
      const res = await axios.post(`http://localhost:8800/selectCompany`, { id_empresa })
      setEmpresa(res.data.company);
      localStorage.setItem('empresa', JSON.stringify(res.data.company))
    } catch (error) {
      console.log(error)
    }
  };

  const signout = () => {
    setUser(null);
    setEmpresa(null);
    localStorage.removeItem('token')
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        empresa,
        signed: !!user,
        signin,
        signout,
        selectCompany
      }}>
      {children}
    </AuthContext.Provider>
  );
};
