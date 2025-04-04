const express = require('express');
const app = express();
const {connectDb} = require('./config/db')
const PORT = 3000;

const urlRoute = require ('./routes/urlRoutes')

connectDb('mongodb://127.0.0.1:27017/shortURL')
app.use(express.json());

app.use('/url', urlRoute)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})