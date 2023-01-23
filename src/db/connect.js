const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Mohith:Mohithreddy17@cluster0.5sy0f.mongodb.net/fossilsignup", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() =>{
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
});