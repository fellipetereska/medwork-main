import { BsFillBuildingsFill } from 'react-icons/bs'
import icon_empresa from '../../../media/icon_empresa.svg'

function BotaoEmpresa({ openEmpresaModal }) {
    return (
        <div>
            <div>
                <div onClick={openEmpresaModal} className="max-w-xs w-60 max-h-32 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                    <div className="flex justify-end px-4 pt-4">
                    </div>
                    <div className="flex flex-col items-center p-4 pb-6">
                        <img src={icon_empresa} />
                        <h5 className="text-xl font-medium dark:text-gray-600">Empresa</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BotaoEmpresa;
