const mongoose = require('mongoose');
require('dotenv').config();

const connectOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, connectOptions);
        console.log('> MongoDb is online in '+ mongoose.connection.name +' <');
    } catch (error) {
        console.error( error );
    }
}

module.exports = dbConnect;