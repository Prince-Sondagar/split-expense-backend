import express from "express";
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: any, res: any) => {
    return res.send("Hello World");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
});