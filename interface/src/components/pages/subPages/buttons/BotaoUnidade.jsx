import { BsFillBuildingFill } from 'react-icons/bs'
import icon_unidade from '../../../media/icon_unidade.svg'

function BotaoUnidade () {
    return(
        <div>
            <div>
                <div class="max-w-xs w-60 max-h-32 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                    <div class="flex justify-end px-4 pt-4">
                    </div>
                    <div class="flex flex-col items-center p-4 pb-6">
                        <img src={icon_unidade} />
                        <h5 class="text-xl font-medium dark:text-gray-600">Unidade</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BotaoUnidade;