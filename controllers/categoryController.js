import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async ( req, res ) => {
    try {
        const { name } = req.body;
        if ( !name ) {
            return res.status( 400 ).send( { message: "Name is required" } );
        }
        const existingCategory = await categoryModel.findOne( { name } );
        if ( existingCategory ) {
            return res.status( 400 ).send( {
                success: false,
                message: "Category Already Exists",
            } );
        }
        const category = await new categoryModel( {
            name,
            slug: slugify( name ),
        } ).save();
        res.status( 200 ).send( {
            success: true,
            message: "new category created",
            category,
        } );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            error,
            message: "Error in Category",
        } );
    }
};

export const updateCategoryController = async ( req, res ) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate( id, { name, slug: slugify( name ) }, { new: true } )
        res.status( 200 ).send( {
            success: true,
            message: "Category updated successfully",
            category,
        } )
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            error,
            message: "Error in Updating Category",
        } );
    }
}

export const categoryController = async ( req, res ) => {
    try {
        const categories = await categoryModel.find( {} )
        res.status( 200 ).send( {
            success: true,
            message: "Categories fetched successfully",
            categories,
        } );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            error,
            message: "Error in Fetching Categories",
        } );
    }
}

export const singleCategoryController = async ( req, res ) => {
    try {
        const category = await categoryModel.findOne( { slug: req.params.slug } )
        res.status( 200 ).send( {
            success: true,
            message: "Single Category fetched successfully",
            category,
        } )
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            error,
            message: "Error in Fetching Single Category",
        } )
    }
}

export const deleteCategoryController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete( id );
        res.status( 200 ).send( {
            success: true,
            message: "Category deleted successfully",
            category
        } )
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            error,
            message: "Error in Deleting Category",
        } )
    }
}