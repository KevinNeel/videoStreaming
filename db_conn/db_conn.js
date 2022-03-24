import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const initDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      // userNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongodb connected to db");
  });

  mongoose.connection.on("error", err => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongodb disconnected");
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log("Mongoose connection is disconnected due to app termination");
      process.exit(0);
    });
  });

};

export default initDb;