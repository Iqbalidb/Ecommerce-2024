import { Modal } from "antd";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryForm';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
const CreateCategory = () => {
    const [categories, setCategories] = useState( [] );
    const [name, setName] = useState( "" );
    const [visible, setVisible] = useState( false );
    const [newModal, setNewModal] = useState( false );
    const [selected, setSelected] = useState( null );
    const [updatedName, setUpdatedName] = useState( "" );
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/category/all-categories ` );
            if ( data.success ) {
                setCategories( data.messages );
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
    //handle Form
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        try {
            const { data } = await axios.post( `${process.env.REACT_APP_API}/api/v1/category/create-category`, {
                name,
            } );
            if ( data?.success ) {
                toast.success( `${name} is created` );
                setName( '' );
                getAllCategory();
                setNewModal( false );

            } else {
                toast.error( data.message );
            }
        } catch ( error ) {
            console.log( error );
            toast.error( "somthing went wrong in input form" );
        }
    };

    //get all cat


    //update category
    const handleUpdate = async ( e ) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if ( data.success ) {
                toast.success( `${updatedName} is updated` );
                setSelected( null );
                setUpdatedName( "" );
                setVisible( false );
                getAllCategory();
            } else {
                toast.error( data.message );
            }
        } catch ( error ) {
            toast.error( "Somtihing went wrong" );
        }
    };
    //delete category
    const handleDelete = async ( pId ) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
            );
            if ( data.success ) {
                toast.success( `Category is deleted` );

                getAllCategory();
            } else {
                toast.error( data.message );
            }
        } catch ( error ) {
            toast.error( "Something went wrong" );
        }
    };
    return (
        <Layout title={'Dashboard - Create Category'}>
            <div className="">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className="title text-center mb-4 border p-2 header" >Manage Categories</h2>
                        <div className="p-3 w-50">

                        </div>
                        <button
                            className="btn btn-success ms-2 mb-4"
                            onClick={() => {
                                setNewModal( true );
                            }}
                        >
                            Add New
                        </button>
                        <div className="border shadow w-50">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map( ( c, i ) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{i + 1}</td>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {
                                                            setVisible( true );
                                                            setUpdatedName( c.name );
                                                            setSelected( c );
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                        onClick={() => {
                                                            handleDelete( c._id );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ) )}

                                </tbody>

                            </table>

                        </div>
                        <Modal
                            onCancel={() => setVisible( false )}
                            footer={null}
                            centered
                            open={visible}
                        >
                            <h5 className="text-center">Updated Category</h5>
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                        <Modal
                            onCancel={() => setNewModal( false )}
                            footer={null}
                            centered
                            open={newModal}
                        >
                            <h5 className="text-center">New Category</h5>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </Modal>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default CreateCategory