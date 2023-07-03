const express=require("express")
const { AuctionRegModel } = require("../Model/AuctionRegister")
const redis = require('redis');
const cacheClient = redis.createClient();
const sharp = require('sharp');


cacheClient.on('error', (error) => {
    console.error('Redis connection error:', error);
  });


const AuctionRegisterRouter=express()

AuctionRegisterRouter.get("/getaucReg",async (req,res)=>{
    // res.send("regster auction")
    try {
        let data=await AuctionRegModel.find()
        res.send(data).status(200)
        console.log("data")
        
    } catch (error) {
        res.send("error")
        console.log(error)
        
    }
})
AuctionRegisterRouter.get("/getApproveduser",async (req,res)=>{
    // res.send("regster auction")
    let query1=req.query.productcategory
    let query2=req.query.searchproduct
     
    try {
        if(query1==undefined && query2==undefined ){
            console.log("hdhdk")
            let data=await AuctionRegModel.find({status:true}) .select('name email phoneno productcategory address country productname productimage   productinitialrate paymentmethode blockchainnetwork polygonnetwork blockchainaddress description  roomno status').limit(10).lean()
            res.send(data)
            console.log("approved user")
    //         let data = await AuctionRegModel.find({ status: true }).limit(10);

    // // Compress the images using `sharp`
    // data = await Promise.all(data.map(async (item) => {
    //   if (item.productimage) {
    //     const compressedImageBuffer = await sharp(item.productimage)
    //       .jpeg({ quality: 80, progressive: true })
    //       .toBuffer();

    //     item.productimage = compressedImageBuffer.toString('base64');
    //   }
    //   return item;
    // }));

    // res.send(data);
    // console.log('approved user');

        }else if(query1!==undefined && query2===undefined){
            console.log("qqqq",query1,query2)
            let data=await AuctionRegModel.find({status:true ,productcategory:query1})
            res.send(data)

        }else if(query2!==undefined && query1===undefined){
            console.log("tr",query1,query2)
            let data=await AuctionRegModel.find({status:true,productname:query2})
            res.send(data)

        }else if(query1 && query2) {
            console.log("trururr")
            let data=await AuctionRegModel.find({status:true,productcategory:query1,productname:query2})
            res.send(data)

        }
        // AuctionRegModel.collection.createIndex({ status: 1 });
        // AuctionRegModel.collection.createIndex({ productcategory: 1 });
        // AuctionRegModel.collection.createIndex({ productname: 1 });
        
    } catch (error) {
        res.send("error")
        console.log(error)
        
    }
})


// AuctionRegisterRouter.get("/getApproveduser", async (req, res) => {
//     let query1 = req.query.productcategory;
//     let query2 = req.query.searchproduct;
  
//     try {
//       if (query1 == undefined && query2 == undefined) {
//         let data = await AuctionRegModel.find({ status: true }).limit(10).lean();
//         const processedData = await compressImages(data);
//         res.send(processedData);
//         console.log("approved user");
//       } else if (query1 !== undefined) {
//         let data = await AuctionRegModel.find({ status: true, productcategory: query1 }).lean();
//         const processedData = await compressImages(data);
//         res.send(processedData);
//       } else if (query2 !== undefined) {
//         let data = await AuctionRegModel.find({ status: true, productname: query2 }).lean();
//         const processedData = await compressImages(data);
//         res.send(processedData);
//       } else {
//         let data = await AuctionRegModel.find({ status: true, productcategory: query1, productname: query2 }).lean();
//         const processedData = await compressImages(data);
//         res.send(processedData);
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ error: "Internal Server Error" });
//     }
//   });
  
//   async function compressImages(data) {
//     return await Promise.all(data.map(async (item) => {
//       if (item.productimage) {
//         const compressedImageBuffer = await sharp(item.productimage)
//           .jpeg({ quality: 80, progressive: true })
//           .toBuffer();
  
//         item.productimage = compressedImageBuffer.toString('base64');
//       }
//       return item;
//     }));
//   }

// AuctionRegisterRouter.get("/getApprovedUser", async (req, res) => {
//     try {
//       const query1 = req.query.productcategory;
//       const query2 = req.query.searchproduct;
//       let query = { status: true };
  
//       if (query1 !== undefined) {
//         query.productcategory = query1;
//       }
  
//       if (query2 !== undefined) {
//         query.productname = query2;
//       }
  
//     //   const data = await AuctionRegModel.find(query).limit(10);
//     //   res.send("data");
//       const cacheKey = JSON.stringify(query);
//       const cachedData = await cacheClient.get(cacheKey);
//       if (cachedData) {
//         return res.send(cachedData);
//       }
  
//       // Execute the query
//       const data = await AuctionRegModel.find(query).select('productcategory searchproduct');
//       res.send(data);
  
//       // Store the data in cache
//       cacheClient.set(cacheKey, data);
//     } catch (error) {
//       res.status(500).send("Error retrieving approved users.");
//       console.error(error);
//     }
//   });

AuctionRegisterRouter.get("/getPendinguser",async (req,res)=>{
    // res.send("regster auction")
    try {
        console.log("pppp")
        let data=await AuctionRegModel.find({status:false}).select('name email phoneno productcategory productname address country  productinitialrate productimage paymentmethode blockchainnetwork polygonnetwork blockchainaddress description  roomno status').limit(10).lean()
        res.send(data)
        console.log("pending data")
        
    } catch (error) {
        res.send("error")
        console.log(error)
        
    }
})

AuctionRegisterRouter.post("/auctionuserregister",async (req,res)=>{
    

    try {

        const data=new  AuctionRegModel(req.body)
        await data.save()
        res.send("added auction register").status(200)
        // console.log(data)
        
        
    } catch (error) {
        res.send("error not added auction register")
        console.log(error)
        
    }
})

// AuctionRegisterRouter.get("/")


// AuctionRegisterRouter.patch("/addroomnumber",async(req,res)=>{
//     const {roomid}=req.body
//     try {
//         let data=await AuctionRegModel({roomno:roomid})
//         res.send(data)
//         console.log("room id added")
        
//     } catch (error) {
//         res.send(error)
//         console.log(error)
        
//     }
// })


AuctionRegisterRouter.delete("/delete/:id", async (req, res) => {
    const ID=req.params.id
    try {
      await AuctionRegModel.findByIdAndDelete({ _id: ID });
      res.send("deleted successfully");
    } catch (error) {
    //   console.log(error);
      console.log("error", "deleting");
      console.log(error);
    }
  });


  AuctionRegisterRouter.patch("/approve/:id",async(req,res)=>{
    const ID=req.params.id
    const {adminStatus,roomid}=req.body
    const payload={
        status:adminStatus,
        roomno:roomid
    }
    try {
        // const data =await AuctionRegModel.find({email})
        // if(data.length>0){
            let presntUser=await AuctionRegModel.findOneAndUpdate({_id:ID},payload)
            
            res.status(200).send("user approved")
            // console.log(presntUser)

        // }else{
            res.send("not approved")
            console.log("not approved")
        // }

        
    } catch (error) {
        res.status(400).send("not updated password")
        console.log(error)
        
    }

})



module.exports={
    AuctionRegisterRouter
} 