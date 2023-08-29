const express = require("express");
const userRoutes = require('./routes/users'); // import the routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const friendRoutes = require('./routes/friends')
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

app.use(express.json()); // parses incoming requests with JSON payloads

app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', friendRoutes);

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },).then((res) => {
        console.log("Database connected");
    }).catch(error => {
        console.log(error);
    });

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})
