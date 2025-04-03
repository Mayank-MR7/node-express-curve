const express = require('express');
const userRouter = ('./routes/routes');
const {connectMongoDB} = require ('./connection')
const {logReqRes} = require("./middleware/log")

const app = express();
const PORT = 3000;

connectMongoDB('mongodb://127.0.0.1:27017')

app.use('/users', userRouter);

app.use(logReqRes('log.txt'));

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
    
})