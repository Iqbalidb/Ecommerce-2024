import { Select } from "antd";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState( [] );
    const [name, setName] = useState( "" );
    const [description, setDescription] = useState( "" );
    const [price, setPrice] = useState( "" );
    const [category, setCategory] = useState( "" );
    const [quantity, setQuantity] = useState( 0 );
    const [cartQuantity, setCartQuantity] = useState( 1 );
    const [shipping, setShipping] = useState( "" );
    const [photo, setPhoto] = useState( "" );
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/category/all-categories ` );
            if ( data.success ) {
                setCategories( data.categories );
            }
        } catch ( error ) {
            console.log( error );
            toast.error( "Something went wrong in getting category" );
        }
    };
    console.log( { categories } );

    useEffect( () => {
        getAllCategory();
    }, [] );

    const handleCreate = async ( e ) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append( "name", name );
            productData.append( "description", description );
            productData.append( "price", price );
            productData.append( "quantity", quantity );
            productData.append( "cartQuantity", cartQuantity );
            productData.append( "photo", photo );
            productData.append( "category", category );
            productData.append( "shipping", shipping );
            const { data } = axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/create-product`,
                productData
            );
            if ( data?.success ) {
                toast.error( data?.message );
            } else {
                toast.success( "Product Created Successfully" );
                navigate( "/dashboard/admin/products" );
            }
        } catch ( error ) {
            console.log( error );
            toast.error( "something went wrong" );
        }
    };
    return (
        <Layout title={'Dashboard - Create Product'}>
            <div className="">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className="title text-center mb-4 border p-2 header" >Create Product</h2>
                        <div className="m-1 w-75">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write a Product Name"
                                    className="form-control"
                                    onChange={( e ) => setName( e.target.value )}
                                />
                            </div>
                            <Select
                                bordered={false}
                                placeholder="Select a Category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={( value ) => {
                                    setCategory( value );
                                }}
                            >
                                {categories?.map( ( c ) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ) )}
                            </Select>

                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={( e ) => setDescription( e.target.value )}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={( e ) => setPrice( e.target.value )}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control text-right"
                                    onChange={( e ) => setQuantity( e.target.value )}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={( value ) => {
                                        setShipping( value );
                                    }}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={( e ) => setPhoto( e.target.files[0] )}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-left">
                                        <img
                                            src={URL.createObjectURL( photo )}
                                            alt="product_photo"
                                            height={"150px"}
                                            width={"150px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct