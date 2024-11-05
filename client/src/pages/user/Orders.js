import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/context/auth';
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
const Orders = () => {
    const [orders, setOrders] = useState( [] );
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState( false );
    const getOrders = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/auth/orders` );
            setOrders( data );
        } catch ( error ) {
            console.log( error );
        }
    };

    useEffect( () => {
        if ( auth?.token ) getOrders();
    }, [auth?.token] );
    return (
        <Layout title={"Your Orders"}>
            <div className=" dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className="title text-center mb-4 border p-2 header" >All Orders</h2>

                        <div className="border shadow">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map( ( o, i ) => (
                                        <>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                                <td>{moment( o?.createAt ).fromNow()}</td>
                                                <td>{o?.status}</td>
                                            </tr>
                                        </>
                                    ) )}

                                </tbody>

                            </table>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders