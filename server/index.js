const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const apiRouter = require('./routes/apiRouter');
const cors = require('cors')

dotenv.config();

const PORT = process.env.PORT || 5500;
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to Mongodb!')
    } catch (error) {
      console.log(error)
    }
}
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter)


app.listen(PORT, () => {
    connect();
    console.log(`Server has been started on PORT ${PORT}`)
})