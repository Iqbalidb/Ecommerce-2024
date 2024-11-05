import contactModel from "../models/contactModel.js";

export const contactFormController = async ( req, res ) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        if ( !name ) {
            return res.send( { message: 'Name is Required' } )
        }
        if ( !email ) {
            return res.send( { message: 'Email is Required' } )
        }

        if ( !phone ) {
            return res.send( { message: 'Phone is Required' } )
        }
        if ( !subject ) {
            return res.send( { message: 'subject is Required' } )
        }
        if ( !message ) {
            return res.send( { message: 'message is Required' } )
        }

        //save
        const contact = await new contactModel( {
            name,
            email,
            phone,
            subject,
            message
        } ).save()
        res.status( 200 ).send( {
            success: true,
            message: 'Message send successfully',
            contact
        } )
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            message: 'Error in sending message!!'
        } )
    }
};

export const contactController = async ( req, res ) => {
    try {
        const messages = await contactModel.find( {} )
        res.status( 200 ).send( {
            success: true,
            message: "Messages fetched successfully",
            messages,
        } );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( {
            success: false,
            error,
            message: "Error in Fetching Messages",
        } );
    }
}