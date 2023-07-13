import "dotenv/config";
import express from "express";

import {authorRouter} from "./author/author.router";
import {bookRouter} from "./book/book.router";


if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(express.json());

app.use("/api/authors", authorRouter);
app.use("/api/books", bookRouter);
app.get("/", (req, res) => res.json({msg: "Welcome"}));

app.listen(PORT, () => {
    console.log(`Express ready at http://localhost:${PORT}`);
});
