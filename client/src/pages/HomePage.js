import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsChatLeftDotsFill, BsShieldFillCheck, BsWechat } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { UncontrolledCarousel } from 'reactstrap';
import { useCart } from '../components/context/cart';
import DividerWithText from '../components/DividerWithText';
import Layout from '../components/layout/Layout';
import { handleAddToCart } from '../components/utility';
import ProductDetailsModal from './Modals/ProductDetailsModal';
const HomePage = () => {
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
    const infoItems = [
        {
            id: 1,
            name: 'Raise a Complain',
            icon: <BsChatLeftDotsFill size={30} color='white' />,
            text: 'Share Your Experience'

        },
        {
            id: 2,
            name: 'Online Support',
            icon: <BsWechat size={30} color='white' />,
            text: 'Get Online Support'
        },
        {
            id: 3,
            name: 'Return Facility',
            icon: <TbTruckReturn size={30} color='white' />,
            text: 'Return Your Product Easily'
        },
        {
            id: 4,
            name: 'Product Warranty ',
            icon: <BsShieldFillCheck size={30} color='white' />,
            text: 'Strong Product Warranty'
        },
    ]
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
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/product/new-product-list/${page}` );
            setLoading( false );
            setProducts( data.products );
        } catch ( error ) {
            setLoading( false );
            console.log( error );
        }
    };
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
        <Layout title="Home - Demo Technology">
            <div className="container mt-3 home-page">

                <div className="">
                    <div className='mb-3'>
                        {/* <h3>
                            <marquee behavior="scroll" direction="left" className='mb-3'>This is a moving text using the marquee tag!</marquee>
                        </h3> */}
                        {/* <img
                            src="/banner22.jpg"
                            alt="E-commerce Banner"
                            className="banner-image"
                        // style={{ height: "300px" }}
                        /> */}

                        <UncontrolledCarousel
                            interval={3000}
                            items={[
                                {
                                    // altText: 'Slide 1',
                                    // caption: 'Slide 1',
                                    key: 1,
                                    src: '/banner1.jpg'
                                },
                                {
                                    // altText: 'Slide 2',
                                    // caption: 'Slide 2',
                                    key: 2,
                                    src: '/banner2.png'
                                },
                                {
                                    // altText: 'Slide 2',
                                    // caption: 'Slide 2',
                                    key: 2,
                                    src: '/banner3.jpg'
                                },
                                {
                                    // altText: 'Slide 2',
                                    // caption: 'Slide 2',
                                    key: 2,
                                    src: '/banner4.jpg'
                                },
                                // {
                                //     altText: 'Slide 3',
                                //     caption: 'Slide 3',
                                //     key: 3,
                                //     src: 'https://picsum.photos/id/678/1200/600'
                                // }
                            ]}
                        />
                    </div>

                    <div className="d-flex flex-wrap align-content-center justify-content-center mt-2 p-2 mb-2">
                        {infoItems?.map( ( p ) => (
                            <div className="card m-2 fac-card" style={{ width: '19rem', cursor: 'pointer' }}
                            >
                                <div key={p.id} className='p-2 d-flex'>
                                    <div style={{ background: '#EC5121', borderRadius: '50%', width: '50px', height: '50px', marginRight: '10px' }} className='d-flex align-items-center justify-content-center'>
                                        {p.icon}
                                    </div>
                                    <div className='ml-3'>
                                        <div>
                                            <h6><b>{p.name}</b></h6>
                                        </div>
                                        <div>
                                            <h6>{p.text}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) )}

                    </div>
                    <div className='mt-3'>
                        <h4 className='text-center'>Featured Category</h4>
                        <h6 className='text-center'>Get Your Desired Product from Featured Category!</h6>
                        <div className="d-flex flex-wrap align-content-center justify-content-center mt-4 mb-4">
                            {categories.map( ( c ) => (
                                <div className="card m-2 category-card" style={{ width: '15rem', cursor: 'pointer', height: '10rem' }}
                                >
                                    <div className='d-flex justify-content-center'>
                                        <Link to={`/category/${c.slug}`} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                                            {c.name}
                                        </Link>
                                    </div>

                                </div>
                            ) )}
                        </div>
                    </div>

                    <div className='mb-3'>
                        {/* <h3>
                            <marquee behavior="scroll" direction="left" className='mb-3'>This is a moving text using the marquee tag!</marquee>
                        </h3> */}
                        <img
                            src="/bannershort.jpg"
                            alt="E-commerce Banner"
                            className="banner-image"
                        // style={{ height: "300px" }}
                        />
                    </div>
                    <DividerWithText text="New Products" />
                    <div className="d-flex flex-wrap align-content-center justify-content-center">
                        {products?.map( ( p ) => (
                            <div className="card m-2 transition-card" style={{ width: '15rem', cursor: 'pointer' }}

                            >
                                <div className="image-wrapper position-relative">
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        onClick={() => navigate( `/product/${p.slug}` )}
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
                                            // style={{ width: '100px', fontWeight: "bold" }}
                                            onClick={() => handleCart( p )}
                                            disabled={p.quantity === 0}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>


                                </div>
                            </div>
                        ) )}
                    </div>
                    <div className="m-2 p-3 d-flex justify-content-center">
                        <button
                            className="extra-btn"
                            onClick={( e ) => navigate( '/products' )}
                        >
                            More
                        </button>
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
        </Layout >
    )
}

export default HomePage