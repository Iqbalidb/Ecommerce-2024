import { Badge } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';
import { BsCart4 } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import SearchInput from '../Form/SearchInput';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const [cart, setCart] = useCart();

    console.log( { categories } )
    const handleLogout = () => {
        const updatedAuth = {
            ...auth,
            user: null,
            token: ''
        }
        setAuth( updatedAuth );
        // setCart( [] );
        localStorage.removeItem( 'auth' );
        // localStorage.removeItem( 'cart' );
        toast.success( 'Logged out successfully' );
    }
    return (
        <>
            <div className='container'>
                <div className='row topheader'>
                    <div className='col-md-4 '>
                        <NavLink to="/" >
                            <img src="/ecomLogo2.png" alt="Logo" style={{ height: '40px' }} />
                        </NavLink>
                    </div>
                    <div className='col-md-4 '>
                        <h5 className="">
                            <SearchInput />
                        </h5>

                    </div>
                    <div className='col-md-4 cart'>
                        <Badge className="mt-2" count={cart?.length} showZero style={{ textAlign: 'right' }}>
                            <NavLink to="/cart" >

                                <BsCart4
                                    size={30}
                                    color='rgb(112, 4, 131)'
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Your Cart"
                                />

                            </NavLink>
                        </Badge>


                    </div>
                </div>
            </div>
            <nav class="navbar navbar-expand-lg sticky-top" style={{ margin: 0 }}>
                <div class="container">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link" aria-current="page" >About</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">

                                    {categories?.map( ( c ) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ) )}
                                </ul>
                            </li>
                            <li>
                                <li className="nav-item">
                                    <NavLink to="/products" className="nav-link" aria-current="page" >Products</NavLink>
                                </li>
                            </li>
                        </ul>

                        <ul class="navbar-nav ml-5">
                            {
                                !auth?.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link " >Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link " aria-disabled="true">Log In</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" href="#">Dashboard</NavLink></li>
                                                <li className="nav-item">
                                                    <NavLink onClick={handleLogout} to="/login" className="dropdown-item " aria-disabled="true">Logout</NavLink>
                                                </li>
                                            </ul>
                                        </li>


                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header