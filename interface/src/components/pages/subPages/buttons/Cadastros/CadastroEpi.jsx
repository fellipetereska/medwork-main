import icon_epi from '../../../../media/icon_epi.svg'

function BotaoCadastroEpi() {
    return (
        <div>
            <div className='flex justify-center'>
                <div className="max-w-xs w-52 max-h-32 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100">
                    <div className="flex flex-col items-center p-4 pb-6">
                        <img src={icon_epi} />
                        <h5 className="text-lg font-medium dark:text-gray-600">EPI's</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BotaoCadastroEpi;
