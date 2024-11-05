import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../components/context/cart';
import DividerWithText from '../components/DividerWithText';
import Layout from '../components/layout/Layout';
import { handleAddToCart } from '../components/utility';
import ProductDetailsModal from './Modals/ProductDetailsModal';
const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState( [] );
    const [category, setCategory] = useState( [] );
    const [cart, setCart] = useCart();
    const [productDetailsModal, setProductDetailsModal] = useState( false );
    const [slug, setSlug] = useState( '' );
    useEffect( () => {
        if ( params?.slug ) getPrductsByCat();
    }, [params?.slug] );
    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
            );
            setProducts( data?.products );
            setCategory( data?.category );
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
        <Layout title={`${category?.name}`}>
            <div className="container mt-3">
                <DividerWithText text={`Category - ${category?.name}`} />
                <h6 className="text-center mb-2">{products?.length} Products found </h6>
                {/* <Breadcrumb className='breadcrumb-main'>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem >{category?.name}</BreadcrumbItem>
                </Breadcrumb> */}
                <div className="row">
                    <div className="col-md-9 offset-1">
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
                        {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
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

export default CategoryProduct