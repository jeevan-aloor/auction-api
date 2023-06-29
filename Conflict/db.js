const mongoose=require('mongoose')

const connection=mongoose.connect("mongodb+srv://aloorjeevan:sing1234@cluster0.ft28v1o.mongodb.net/malak-auction?retryWrites=true&w=majority")

module.exports={
    connection
}

// mongodb+srv://jayaraj:jayraj123@cluster0.xslbn1w.mongodb.net/?retryWrites=true&w=majority