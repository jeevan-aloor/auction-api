const mongoose=require('mongoose')

const RegSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})


const RegModel=mongoose.model("auctionUserReg",RegSchema)

module.exports={
    RegModel
}