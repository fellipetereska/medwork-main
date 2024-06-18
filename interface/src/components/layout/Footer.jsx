import img from '../media/logo.png'
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa'

function Footer() {
    return (
        <div className="text-center mb-10">
            <div className="flex flex-wrap justify-center m-4">
                <Link to="/home"><img src={img} alt="" /></Link>
            </div>
            <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
                © 2023 Medwork - Medicina e Segurança do Trabalho. Todos os Direitos Reservados.
            </span>
        </div>
    )
}

export default Footer;