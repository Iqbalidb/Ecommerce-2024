import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState( "" );
    const [email, setEmail] = useState( "" );
    const [phone, setPhone] = useState( "" );
    const [address, setAddress] = useState( "" );
    const [password, setPassword] = useState( "" );
    const [question, setQuestion] = useState( "" );
    const [showPassword, setShowPassword] = useState( false );

    const submitObj = {
        name,
        email,
        phone,
        address,
        password,
        question
    }
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const apiEndpoint = `${process.env.REACT_APP_API}/api/v1/auth/register`
        try {
            const res = await axios.post( apiEndpoint, submitObj );
            if ( res.data.success ) {
                toast.success( res.data && res.data.message );
                navigate( '/login' )
            } else {

            }
        } catch ( error ) {
            console.log( error );
            toast.error( "Something went wrong!" );
        }
    }
    return (
        <Layout title={'Register - Demo Technology'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-between mb-2'>
                        <h2 className='title'>Register</h2>
                        <img src="/demo2.png" alt="logo" height={45} width={45} />
                    </div>
                    <div className="mb-3 passInput">
                        <input
                            type="text"
                            value={name}
                            onChange={( e ) => setName( e.target.value )}
                            className="form-control"
                            id="exampleInputName"
                            required
                            placeholder='Enter your Name'
                        />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3 passInput">
                        <input
                            type="email"
                            value={email}
                            onChange={( e ) => setEmail( e.target.value )}
                            className="form-control"
                            id="exampleInputEmail1"
                            required
                            placeholder='Enter your Email'
                        />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3 passInput">
                        <input
                            type="text"
                            value={phone}
                            onChange={( e ) => setPhone( e.target.value )}
                            className="form-control"
                            id="exampleInputPhone"
                            required
                            placeholder='Enter your Phone'
                        />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3 passInput">
                        <input
                            type="text"
                            value={address}
                            onChange={( e ) => setAddress( e.target.value )}
                            className="form-control"
                            id="exampleInputAddress"
                            required
                            placeholder='Enter your Address'
                        />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>

                    <div className="mb-3 passInput">
                        <input
                            type="question"
                            value={question}
                            onChange={( e ) => setQuestion( e.target.value )}
                            className="form-control"
                            id="exampleInputQuestion"
                            required
                            placeholder='Enter Your Fabourite Sports'
                        />
                    </div>
                    <div className="mb-3 passInput">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={( e ) => setPassword( e.target.value )}
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                            placeholder='Enter your Password'
                        />
                        {
                            showPassword ? <IoMdEyeOff
                                size={20}
                                className='mt-2 mr-1'
                                cursor={'pointer'}
                                onClick={() => setShowPassword( false )}
                            /> : <IoMdEye
                                size={20}
                                className='mt-2 mr-1'
                                cursor={'pointer'}
                                onClick={() => setShowPassword( true )}
                            />
                        }


                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <div className='mt-2 text-center'>
                        <span >Already registered? <Link to='/login'>Sign In</Link> </span>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Register