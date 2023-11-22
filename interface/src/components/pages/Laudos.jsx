import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {supabase} from '../../services/api'

function Laudos() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    async function getCountries() {
        const { data } = await supabase.from("countries").select();
        setCountries(data);
    }


    return (
        <ul>
            {countries.map((country) => (
                <li key={country.name}>{country.name}</li>
            ))}
        </ul>
    )
}

export default Laudos;