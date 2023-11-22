import { IoArrowBackOutline } from "react-icons/io5";


function BotaoVoltar() {
    return (
        <>
            <button
                type="submit"
                className="absolut xl:ml-32 px-6 py-2">
                    <IoArrowBackOutline className="text-sky-800 hover:text-sky-600" />
            </button>
        </>
    )
}

export default BotaoVoltar;