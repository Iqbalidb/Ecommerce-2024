
import express from 'express';
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateProfileController } from '../controllers/authController.js';
import { isAdmin, requiredSignIn } from '../middlewares/authMiddleware.js';

///router obj
const router = express.Router();

//register router POST method
router.post( '/register', registerController )

//login router POST method
router.post( '/login', loginController )

//Forgot password
router.post( '/forgot-password', forgotPasswordController )

//test router GET
router.get( '/test', requiredSignIn, isAdmin, testController )

//protected routes
//User
router.get( "/user-auth", requiredSignIn, ( req, res ) => {
    res.status( 200 ).send( { ok: true } );
} );
//Admin
router.get( "/admin-auth", requiredSignIn, isAdmin, ( req, res ) => {
    res.status( 200 ).send( { ok: true } );
} );

//update profile
router.put( "/profile", requiredSignIn, updateProfileController );
//orders
router.get( "/orders", requiredSignIn, getOrdersController );

//all orders
router.get( "/all-orders", requiredSignIn, isAdmin, getAllOrdersController );

// order status update
router.put(
    "/order-status/:orderId",
    requiredSignIn,
    isAdmin,
    orderStatusController
);

export default router;