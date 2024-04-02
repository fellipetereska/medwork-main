import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/auth';
import "react-toastify/dist/ReactToastify.css";

// Importante as Paginas
import Home from './components/pages/Home';
import Gestao from './components/pages/Gestao';
import Cadastros from './components/pages/Cadastros';
import Inventario from './components/pages/Inventario';
import Plano from './components/pages/Plano';
import Laudos from './components/pages/Laudos';
import Empresa from './components/pages/subPages/empresa/Empresa';
import Unidade from './components/pages/subPages/Unidade/CadastroUnidade';
import Setor from './components/pages/subPages/setor/CadastroSetor';
import Cargo from './components/pages/subPages/cargo/CadastroCargo';
import Contato from './components/pages/subPages/contato/CadastroContato';
import Usuario from './components/pages/subPages/usuarios/CadastroUsuario';
import Login from './components/pages/Login';
import Processos from './components/pages/subPages/Processos/Processos';
import Riscos from './components/pages/subPages/Riscos/Riscos';
import Medidas from './components/pages/subPages/CadastroMedidas';
import Aparelhos from './components/pages/subPages/aparelhos/Aparelhos';
import ImportXlsx from './components/pages/subPages/components/ImportXlsx';
import Elaboradores from './components/pages/subPages/Elaborador/CadastroElaborador';
import Vinculos from './components/pages/subPages/vinculos/Vinculos';
import LaudoPgr from './components/pages/subPages/Laudos/LaudoPgr';
import LaudoLtcat from './components/pages/subPages/Laudos/LaudoLtcat';
import LaudoLip from './components/pages/subPages/Laudos/LaudoLip';

// Importando os Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/pages/subPages/components/LoadingScreen';
import PrivateRoute from './components/pages/subPages/components/PrivateRoute';

// Função Principal
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        {/* Loading */}
        <LoadingScreen />
        {/* Definindo quais serão as rotas */}
        <Routes>
          {/* Linkando as rotas as paginas */}
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<PrivateRoute requiredPermission={2}><Home /></PrivateRoute>} />
          <Route path='/gestao' element={<PrivateRoute requiredPermission={2}><Gestao /></PrivateRoute>} />
          <Route path='/cadastros' element={<PrivateRoute requiredPermission={2}><Cadastros /></PrivateRoute>} />
          <Route path='/inventario' element={<PrivateRoute requiredPermission={2}><Inventario /></PrivateRoute>} />
          <Route path='/plano' element={<PrivateRoute requiredPermission={2}><Plano /></PrivateRoute>} />
          <Route path='/laudos' element={<PrivateRoute requiredPermission={2}><Laudos /></PrivateRoute>} />
          <Route path='/cadastro_empresa' element={<PrivateRoute requiredPermission={2}><Empresa /></PrivateRoute>} />
          <Route path='/cadastro_unidade' element={<PrivateRoute requiredPermission={2}><Unidade /></PrivateRoute>} />
          <Route path='/cadastro_setor' element={<PrivateRoute requiredPermission={2}><Setor /></PrivateRoute>} />
          <Route path='/cadastro_cargo' element={<PrivateRoute requiredPermission={2}><Cargo /></PrivateRoute>} />
          <Route path='/cadastro_contato' element={<PrivateRoute requiredPermission={2}><Contato /></PrivateRoute>} />
          <Route path='/cadastro_usuario' element={<PrivateRoute requiredPermission={1}><Usuario /></PrivateRoute>} />
          <Route path='/cadastro_processo' element={<PrivateRoute requiredPermission={2}><Processos /></PrivateRoute>} />
          <Route path='/cadastro_risco' element={<PrivateRoute requiredPermission={2}><Riscos /></PrivateRoute>} />
          <Route path='/cadastro_medida' element={<PrivateRoute requiredPermission={2}><Medidas /></PrivateRoute>} />
          <Route path='/cadastro_aparelhos' element={<PrivateRoute requiredPermission={2}><Aparelhos /></PrivateRoute>} />
          <Route path='/cadastro_elaboradores' element={<PrivateRoute requiredPermission={2}><Elaboradores /></PrivateRoute>} />
          <Route path='/importxlsx' element={<PrivateRoute requiredPermission={1}><ImportXlsx /></PrivateRoute>} />
          <Route path='/vinculos' element={<PrivateRoute requiredPermission={2}><Vinculos /></PrivateRoute>} />
          <Route path='/gerar_pgr' element={<PrivateRoute requiredPermission={2}><LaudoPgr /></PrivateRoute>} />
          <Route path='/gerar_ltcat' element={<PrivateRoute requiredPermission={2}><LaudoLtcat /></PrivateRoute>} />
          <Route path='/gerar_lip' element={<PrivateRoute requiredPermission={2}><LaudoLip /></PrivateRoute>} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>

        <Footer />
      </Router>

      {/* Mensagem */}
      <ToastContainer
        autoClose={3000}
        position={toast.POSITION.TOP_RIGHT}
      />
    </AuthProvider>
  );
}

export default App;
