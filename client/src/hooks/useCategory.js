import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [categories, setCategories] = useState( [] );
    console.log( { categories } )
    //get cat
    const getCategories = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/category/all-categories` );
            setCategories( data?.categories );
        } catch ( error ) {
            console.log( error );
        }
    };

    useEffect( () => {
        getCategories();
    }, [] );

    return categories;
}