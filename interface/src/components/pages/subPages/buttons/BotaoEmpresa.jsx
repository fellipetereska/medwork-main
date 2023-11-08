import { BsFillBuildingsFill } from 'react-icons/bs'

function BotaoEmpresa({ openEmpresaModal }) {
    return (
        <div>
            <div>
                <div onClick={openEmpresaModal} className="max-w-xs w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                    <div className="flex justify-end px-4 pt-4">
                    </div>
                    <div className="flex flex-col items-center p-4 pb-6">
                        <BsFillBuildingsFill className='scale-150 mb-2' />
                        <h5 className="text-xl font-medium dark:text-gray-600">Empresa</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BotaoEmpresa;
