require('dotenv').config()
const express = require("express");
const app = express()

app.use(express.json())

app.use('/api/users', require('./routes/users'))
app.use('/api/posts', require('./routes/posts'))
app.get("/", (req, res) => res.json({msg: "Welcome"}));

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Express ready at http://localhost:${PORT}`);
})
