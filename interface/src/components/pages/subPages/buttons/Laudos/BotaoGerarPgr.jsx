import icon_pgr from '../../../../media/icons_laudos/icon_pgr.svg'

function BotaoGerarPgr() {
    return (
        <div className='grid grid-cols-3 justify-center h-24 items-center bg-gray-100 p-4 rounded-md border border-gray-200'>
            <div className='col-span-1 flex justify-center'>
                <img src={icon_pgr} />
            </div>
            <div className='col-span-2 flex flex-col'>
                <p className='text-lg font-bold text-gray-600'>PGR</p>
                <p className="text-xs font-light text-gray-500">Programa de Gerenciamento de Riscos</p>
            </div>
        </div>
    );
}

export default BotaoGerarPgr;
