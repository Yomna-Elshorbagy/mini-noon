import mongoose from "mongoose";

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_STRING)
    .then(() =>
      console.log("Connected to DB successfully...", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
      })
    )
    .catch(() => console.log("Error connecting to DB!"));
};

export default connectToDb;
