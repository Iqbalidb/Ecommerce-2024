import { Select } from "antd";
import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/context/auth';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
const { Option } = Select;
const AdminOrders = () => {
    const [status, setStatus] = useState( [
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
    ] );
    const [changeStatus, setCHangeStatus] = useState( "" );
    const [orders, setOrders] = useState( [] );
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/auth/all-orders` );
            setOrders( data );
        } catch ( error ) {
            console.log( error );
        }
    };

    useEffect( () => {
        if ( auth?.token ) getOrders();
    }, [auth?.token] );

    const handleChange = async ( orderId, value ) => {
        try {
            const { data } = await axios.put( `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
                status: value,
            } );
            getOrders();
        } catch ( error ) {
            console.log( error );
        }
    };
    return (
        <Layout title={"All Orders"}>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h2 className="title text-center mb-4 border p-2 header" >Manage User Orders</h2>
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
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={( value ) => handleChange( o._id, value )}
                                                    defaultValue={o?.status}
                                                >
                                                    {status.map( ( s, i ) => (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    ) )}
                                                </Select>
                                            </td>                                        </tr>
                                    </>
                                ) )}

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders