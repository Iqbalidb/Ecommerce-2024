import { Checkbox, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/cart';
import DividerWithText from '../components/DividerWithText';
import Layout from '../components/layout/Layout';
import { Prices } from '../components/Price';
import { handleAddToCart } from '../components/utility';
import ProductDetailsModal from './Modals/ProductDetailsModal';

const ProductsList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState( [] );
    const [cart, setCart] = useCart();
    const [categories, setCategories] = useState( [] );
    const [checked, setChecked] = useState( [] );
    const [radio, setRadio] = useState( [] );
    const [total, setTotal] = useState( 0 );
    const [page, setPage] = useState( 1 );
    const [loading, setLoading] = useState( false );
    const [productDetailsModal, setProductDetailsModal] = useState( false );
    const [slug, setSlug] = useState( '' );
    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/category/all-categories ` );
            if ( data?.success ) {
                setCategories( data?.categories );
            }
        } catch ( error ) {
            console.log( error );
        }
    };

    useEffect( () => {
        getAllCategory();
        getTotal();
    }, [] );
    //get products
    const getAllProducts = async () => {
        try {
            setLoading( true );
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}` );
            setLoading( false );
            setProducts( data.products );
        } catch ( error ) {
            setLoading( false );
            console.log( error );
        }
    };
    // const handleCart = ( product ) => {

    //     const updatedCart = [
    //         ...cart,
    //         product
    //     ]
    //     setCart( updatedCart );
    //     localStorage.setItem(
    //         "cart",
    //         JSON.stringify( [...cart, product] )
    //     );
    //     toast.success( 'Item added successfully' )


    // }
    const handleCart = ( product ) => {
        handleAddToCart( cart, setCart, product )
    };
    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/product/product-count` );
            setTotal( data?.total );
        } catch ( error ) {
            console.log( error );
        }
    };

    useEffect( () => {
        if ( page === 1 ) return;
        loadMore();
    }, [page] );
    // load more
    const loadMore = async () => {
        try {
            setLoading( true );
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}` );
            setLoading( false );
            setProducts( [...products, ...data?.products] );
        } catch ( error ) {
            console.log( error );
            setLoading( false );
        }
    };

    // filter by cat
    const handleFilter = ( value, id ) => {
        let all = [...checked];
        if ( value ) {
            all.push( id );
        } else {
            all = all.filter( ( c ) => c !== id );
        }
        setChecked( all );
    };
    useEffect( () => {
        if ( !checked.length || !radio.length ) getAllProducts();
    }, [checked.length, radio.length] );

    useEffect( () => {
        if ( checked.length || radio.length ) filterProduct();
    }, [checked, radio] );

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post( `${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
                checked,
                radio,
            } );
            setProducts( data?.products );
        } catch ( error ) {
            console.log( error );
        }
    };
    const truncateName = ( name, maxLength = 20 ) => {
        return name.length > maxLength ? name.slice( 0, maxLength ) + '....' : name;
    };
    const handleProductDetailsModal = ( s ) => {
        setProductDetailsModal( true );
        setSlug( s )
    }
    return (
        <Layout title='All Products - Demo Technology'>
            <div className="container mt-3 home-page">

                <div className="row">

                    <div className="col-md-2">
                        <h5 className="text-center mt-5" style={{ color: '#5d5665' }}>Filter By Category</h5>
                        <hr />
                        <div className="d-flex flex-column">
                            {categories?.map( ( c ) => (
                                <Checkbox
                                    key={c._id}
                                    onChange={( e ) => handleFilter( e.target.checked, c._id )}
                                    className='filter-checkbox'
                                >
                                    {c.name}
                                </Checkbox>
                            ) )}
                        </div>
                        {/* price filter */}
                        <h5 className="text-center mt-4" style={{ color: '#5d5665' }}>Filter By Price</h5>
                        <hr />
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={( e ) => setRadio( e.target.value )} >
                                {Prices?.map( ( p ) => (
                                    <div key={p._id}>
                                        <Radio value={p.array} className='filter-radio'>{p.name}</Radio>
                                    </div>
                                ) )}
                            </Radio.Group>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <button
                                className="btn btn-danger"
                                onClick={() => window.location.reload()}
                            >
                                RESET FILTERS
                            </button>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <DividerWithText text="All Products" />
                        {
                            products.length > 0 ? <>
                                <div className="d-flex flex-wrap align-content-center justify-content-center">
                                    {products?.map( ( p ) => (
                                        <div className="card m-2 transition-card" style={{ width: '15rem', cursor: 'pointer' }} >
                                            <div className="image-wrapper position-relative">
                                                <img
                                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}

                                                />
                                                {p.quantity === 0 && (
                                                    <span className="out-of-stock-label">Out of Stock</span>
                                                )}
                                                <div className="overlay"></div>
                                                <button className="quick-view-btn position-absolute"
                                                    onClick={() => handleProductDetailsModal( p?.slug )}

                                                >
                                                    Quick View
                                                </button>
                                            </div>
                                            <div className="card-body border-top-1">

                                                <Link className='product-name' to={`/product/${p.slug}`}>
                                                    <h6>
                                                        {truncateName( p.name )}
                                                    </h6>
                                                    <h6 className="card-text price-text"> Tk. {p.price}</h6>
                                                </Link>
                                                <hr />
                                                <div className="d-flex justify-content-center">
                                                    <button
                                                        className="card-btn"
                                                        disabled={p.quantity === 0}
                                                        onClick={() => handleCart( p )}
                                                    >
                                                        ADD TO CART
                                                    </button>
                                                </div>


                                            </div>
                                        </div>
                                    ) )}
                                </div>
                                <div className="m-2 p-3 d-flex justify-content-center">
                                    {products && products.length < total && (
                                        <button
                                            className="btn btn-outline-success"
                                            style={{ width: '200px', fontWeight: "bold" }}
                                            onClick={( e ) => {
                                                e.preventDefault();
                                                setPage( page + 1 );
                                            }}
                                        >
                                            {loading ? "Loading ..." : "Load More"}
                                        </button>
                                    )}
                                </div>
                            </> : <div>
                                <h2 className='text-center'> Sorry !! No Product found of this entire category....</h2>
                            </div>
                        }

                    </div>
                </div>

            </div>
            {
                productDetailsModal && (
                    <ProductDetailsModal
                        openModal={productDetailsModal}
                        setOpenModal={setProductDetailsModal}
                        slug={slug}
                        setSlug={setSlug}
                    />
                )
            }
        </Layout>
    )
}

export default ProductsList