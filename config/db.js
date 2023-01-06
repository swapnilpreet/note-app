const mongoose=require("mongoose");

const connection = mongoose.connect("mongodb+srv://swapnilramteke:swapnil121@cluster0.iqsh2wu.mongodb.net/?retryWrites=true&w=majority")

module.exports = connection;