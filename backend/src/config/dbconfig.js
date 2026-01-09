const { default: mongoose } = require("mongoose");

const DBConnect = mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.taly7jm.mongodb.net/${process.env.DB_USERNAME}?appName=Cluster0`).then(()=>{
    console.log("Database connected Successfully")
}).catch((err)=>{
    console.log(err)
})


module.exports = DBConnect