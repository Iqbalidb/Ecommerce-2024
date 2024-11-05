import axios from 'axios';
import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/search';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
            );
            setValues( { ...values, results: data } );
            navigate( "/search" );
        } catch ( error ) {
            console.log( error );
        }
    };
    return (
        <div >
            <form className="d-flex search" role="search" onSubmit={handleSubmit} >
                {/* <input
                    className="form-control me-2 search-input"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={( e ) => setValues( { ...values, keyword: e.target.value } )}
                /> */}

                <input
                    placeholder="Search By Product Name"
                    variant="borderless"
                    className="search-input"
                    type="search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={( e ) => setValues( { ...values, keyword: e.target.value } )}
                />
                <div className='search-btn'>

                    <CiSearch size={25} cursor={'pointer'} color='white' className='' onClick={handleSubmit} />
                </div>

            </form>
        </div>
    )
}

export default SearchInput