import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/auth';
import Layout from '../../components/layout/Layout';
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState( "" );
    const [password, setPassword] = useState( "" );
    const [showPassword, setShowPassword] = useState( false );
    const [auth, setAuth] = useAuth();
    const submitObj = {
        email,
        password
    }
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const apiEndpoint = `${process.env.REACT_APP_API}/api/v1/auth/login`
        try {
            const res = await axios.post( apiEndpoint, submitObj );
            if ( res.data.success ) {
                toast.success( res.data && res.data.message );
                setAuth( {
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                } )
                localStorage.setItem( 'auth', JSON.stringify( res.data ) )
                navigate( location.state || '/' );
            } else {
                toast.error( res.data.message );

            }
        } catch ( error ) {
            console.log( error );
            toast.error( "Something went wrong!" );
        }
    }
    return (
        <Layout title={'Login - Demo Technology'}>
            <div className="form-container container">
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-between mb-2'>
                        <h2 className='title'>Login</h2>
                        <img src="/demo2.png" alt="logo" height={45} width={45} />
                    </div>

                    <div className="mb-3 passInput" >
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
                    <div className="mb-2 passInput">
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
                    <div className='mb-2 text-end'>
                        <Link className='text-right' to='/forgot-password'>Forgot Password</Link>
                    </div>

                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Sign In</button>
                    <div className='mt-2 text-center'>
                        <span >Didn't have account? <Link to='/register'>Sign Up</Link> </span>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Login