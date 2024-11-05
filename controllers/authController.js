import JWT from 'jsonwebtoken';
import { comparePasswords, hashPassword } from "../helpers/authHelper.js";
import orderModel from '../models/orderModel.js';
import userModel from "../models/userModel.js";

export const registerController = async ( req, res ) => {
    try {
        const { name, email, password, phone, address, question } = req.body;
        if ( !name ) {
            return res.send( { message: 'Name is Required' } )
        }
        if ( !email ) {
            return res.send( { message: 'Email is Required' } )
        }
        if ( !password ) {
            return res.send( { message: 'Password is Required' } )
        }
        if ( !phone ) {
            return res.send( { message: 'Phone is Required' } )
        }
        if ( !address ) {
            return res.send( { message: 'Address is Required' } )
        }
        if ( !question ) {
            return res.send( { message: 'Question is Required' } )
        }
        //check existing user
        const existingUser = await userModel.findOne( { email } );

        //existing user
        if ( existingUser ) {
            return res.status( 400 ).send( {
                success: false,
                message: 'User already exists'
            } )
        }
        ///register user

        const hashedPassword = await hashPassword( password );
        //save
        const user = await new userModel( {
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            question
        } ).save()
        res.status( 200 ).send( {
            success: true,
            message: 'User registered successfully',
            user
        } )
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: 'Error in Register!!'
        } )
    }
};

///login controller

export const loginController = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        if ( !email || !password ) {
            res.status( 404 ).send( {
                success: false,
                message: 'Email and Password are Required'
            } )
        }
        //check user

        const user = await userModel.findOne( { email } );
        if ( !user ) {
            return res.status( 404 ).send( {
                success: false,
                message: 'User not found'
            } )
        }
        //check password
        const matchPassword = await comparePasswords( password, user.password );
        if ( !matchPassword ) {
            return res.status( 401 ).send( {
                success: false,
                message: 'Invalid Password'
            } )
        }
        //token
        const token = await JWT.sign( { _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' } )
        res.status( 200 ).send( {
            success: true,
            message: 'User logged in successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        } )
    } catch ( error ) {
        console.log( error )
        res.status( 500 ).send( {
            success: false,
            message: 'Error in Login!!',
            error
        } )
    }
}

///test controller
export const testController = ( req, res ) => {
    res.send( 'Protected route' )
};

//forgot password controller
export const forgotPasswordController = async ( req, res ) => {
    try {
        const { email, question, newPassword } = req.body;
        if ( !email ) {
            return res.status( 400 ).send( { message: 'Email is required' } )
        }
        if ( !question ) {
            return res.status( 400 ).send( { message: 'Question is required' } )
        }
        if ( !newPassword ) {
            return res.status( 400 ).send( { message: 'Password is required' } )
        }
        const user = await userModel.findOne( { email, question } )
        if ( !user ) {
            return res.status( 404 ).send( { message: 'Wrong email or answer' } )
        }
        const hashed = await hashPassword( newPassword );
        await userModel.findByIdAndUpdate( user._id, { password: hashed } )
        res.status( 200 ).send( { success: true, message: 'Password changed successfully' } )
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: 'Something went wrong',
            error
        } )
    }
}

//update prfole
export const updateProfileController = async ( req, res ) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById( req.user._id );
        //password
        if ( password && password.length < 6 ) {
            return res.json( { error: "Password is required and 6 character long" } );
        }
        const hashedPassword = password ? await hashPassword( password ) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status( 200 ).send( {
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        } );
    } catch ( error ) {
        console.log( error );
        res.status( 400 ).send( {
            success: false,
            message: "Error WHile Update profile",
            error,
        } );
    }
};

//orders
export const getOrdersController = async ( req, res ) => {
    try {
        const orders = await orderModel
            .find( { buyer: req.user._id } )
            .populate( "products", "-photo" )
            .populate( "buyer", "name" );
        res.json( orders );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: "Error WHile Getting Orders",
            error,
        } );
    }
};
//orders
export const getAllOrdersController = async ( req, res ) => {
    try {
        const orders = await orderModel
            .find( {} )
            .populate( "products", "-photo" )
            .populate( "buyer", "name" )
        res.json( orders );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: "Error WHile Getting Orders",
            error,
        } );
    }
};

//order status
export const orderStatusController = async ( req, res ) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json( orders );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: "Error While Updating Order",
            error,
        } );
    }
};