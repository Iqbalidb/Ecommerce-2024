import React from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

const AllUsers = () => {
    return (
        <Layout title={'Dashboard - All Users'}>
            <div className=''>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>All Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AllUsers