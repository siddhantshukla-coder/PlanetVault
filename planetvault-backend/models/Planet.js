const mongoose= require("mongoose");
const planetSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mass: {
        type: Number,
        required: true
    }
})
const Planet= mongoose.model("Planet", planetSchema);
module.exports=Planet;