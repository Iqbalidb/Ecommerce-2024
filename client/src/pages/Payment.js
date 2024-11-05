import { Radio } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/auth';
import { useCart } from '../components/context/cart';
import Layout from '../components/layout/Layout';

const Payment = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState( "" );
    const [instance, setInstance] = useState( "" );
    const [loading, setLoading] = useState( false );
    const navigate = useNavigate();
    const [radio, setRadio] = useState( [] );
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
        const totalAmount = _.sum( product?.map( d => Number( d?.price ) ) );
        return {
            totalAmount
        };
    };
    const { totalAmount } = getTotalAmount( cart );
    console.log( totalAmount + shippingPrice )
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
        <Layout title={'Checkout - Demo Technology'}>
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center bg-light p-2 mb-2 mt-2">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h3>
                        <h4 className="text-center mb-5">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : ""
                                }`
                                : ""}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <h4>Billing and Shipping</h4>
                        <div className='d-flex flex-column mt-3'>
                            <label htmlFor="" className='co-label'>Full Name</label>
                            <input type="text" className='co-input' placeholder='Enter Your Full Name' />
                        </div>
                        <div className='d-flex flex-column mt-3'>
                            <label htmlFor="" className='co-label'>Phone No</label>
                            <input type="text" className='co-input' placeholder='Enter Your Phone Number' />
                        </div>

                        <div className='d-flex flex-column mt-3'>
                            <label htmlFor="" className='co-label' >Address</label>
                            <input type="text" className='co-input' placeholder='Enter Your Full Address' />
                        </div>
                        <div className='d-flex flex-column mt-3'>
                            <label htmlFor="" className='co-label'>Order Note</label>
                            <textarea className='co-textarea'></textarea>
                        </div>

                    </div>
                    <div className="col-md-4 border " style={{ padding: '30px' }}>
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
                            Place Order
                        </button>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Payment