const mongoose = require("mongoose");


const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
})

// A model
const Fruit =  mongoose.model("Fruit", fruitSchema)

module.exports = Fruit