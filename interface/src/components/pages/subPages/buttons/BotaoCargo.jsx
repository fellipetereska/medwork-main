import { BsPersonBadgeFill } from 'react-icons/bs'
import icon_cargo from '../../../media/icon_cargo.svg'

function BotaoCargo () {
    return(
        <div>
            <div className='flex justify-center'>
                <div className="max-w-xs w-52 max-h-32 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                    <div className="flex flex-col items-center p-4 pb-6">
                        <img src={icon_cargo} alt="" />
                        <h5 className="text-xl font-medium dark:text-gray-600">Cargo</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BotaoCargo;