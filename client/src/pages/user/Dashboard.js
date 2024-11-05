import React from 'react';
import { useAuth } from '../../components/context/auth';
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={'Dashboard - Ecommerce App'}>
            <div>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center mt-4'>{`Welcome ${auth?.user?.name} to Your Dashboard`}</h1>
                        <div className='main-dashboard'>
                            <div className="card" style={{ width: '500px' }}>
                                <div className="card-body">
                                    <h3 className="card-title">{`User Name : ${auth?.user?.name}`}</h3>
                                    <h5 className="card-title">{`User Email : ${auth?.user?.email}`}</h5>
                                    <h5 className="card-title">{`User Phone : ${auth?.user?.phone}`}</h5>
                                    <h5 className="card-title">{`User Address : ${auth?.user?.address}`}</h5>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard