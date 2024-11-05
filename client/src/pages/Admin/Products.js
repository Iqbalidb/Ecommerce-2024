import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';

const Products = () => {
    const [products, setProducts] = useState( [] );

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/product/get-products` );
            setProducts( data.products );
        } catch ( error ) {
            console.log( error );
            toast.error( "Someething Went Wrong" );
        }
    };

    // lifecycle method
    useEffect( () => {
        getAllProducts();
    }, [] );
    const handleEdit = () => {

    }
    return (
        <Layout title={'Dashboard -Product List'}>
            <div className="">

                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <h2 className="title text-center mb-4 border p-2 header" >All Products</h2>
                        {/* <div className="d-flex flex-wrap">
                            {products?.map( ( p ) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/update-product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring( 0, 50 )}</p>
                                        </div>
                                    </div>
                                </Link>
                            ) )}
                        </div> */}
                        <div className="border shadow">
                            <table className="table" style={{ marginRight: '20px' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Shipping</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map( ( p, i ) => (
                                        <>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{p.name}</td>
                                                <td>{p?.category.name}</td>
                                                <td>{p.price}</td>
                                                <td>{p.shipping ? "Yes" : "No"}</td>
                                                <td>{p.quantity}</td>
                                                <td>
                                                    <img
                                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                        alt={p.name}
                                                        style={{ height: "50px", width: "50px" }}
                                                    />
                                                </td>
                                                <td>
                                                    <Link
                                                        key={p._id}
                                                        to={`/dashboard/admin/update-product/${p.slug}`}
                                                        className="product-link"
                                                    >
                                                        <FaEye
                                                            color='green'
                                                            size={20}
                                                            cursor={'pointer'}
                                                        />
                                                    </Link>

                                                </td>

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

export default Products