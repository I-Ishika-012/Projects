const mongoose = require('mongoose');

const dbConnect = async () => {
    console.log(process.env);
    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI, {
        //     useUnifiedTopology: true,
        //     useNewUrlParser: true
        // });
        // console.log(`MongoDB connected: ${conn.connection.host}`);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected');
    } catch (error) {   
        console.log('DB Connection Error:',error.message);
    }
};

dbConnect();
//module.exports = dbConnect;