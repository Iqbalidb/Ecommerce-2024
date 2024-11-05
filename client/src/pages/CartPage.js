import { Radio } from "antd";
import axios from "axios";
// import DropIn from "braintree-web-drop-in-react";
import DropIn from "braintree-web-drop-in-react";
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/auth';
import { useCart } from '../components/context/cart';
import Layout from '../components/layout/Layout';

const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState( "" );
    const [instance, setInstance] = useState( "" );
    const [loading, setLoading] = useState( false );
    const navigate = useNavigate();
    const [radio, setRadio] = useState( [] );
    console.log( { cart } )
    const location = [
        {
            id: 1,
            place: "In Dhaka : Tk. 50"
        },
        {
            id: 1,
            place: "Outside Dhaka : Tk. 100"
        }
    ]
    const shippingPrice = radio === 'In Dhaka : Tk. 50' ? 50 : radio === 'Outside Dhaka : Tk. 100' ? 100 : 0;
    //total price
    const getTotalAmount = ( product ) => {
        const totalAmount = _.sum( product?.map( d => Number( d?.subTotalPrice ) ) );
        return {
            totalAmount
        };
    };
    const { totalAmount } = getTotalAmount( cart );
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map( ( item ) => {
                total = total + item.price;
            } );
            return total.toLocaleString( "ban", {
                style: "currency",
                currency: "BDT",
            } );
        } catch ( error ) {
            console.log( error );
        }
    };
    const handleQuantityIncrease = ( id ) => {
        const updatedCart = cart.map( ( c ) => {
            if ( c._id === id ) {
                return {
                    ...c,
                    cartQuantity: c.cartQuantity + 1,
                    subTotalPrice: ( c.cartQuantity + 1 ) * c.price
                }
            } else {
                return { ...c }
            }
        } )
        setCart( updatedCart )
        localStorage.setItem( "cart", JSON.stringify( updatedCart ) );

    }
    const handleQuantityDecrease = ( id ) => {
        const updatedCart = cart.map( ( c ) => {
            if ( c._id === id ) {
                return {
                    ...c,
                    cartQuantity: c.cartQuantity - 1,
                    subTotalPrice: ( c.cartQuantity - 1 ) * c.price
                }
            } else {
                return { ...c }
            }
        } )
        setCart( updatedCart )
        localStorage.setItem( "cart", JSON.stringify( updatedCart ) );

    }

    const handleRadioChange = ( e ) => {
        const { value } = e.target;
        setRadio( value )
    }
    //detele item
    const removeCartItem = ( pid ) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex( ( item ) => item._id === pid );
            myCart.splice( index, 1 );
            setCart( myCart );
            localStorage.setItem( "cart", JSON.stringify( myCart ) );
        } catch ( error ) {
            console.log( error );
        }
    };
    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/product/braintree/token` );
            setClientToken( data?.clientToken );
        } catch ( error ) {
            console.log( error );
        }
    };
    useEffect( () => {
        getToken();
    }, [auth?.token] );

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading( true );
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post( `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce,
                cart,
            } );
            setLoading( false );
            localStorage.removeItem( "cart" );
            setCart( [] );
            navigate( "/dashboard/user/orders" );
            toast.success( "Payment Completed Successfully " );
        } catch ( error ) {
            console.log( error );
            setLoading( false );
        }
    };
    return (
        <Layout title={'Cart - Demo Technology'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h4 className="text-center mb-5">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                                }`
                                : ""}
                        </h4>
                    </div>
                </div>
                {
                    cart?.length ? <div className="row">
                        <div className="col-md-8">
                            {/* {cart?.map( ( p ) => (
                            <div className="row mb-2 p-3 card flex-row">
                                <div className="col-md-4">
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ height: "100px", width: "100px" }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <p><b>{p.name}</b></p>
                                    <p>{p.description.substring( 0, 30 )}</p>
                                    <p>$ {p.price}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem( p._id )}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) )} */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">PRODUCTS</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">QUANTITY</th>
                                        <th scope="col">SUBTOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.map( ( p ) => (
                                        <>
                                            <tr>
                                                <td key={p._id}>
                                                    <IoCloseCircleSharp
                                                        size={20}
                                                        color='red'
                                                        cursor={'pointer'}
                                                        onClick={() => removeCartItem( p._id )}
                                                    />
                                                    <img
                                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        style={{ height: "80px", width: "80px" }}
                                                    />
                                                    {p.name.substring( 0, 45 )}
                                                </td>
                                                <td className="vertical-center"><b>Tk. {p.price}</b></td>
                                                <td className="vertical-center">
                                                    <div>
                                                        <button
                                                            disabled={p.cartQuantity === p.quantity}
                                                            style={{
                                                                width: "30px",
                                                                border: '1px solid #E1E8E9',
                                                                outline: 'none',
                                                                padding: '3px',
                                                                textAlign: 'center',
                                                            }}
                                                            onClick={() => handleQuantityIncrease( p._id )}
                                                        >+
                                                        </button>
                                                        <input
                                                            value={p.cartQuantity}
                                                            type='number'
                                                            readOnly
                                                            max={p.quantity}
                                                            className="center-input"
                                                            style={{
                                                                width: "50px",
                                                                border: '1px solid #E1E8E9',
                                                                outline: 'none',
                                                                padding: '3px',

                                                            }}
                                                        />
                                                        <button
                                                            disabled={p.cartQuantity === 1}
                                                            style={{
                                                                width: "30px",
                                                                border: '1px solid #E1E8E9',
                                                                outline: 'none',
                                                                padding: '3px',
                                                                textAlign: 'center',
                                                            }}
                                                            onClick={() => handleQuantityDecrease( p._id )}

                                                        >-</button>
                                                    </div>

                                                </td>
                                                <td className="vertical-center">
                                                    <b>
                                                        Tk. {p.subTotalPrice}
                                                    </b>
                                                </td>
                                            </tr>
                                        </>
                                    ) )}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-4" >
                            <div className="border" style={{ padding: '30px' }}>
                                <h4>CART TOTALS</h4>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6>Subtotal</h6>
                                    <h6><b>BDT {totalAmount}</b></h6>
                                </div>
                                <hr />
                                <h6>Shipping</h6>
                                <div>
                                    <Radio.Group onChange={( e ) => handleRadioChange( e )} >
                                        {location?.map( ( p ) => (
                                            <div key={p.id}>
                                                <h6>
                                                    <Radio value={p.place} style={{ borderBottom: 'none' }}>{p.place}</Radio>
                                                </h6>
                                            </div>
                                        ) )}
                                    </Radio.Group>
                                </div>
                                <div className="mt-2 d-flex justify-content-between">
                                    <h6>Shipping Charge</h6>
                                    <h6><b>BDT {shippingPrice.toFixed( 2 )}</b></h6>
                                </div>
                                <hr />
                                <div className="mt-2 d-flex justify-content-between">
                                    <h6>Total</h6>
                                    <h6><b>BDT {totalAmount + shippingPrice}</b></h6>
                                </div>
                                <hr />


                                <button className="proceed-btn mb-3" onClick={() => navigate( '/payment-checkout' )}>
                                    Cash On Delivery
                                </button>
                            </div>

                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3 mt-3">
                                        <h5>Payment using Card or Paypel</h5>
                                        <hr />
                                        <h5>Shipping Address :</h5>
                                        <h5>{auth?.user?.address}</h5>
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => navigate( "/dashboard/user/profile" )}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3 d-flex justify-content-center">
                                    {auth?.token ? (
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => navigate( "/dashboard/user/profile" )}
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-primary mt-3"
                                            onClick={() =>
                                                navigate( "/login", {
                                                    state: "/cart",
                                                } )
                                            }
                                        >
                                            Please Login to checkout
                                        </button>

                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {!auth?.token || !clientToken || !cart?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={( instance ) => setInstance( instance )}
                                        />

                                        <button
                                            className="btn btn-primary mb-2"
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </button>

                                    </>
                                )}
                            </div>

                        </div>

                    </div> : <div className='text-center'>
                        <div>
                            <h2>"Your Cart is currently empty!!"</h2>
                            <button className="btn bg-black text-white text-bold mt-5" type="submit" onClick={() => navigate( '/products' )}>
                                RETURN TO SHOP
                            </button>
                        </div>

                    </div>
                }

            </div>
        </Layout>
    )
}

export default CartPage