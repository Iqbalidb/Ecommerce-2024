import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="userMenu">
                <div className="list-group">
                    <Link to="/dashboard/user" className="list-group-item list-group-item-action">
                        <h4 className='text-center adminHeader'>User Dashboard</h4>
                    </Link>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">User Profile</NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu