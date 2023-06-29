const mongoose=require('mongoose')

const AuctionRegSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:String,
    phoneno:Number,
    productcategory:String,
    producttype:String,
    productname:String,
    address:String,
    country:String,
    productimage:String,
    productinitialrate:Number,
    paymentmethode:String,
    blockchainnetwork:String,
    blockchainaddress:String,
    polygonnetwork:String,
    description:String,
    status:Boolean,
    roomno:Number
})


const AuctionRegModel=mongoose.model("RegisterforAuction",AuctionRegSchema)

module.exports={
    AuctionRegModel
}