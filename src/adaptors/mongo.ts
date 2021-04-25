// Connect to MongoDB
import mongoose, { ConnectionOptions } from "mongoose";
import construct = Reflect.construct;
import App from "../components/app";

export default class Mongo{
    constructor(
        protected app:App
    ) {
        const mongoUrl = this.app.getEnv("MONGODB_URI");
        console.log("CONNECTING MONGOOOOOOOOO " , mongoUrl)
        if (!mongoUrl) {
            console.error("No mongo connection string. Set MONGODB_URI environment variable.");
            process.exit(1);
        }

        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            autoIndex: false, // Don't build indexes
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        };

        mongoose.set("useCreateIndex", true);
        mongoose.connect(mongoUrl, process.env.NODE_ENV === "production" ? options : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
            .then(() => {
                console.log("MongoDB Connection Successfully Established");
            })
            .catch((err: Error) => {
                console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
                // process.exit();
            });
    }
}
