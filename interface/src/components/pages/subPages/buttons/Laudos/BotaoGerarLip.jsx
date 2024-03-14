import icon_lip from '../../../../media/icons_laudos/icon_lip.svg'

function BotaoGerarLip() {
    return (
        <div className='grid grid-cols-3 h-24 justify-center items-center bg-gray-100 p-4 rounded-md border border-gray-200'>
            <div className='col-span-1 flex justify-center'>
                <img src={icon_lip} />
            </div>
            <div className='col-span-2 flex flex-col'>
                <p className='text-lg font-bold text-gray-600'>LIP</p>
                <p className="text-xs font-light text-gray-500">Laudo de Insalubridade e Periculosidade</p>
            </div>
        </div>
    );
}

export default BotaoGerarLip;
