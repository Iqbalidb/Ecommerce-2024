import React from 'react'
import { useAuth } from '../../components/context/auth'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div >
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center mt-4'>Welcome to Admin Dashboard</h1>
                        <div className='main-dashboard'>
                            <div className="card" style={{ width: '500px' }}>
                                <div className="card-body">
                                    <h3 className="card-title">{`Admin Name : ${auth?.user?.name}`}</h3>
                                    <h5 className="card-title">{`Admin Email : ${auth?.user?.email}`}</h5>
                                    <h5 className="card-title">{`Admin Phone : ${auth?.user?.phone}`}</h5>
                                    <h5 className="card-title">{`Admin Address : ${auth?.user?.address}`}</h5>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard