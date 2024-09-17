const mongoose = require('mongoose');

const connectionDB = () => {
    try{
        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ke0m0t.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() => console.log('Database connected!'));
    }
    catch(e) {
        console.log(e);
    }
  
}

module.exports = connectionDB