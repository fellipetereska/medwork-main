import { BsHouseFill } from 'react-icons/bs'
import icon_setor from '../../../media/icon_setor.svg'

function BotaoSetor () {
    return(
        <div>
            <div className='flex justify-center'>
                <div class="max-w-xs w-52 max-h-32 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                    <div class="flex flex-col items-center p-4 pb-6">
                        <img src={icon_setor} />
                        <h5 class="text-xl font-medium dark:text-gray-600">Setor</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BotaoSetor;