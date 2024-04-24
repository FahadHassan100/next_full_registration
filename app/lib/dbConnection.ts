import mongoose from "mongoose";

export const connectToDb = async () => {


    const connection:any = {}

    try {

        if(connection.isConnected) return


        const db:any = await mongoose.connect("mongodb://127.0.0.1:27017/TestingPro1");
        connection.isConnected = db.connections[0].readyState

    } catch (error:any) {

        throw new Error(error);
        
    }

}