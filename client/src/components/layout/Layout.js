import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';

const Layout = ( { children, title, description, keywords, author } ) => {
    const [isScrolled, setIsScrolled] = useState( false );

    const handleScroll = () => {
        const offset = window.scrollY;
        setIsScrolled( offset > 50 ); // Change this value based on your preference
    };

    useEffect( () => {
        window.addEventListener( 'scroll', handleScroll );
        return () => window.removeEventListener( 'scroll', handleScroll );
    }, [] );
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '80vh' }} >
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}
Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Techinfoyt",
};
export default Layout