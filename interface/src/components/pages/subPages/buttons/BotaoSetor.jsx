import { BsHouseFill } from 'react-icons/bs'

function BotaoSetor () {
    return(
        <div>
            <div>
                <div class="max-w-xs w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                    <div class="flex justify-end px-4 pt-4">
                    </div>
                    <div class="flex flex-col items-center p-4 pb-6">
                        <BsHouseFill className='scale-150 mb-2' />
                        <h5 class="text-xl font-medium dark:text-gray-600">Setor</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BotaoSetor;