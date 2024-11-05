
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const con = await mongoose.connect( process.env.MONGO_URL );
        console.log( `Database connected successfully ${con.connection.host}` )
    } catch ( error ) {
        console.log( 'Connectionn error: ' + error )
    }
}

export default connectDb;