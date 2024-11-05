import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';

const ContactMessage = () => {
    const [messages, setMessages] = useState( [] );
    const getAllMessages = async () => {
        try {
            const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/contact/all-messages` );
            if ( data.success ) {
                setMessages( data.messages );
            }
        } catch ( error ) {
            console.log( error );
            toast.error( "Something went wrong in getting messages" );
        }
    };
    console.log( { messages } );

    useEffect( () => {
        getAllMessages();
    }, [] );
    return (
        <Layout title={'Dashboard - Contact Messages'}>
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className="title text-center mb-4 border p-2 header" >Messages</h2>
                        <div className="border shadow w-90">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">email</th>
                                        <th scope="col">Phone No</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Message</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {messages?.map( ( c, i ) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{i + 1}</td>
                                                <td key={c._id}>{c.name}</td>
                                                <td key={c._id}>{c.email}</td>
                                                <td key={c._id}>{c.phone}</td>
                                                <td key={c._id}>{c.subject}</td>
                                                <td key={c._id}>{c.message}</td>

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

export default ContactMessage