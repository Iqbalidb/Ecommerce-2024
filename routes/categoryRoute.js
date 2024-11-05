import express from "express";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//Create
router.post( '/create-category', requiredSignIn, isAdmin, createCategoryController )
//Update
router.put( '/update-category/:id', requiredSignIn, isAdmin, updateCategoryController )
//get categories
router.get( '/all-categories', categoryController )
//single category
router.get( '/single-category/:slug', singleCategoryController )
//delete category
router.delete( '/delete-category/:id', requiredSignIn, isAdmin, deleteCategoryController )

export default router;
