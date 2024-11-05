import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Col, Row } from "reactstrap";

const Footer = () => {
    return (
        <div className='footer bg-dark bg-gradient text-white py-4'>
            {/* <h4 className='text-center'>
                All Right Reserved &copy;  Deemo Technology
            </h4>
            <p className="text-center mt-3">
                <Link to='about'>About</Link> | <Link to='/contact'>Contact</Link>| <Link to='/policy'>Privacy Policy</Link>
            </p> */}
            <div className="container">
                <Row>
                    <Col lg='12' md='12' xl='4'>
                        <img src="/logo22.png" alt="Logo" style={{ height: '40px', marginBottom: '20px' }} />
                        <p>Shope No 12, Demo Tower, 4th floor, Kumira, Sitakunda <br /> Chattogram - 4314, Bangladesh</p>
                        <p><FaPhoneAlt /> +012-3456789</p>
                        <p>Email: <Link href="mailto:support@demo.com" className="text-white">support@demo.com</Link></p>
                    </Col>
                    <Col lg='12' md='12' xl='2'>
                        <h5 style={{ marginLeft: '10px' }}>ABOUT</h5>
                        <div>
                            <Link to={'/about'} className="list-group-item list-group-item-action footer-nav">About Us</Link>
                            <Link to={'/contact'} className="list-group-item list-group-item-action footer-nav">Contact</Link>
                            <Link to={'/policy'} className="list-group-item list-group-item-action footer-nav">Privacy Policy</Link>
                            <Link className="list-group-item list-group-item-action footer-nav">Why Shop With Us</Link>
                        </div>
                    </Col>
                    <Col lg='12' md='12' xl='2'>
                        <h5 style={{ marginLeft: '10px' }}>HELP</h5>
                        <Link to={'/'} className="list-group-item list-group-item-action footer-nav">Payment</Link>
                        <Link to={'/'} className="list-group-item list-group-item-action footer-nav">Shipping</Link>
                        <Link to={'/'} className="list-group-item list-group-item-action footer-nav">Return And Replacement</Link>
                    </Col>
                    <Col lg='12' md='12' xl='4'>
                        <h5>SOCIAL</h5>
                        <div className="d-flex gap-2">
                            <Link href="#" className="list-group-item list-group-item-action footer-nav"><FaFacebook size={24} /></Link>
                            <Link href="#" className="list-group-item list-group-item-action footer-nav"><FaTwitter size={24} /></Link>
                            <Link href="#" className="list-group-item list-group-item-action footer-nav"><FaLinkedin size={24} /></Link>
                            <Link href="#" className="list-group-item list-group-item-action footer-nav"><FaInstagram size={24} /></Link>
                            <Link href="#" className="list-group-item list-group-item-action footer-nav"><FaYoutube size={24} /></Link>
                        </div>
                    </Col>

                </Row>
                <hr className="border-light" />
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>&copy; 2024 demotech.com | All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer