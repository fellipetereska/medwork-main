import icon_empresa from '../../../../media/icon_empresa.svg'

function BotaoEmpresa({ openEmpresaModal }) {
    return (
        <div>
            <div className='flex justify-center'>
                <div onClick={openEmpresaModal} className="max-w-xs w-52 max-h-32 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100">
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
