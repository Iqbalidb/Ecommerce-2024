import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../components/context/cart';
import Layout from '../components/layout/Layout';
import { handleAddToCart } from '../components/utility';
import ProductDetailsModal from './Modals/ProductDetailsModal';

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState( {} );
    const [relatedProducts, setRelatedProducts] = useState( [] );
    const [cart, setCart] = useCart();
    const [productDetailsModal, setProductDetailsModal] = useState( false );
    const [slug, setSlug] = useState( '' );
    // initalp details
    useEffect( () => {
        if ( params?.slug ) getProduct();
    }, [params?.slug] );
    // getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
            );
            setProduct( data?.product );
            getSimilarProduct( data?.product._id, data?.product.category._id );
        } catch ( error ) {
            console.log( error );
        }
    };
    //get similar product
    const getSimilarProduct = async ( pid, cid ) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts( data?.products );
        } catch ( error ) {
            console.log( error );
        }
    };
    const handleCart = ( product ) => {
        handleAddToCart( cart, setCart, product )
    };
    const truncateName = ( name, maxLength = 20 ) => {
        return name.length > maxLength ? name.slice( 0, maxLength ) + '....' : name;
    };


    const handleProductDetailsModal = ( s ) => {
        setProductDetailsModal( true );
        setSlug( s )
    }
    return (
        <Layout title={product.name}>
            <div className='container'>
                <div className="row mt-2">
                    <div className="col-md-6 mt-5">

                        <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                            className="details-img"
                            alt={product.name}
                        // style={{ height: '500px', width: '500px' }}
                        />
                    </div>
                    <div className="col-md-6 mt-5">
                        {/* <h1 className="text-center">Product Details</h1> */}
                        {product.quantity === 0 && (
                            <button style={{ border: 'none', padding: '5px', background: '#A4A0A0', color: 'white', width: '50%', marginBottom: '20px', fontWeight: 'bold' }}>
                                Out of Stock
                            </button>
                        )}
                        <h4> {product.name}</h4>
                        <h5 className='text-success '>Tk. {product.price}</h5>
                        <h6>Category : {product?.category?.name}</h6>
                        <br />
                        <div className='text-justify'>
                            <h6 className=''><b>Description :</b></h6>
                            <h6 >{product.description} </h6>
                        </div>
                        <hr />

                        {/* <button class="btn btn-success ms-1" onClick={() => handleCart( product )}>ADD TO CART</button> */}
                        <div className="">
                            <button
                                className="card-btn-details"
                                // style={{ width: '100px', fontWeight: "bold" }}
                                onClick={() => handleCart( product )}
                                disabled={product.quantity === 0}

                            >
                                ADD TO CART
                            </button>
                        </div>

                    </div>
                </div>
                <hr />
                <div className="row container">
                    <h6>Similar Products</h6>
                    {relatedProducts.length < 1 && (
                        <p className="text-center">No Similar Products found</p>
                    )}
                    <div className="d-flex flex-wrap">
                        {relatedProducts?.map( ( p ) => (
                            <div className="card m-2 transition-card" style={{ width: '15rem', cursor: 'pointer' }} >
                                <Link to={`/product/${p.slug}`}>
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
                                </Link>
                                <div className="card-body border-top-1">

                                    <Link className='product-name' to={`/product/${p.slug}`}>
                                        <h6>
                                            {truncateName( p.name )}
                                        </h6>
                                    </Link>
                                    <h6 className="card-text price-text"> $ {p.price}</h6>
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

export default ProductDetails