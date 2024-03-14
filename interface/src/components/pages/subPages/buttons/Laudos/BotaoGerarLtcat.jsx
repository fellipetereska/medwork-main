import icon_ltcat from '../../../../media/icons_laudos/icon_ltcat.svg'

function BotaoGerarLtcat() {
    return (
        <div className='grid grid-cols-3 h-24 justify-center items-center bg-gray-100 p-4 rounded-md border border-gray-200'>
            <div className='col-span-1 flex justify-center'>
                <img src={icon_ltcat} />
            </div>
            <div className='col-span-2 flex flex-col'>
                <p className='text-lg font-bold text-gray-600'>LTCAT</p>
                <p className="text-xs font-light text-gray-500">Laudo Técnico das Condições do Ambiente de Trabalho</p>
            </div>
        </div>
    );
}

export default BotaoGerarLtcat;
