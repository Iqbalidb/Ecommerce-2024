import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authROutes from './routes/authRouter.js';
import categoryRoute from './routes/categoryRoute.js';
import contactRoute from './routes/contactMeassageRoute.js';
import productRoute from './routes/productRoute.js';

dotenv.config();
connectDb();
const app = express();

app.use( cors() );
app.use( express.json() );
app.use( morgan( 'dev' ) );

//routes

app.use( '/api/v1/auth', authROutes )
app.use( '/api/v1/category', categoryRoute )
app.use( '/api/v1/product', productRoute )
app.use( '/api/v1/contact', contactRoute )
app.get( '/', ( req, res ) => {
    res.send( {
        message: 'Welcome to the Ecommerce app'
    } )
} )

const PORT = process.env.PORT || 8081;

app.listen( PORT, () => {
    console.log( `Server is running on port ${PORT}` );
} )