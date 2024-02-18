// INSTALLED
// npm init -y
// npm install express
// npm install -g nodemon (another way)
// npm install dotenv
// npm install mongodb
// npm install mongoose
// npm install cors
// npm install mongoose-sequence


// IMPORTS
require('dotenv').config()
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose')

const detailRoutes = require('./routes/DetailsRoutes')
const movieRoutes = require('./routes/MovieRoutes')

// APP
const app = express();

// Enable CORS for all routes
app.use(cors());

// MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// ROUTES
app.use('/api/movies', movieRoutes);
app.use('/api/airing', movieRoutes);
app.use('/api/details', detailRoutes);

// CONNECT TO DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // LISTEN TO REQUEST
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error)
    })

