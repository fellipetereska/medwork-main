import img from '../media/logo.png'
import { Link } from 'react-router-dom';
import {FaFacebook, FaInstagram} from 'react-icons/fa'

function Footer () {
    return(
        <div class="text-center mb-10">
            <div class="flex flex-wrap justify-center m-4">
                <Link to="/"><img src={img} alt="" /></Link>
            </div>
            <span class="block text-sm text-center text-gray-500 dark:text-gray-400">© 2023 Medwork - Medicina e Segurança do Trabalho. Todos os Direitos Reservados. </span>
            <ul class="flex justify-center mt-5 space-x-5">
                <li>
                    <a href="https://www.facebook.com/medworklondrina">
                        <FaFacebook class="text-gray-500 hover:text-gray-900 dark:hover:text-red-500 dark:text-gray-400" />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/medwork.ldn/">
                        <FaInstagram class="text-gray-500 hover:text-gray-900 dark:hover:text-red-500 dark:text-gray-400" />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Footer;