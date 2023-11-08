function SearchInput ({onSearch}) {

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        onSearch(searchTerm);
      }

    return(
        <div className="flex justify-center">
            <div class="relative w-full">
                <input 
                    type="search" 
                    id="default-search" 
                    class=" w-full p-4 pl-6 text-sm text-gray-900 border-gray-300 rounded-full bg-gray-50 focus:ring-gray-200 focus:border-gray-200 dark:bg-gray-100 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-gray-200 dark:focus:border-gray-200" 
                    placeholder="Buscar Empresa" 
                    onChange={handleInputChange}
                    required></input>
                <button type="submit" class=" text-gray-400 absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none hover:text-gray-700 font-medium rounded-lg text-sm px-4 py-2 ">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default SearchInput;