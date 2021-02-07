require('dotenv').config();
const mongoose = require('mongoose');

// Environment variable
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

module.exports = mongoose;