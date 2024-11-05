import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomModal from '../../components/CustomModal';
import { useCart } from '../../components/context/cart';
import { handleAddToCart } from '../../components/utility';

const ProductDetailsModal = ( props ) => {
    const { openModal, setOpenModal, slug, setSlug } = props;
    const navigate = useNavigate()
    const params = useParams();
    const [product, setProduct] = useState( {} );
    const [cart, setCart] = useCart();
    useEffect( () => {
        if ( slug ) getProduct();
    }, [slug] );
    // getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`
            );
            setProduct( data?.product );
        } catch ( error ) {
            console.log( error );
        }
    };
    const handleCart = ( product ) => {
        console.log( product )
        handleAddToCart( cart, setCart, product )
    };
    console.log( { product } )
    const truncateDetails = ( description, maxLength = 120 ) => {
        return description?.length > maxLength ? description.slice( 0, maxLength ) + '....' : description;
    };
    const handleQuantityIncrease = ( id ) => {
        setProduct( ( prevProduct ) => ( {
            ...prevProduct, // Spread the existing properties
            cartQuantity: prevProduct.cartQuantity + 1 // Increase quantity by 1
        } ) );

    }
    const handleQuantityDecrease = ( id ) => {
        setProduct( ( prevProduct ) => ( {
            ...prevProduct, // Spread the existing properties
            cartQuantity: prevProduct.cartQuantity - 1 // Increase quantity by 1
        } ) );

    }
    return (
        <CustomModal
            // title={`Quick View Modal`}
            openModal={openModal}
            handleMainModelSubmit={() => { }}
            handleMainModalToggleClose={() => setOpenModal( prev => !prev )}
            className='modal-dialog modal-lg'
            isOkButtonHidden={true}
        >
            <div className="row mt-2">
                <div className="col-md-6">
                    <div>

                        <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
                            className="details-img-modal"
                            alt={product?.name}
                        // style={{ height: '500px', width: '500px' }}
                        />

                    </div>
                </div>
                <div className="col-md-6">
                    {/* <h1 className="text-center">Product Details</h1> */}
                    {product.quantity === 0 && (
                        <button style={{ border: 'none', padding: '5px', background: '#A4A0A0', color: 'white', width: '50%', marginBottom: '20px', fontWeight: 'bold' }}>
                            Out of Stock
                        </button>
                    )}
                    <h5> {product?.name}</h5>
                    <h6 className='mt-3'>Category : {product?.category?.name}</h6>
                    <h6 className='text-success mt-4'>$ {product?.price}</h6>
                    <br />
                    <div className='text-justify'>
                        <h6 className=''><b>Description :</b></h6>
                        <h6 >{truncateDetails( product?.description )} </h6>
                    </div>

                    <hr />
                    {/* <div className='mb-3'>
                        <button
                            disabled={product.cartQuantity === product.quantity}
                            style={{
                                width: "30px",
                                border: '1px solid #E1E8E9',
                                outline: 'none',
                                padding: '3px',
                                textAlign: 'center',
                            }}
                            onClick={() => handleQuantityIncrease( product._id )}
                        >+
                        </button>
                        <input
                            value={product.cartQuantity}
                            type='number'
                            readOnly
                            max={product.quantity}
                            className="center-input"
                            style={{
                                width: "50px",
                                border: '1px solid #E1E8E9',
                                outline: 'none',
                                padding: '3px',

                            }}
                        />
                        <button
                            disabled={product.cartQuantity === 1}
                            style={{
                                width: "30px",
                                border: '1px solid #E1E8E9',
                                outline: 'none',
                                padding: '3px',
                                textAlign: 'center',
                            }}
                            onClick={() => handleQuantityDecrease()}

                        >-</button>
                    </div> */}
                    {/* <button class="btn btn-success ms-1" onClick={() => handleCart( product )}>ADD TO CART</button> */}
                    <div className="d-flex justify-content-between">

                        <button
                            className="card-btn-details-modal"
                            // style={{ width: '100px', fontWeight: "bold" }}
                            onClick={() => handleCart( product )}
                            disabled={product.quantity === 0}

                        >
                            ADD TO CART
                        </button>
                        <button className='back-btn-details-modal'
                            onClick={() => navigate( `/product/${slug}` )}
                        >
                            View Full Details
                        </button>
                    </div>

                </div>
            </div>
        </CustomModal>
    )
}

export default ProductDetailsModal