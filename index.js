import express from "express";
import dotenv from "dotenv";
import connectToDb from "./db/connection.js";
import bootstrap from "./src/bootstrap.js";
dotenv.config();
const app = express();
const port = +process.env.PORT;

connectToDb();
bootstrap(app)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
