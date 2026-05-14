
const express = require("express")
const app = express();
const dotenv = require('dotenv');
const path = require('path');
// installing cors for fetch requests from frontend to backend
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
const products = require('./routes/products');
const orders = require('./routes/order');
const { skipMiddlewareFunction } = require("mongoose");
connectDatabase();



app.use(express.json());
// cors is a middleware function that allows cross-origin requests from the frontend to the backend. It is used to enable communication between the frontend and backend when they are hosted on different domains or ports. By using cors(), we can specify which origins are allowed to access the backend API, and it will handle the necessary headers and responses to enable cross-origin requests.
app.use(cors());
app.get("/",(req,res) => {
    res.send("Server is running");
    
})

app.use('/api/v1/products',products);
app.use('/api/v1/orders',orders);


app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV} `)
});