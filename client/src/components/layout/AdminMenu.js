import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className="userMenu">
                <div className="list-group">
                    <Link to="/dashboard/admin" className="list-group-item list-group-item-action">
                        <h4 className='text-center adminHeader'>Admin Dashboard</h4>
                    </Link>

                    {/* <br /> */}
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Manage Categories</NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                    {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink> */}
                    <NavLink
                        to="/dashboard/admin/orders"
                        className="list-group-item list-group-item-action"
                    >
                        Manage User Orders
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/contact-messages"
                        className="list-group-item list-group-item-action"
                    >
                        Contact Messages
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu