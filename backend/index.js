// const express = require("express")
// const app = express()
// require('dotenv').config()
// const Port = process.env.Port

// app.get("/",(req, res)=>{
//     res.send("Home page")
// })

// app.listen(Port,()=>{
//    console.log(`server is running at ${Port}`)
// })

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Load routes
const authenticationRoutes = require('./routes/authenticationRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');

// Use routes
app.use('/api/auth', authenticationRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', passwordResetRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
