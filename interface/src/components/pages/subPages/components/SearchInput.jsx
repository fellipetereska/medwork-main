function SearchInput({ onSearch }) {

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        onSearch(searchTerm);
    }

    return (
        <>
            <div class="relative w-full">

                <input
                    type="search"
                    id="default-search"
                    class="w-full p-4 ps-10 text-sm text-gray-900 rounded-full bg-gray-50"
                    placeholder="Buscar Empresa..."
                    onChange={handleInputChange}
                    required
                />
                <button
                    type="submit"
                    class="text-gray-400 absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none hover:text-gray-700 font-medium rounded-lg text-sm px-4 py-2">
                    <svg
                        class="h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20">
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default SearchInput;