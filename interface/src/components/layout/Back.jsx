import { IoArrowBackOutline } from "react-icons/io5";


function BotaoVoltar() {
    return (
        <>
            <button
                type="submit"
                className="absolut xl:ml-32 px-4 py-2 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100">
                    <IoArrowBackOutline className="text-sky-800" />
            </button>
        </>
    )
}

export default BotaoVoltar;