import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [empresa, setEmpresa] = useState(null);

  const signin = async (usuario, senha) => {
    try{
        const res = await axios.post(`http://localhost:8800/login`,{ usuario, senha })
        setUser(res.data.user);
    }catch(error){
        console.log(error)
    }
  };

  const selectCompany = async (id_empresa) => {
    try{
        const res = await axios.post(`http://localhost:8800/selectCompany`,{ id_empresa })
        setEmpresa(res.data.company);
    }catch(error){
        console.log(error)
    }
  };

  const signout = () => {
    setUser(null);
    setEmpresa(null);
  };

  
  return (
    <AuthContext.Provider value={{ user, empresa, signed: !!user, signin, signout, selectCompany }}>
      {children}
    </AuthContext.Provider>
  );
};
