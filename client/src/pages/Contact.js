import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import DividerWithText from '../components/DividerWithText';
import Layout from '../components/layout/Layout';
const Contact = () => {
    const [name, setName] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [phone, setPhone] = useState( '' );
    const [subject, setSubject] = useState( '' );
    const [message, setMessage] = useState( '' );
    const submitObj = {
        name,
        email,
        phone,
        subject,
        message
    }
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const apiEndpoint = `${process.env.REACT_APP_API}/api/v1/contact//send-message`
        try {
            const res = await axios.post( apiEndpoint, submitObj );
            if ( res.data.success ) {
                toast.success( res.data && res.data.message );
                setName( '' );
                setEmail( '' );
                setPhone( '' );
                setSubject( '' );
                setMessage( '' );
            } else {

            }
        } catch ( error ) {
            console.log( error );
            toast.error( "Something went wrong!" );
        }
    }
    return (
        <Layout title={'Contact us - Demo Technology'}>
            <div className='container'>
                <DividerWithText text="GET IN TOUCH WITH US" />
                <h4 className="mt-3 text-center ">ADDRESS</h4>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.832741928697!2d91.7100199759978!3d22.510457735243676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd1c0f734c361%3A0xc9efbe5cf8b618a9!2sMarcel%20Showroom(Jahanara%20Electronics)!5e0!3m2!1sen!2sbd!4v1730111851700!5m2!1sen!2sbd" width={650} height={350} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />


                    </div>
                    <div className="col-md-6">
                        <div className='address-div' >
                            <h3>Shop Address</h3>
                            <h5>Shope No 12, Demo Tower, 4th floor, Kumira, Sitakunda</h5>
                            <h5> Chattogram - 4314, Bangladesh</h5>
                            <h6> <BiMailSend /> : www.help@ecommerceapp.com</h6>
                            <h6 >
                                <BiPhoneCall /> : 012-3456789
                            </h6>
                            <h6 >
                                <BiSupport /> : 1800-0000-0000 (toll free)
                            </h6>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-6 mt-5' style={{ marginBottom: '100px' }}>
                        <DividerWithText text="Fill the form" />
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className="col-md-6  mt-4">
                                    <input
                                        type="text"
                                        className='contact-form'
                                        placeholder='Full Name'
                                        value={name}
                                        name='name'
                                        required
                                        onChange={( e ) => setName( e.target.value )}
                                    />
                                </div>
                                <div className="col-md-6  mt-4">
                                    <input
                                        type="email"
                                        className='contact-form'
                                        placeholder='Email'
                                        value={email}
                                        name='email'
                                        required
                                        onChange={( e ) => setEmail( e.target.value )}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-6  mt-4">
                                    <input
                                        type="text"
                                        className='contact-form'
                                        placeholder='Mobile No'
                                        value={phone}
                                        name='phone'
                                        required
                                        onChange={( e ) => setPhone( e.target.value )}
                                    />
                                </div>
                                <div className="col-md-6  mt-4">
                                    <input
                                        type="text"
                                        className='contact-form'
                                        placeholder='Subject'
                                        value={subject}
                                        name='subject'
                                        required
                                        onChange={( e ) => setSubject( e.target.value )}
                                    />
                                </div>
                            </div>
                            <div className='row '>
                                <div className="col-md-12 mt-5">
                                    <textarea
                                        type="text"
                                        className='contact-form'
                                        placeholder='Write your message here'
                                        value={message}
                                        name='message'
                                        required
                                        onChange={( e ) => setMessage( e.target.value )}
                                    />
                                </div>
                            </div>
                            <button className='contact-btn'>Send Message</button>
                        </form>
                    </div>
                    <div className="col-md-6" style={{ marginBottom: '100px' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className='message-div'>
                            <h3>Let's talk about everything.</h3>
                            <p>We would love to hear from you. For any queries, business collaborations, or for sending feedback, please fill out the form below and click the “Send Message” button.</p>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Contact