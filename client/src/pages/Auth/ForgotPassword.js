import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState( "" );
    const [newPassword, setNewPassword] = useState( "" );
    const [question, setQuestion] = useState( "" );
    const [showPassword, setShowPassword] = useState( false );

    const submitObj = {
        email,
        newPassword,
        question
    }
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const apiEndpoint = `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`
        try {
            const res = await axios.post( apiEndpoint, submitObj );
            if ( res && res.data.success ) {
                toast.success( res.data && res.data.message );

                navigate( "/login" );
            } else {
                toast.error( res.data.message );
            }
        } catch ( error ) {
            console.log( error );
            toast.error( "Something went wrong" );
        }
    }
    return (
        <Layout title={'Forgot Password - Ecommerce App'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h3 className='title'>Reset Your Password</h3>

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
                            value={question}
                            onChange={( e ) => setQuestion( e.target.value )}
                            className="form-control"
                            id="exampleInputQuestion"
                            required
                            placeholder='Enter Your Fabourite Sports'
                        />
                    </div>
                    <div className="mb-2 passInput">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={( e ) => setNewPassword( e.target.value )}
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
                                data-toggle="tooltip" data-placement="top" title="Hide Password"
                            /> : <IoMdEye
                                size={20}
                                className='mt-2 mr-1'
                                cursor={'pointer'}
                                onClick={() => setShowPassword( true )}
                                data-toggle="tooltip" data-placement="top" title="Show Password"
                            />
                        }

                    </div>

                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword