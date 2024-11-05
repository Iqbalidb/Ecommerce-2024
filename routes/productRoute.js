
import express from "express";
import formidable from 'express-formidable';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, newProductListController, productCategoryController, productCountController, productFiltersController, productListController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes
//create product
router.post( '/create-product', requiredSignIn, isAdmin, formidable(), createProductController )
// update product
router.put( '/update-product/:pid', requiredSignIn, isAdmin, formidable(), updateProductController )
//get product
router.get( '/get-products', getProductController )
//get single product
router.get( '/get-product/:slug', getSingleProductController )
//get product photo
router.get( '/product-photo/:pid', getProductPhotoController )
//delete product
router.delete( '/delete-product/:pid', deleteProductController )
//filter product
router.post( "/product-filters", productFiltersController );
//product count
router.get( "/product-count", productCountController );
//product per page
router.get( "/product-list/:page", productListController );
router.get( "/new-product-list/:page", newProductListController );
//search product
router.get( "/search/:keyword", searchProductController );
//similar product
router.get( "/related-product/:pid/:cid", relatedProductController );
//category wise product
router.get( "/product-category/:slug", productCategoryController );
//payments routes
//token
router.get( "/braintree/token", braintreeTokenController );
//payments
router.post( "/braintree/payment", requiredSignIn, brainTreePaymentController );

export default router;
