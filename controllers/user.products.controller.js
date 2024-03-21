const User = require('../models/user.model')

exports.findAll = async(request, response) => {
    console.log("Find all user's products")

    try {
        const result = await User.find({},{_id:0,username:1, products: 1}) //tha mas ferei mono ta username kai ta products
                                    // to prwto {} einai keno giati den exoume kritiria anazhthshs kai tha mas ta ferei ola
        response.status(200).json({data: result})
        console.log("Reading all user products")
    } catch(error){
        response.status(400).json({data: error})
        console.log("Problem in reading user products")
    }
}

exports.findOne = async( request,response) => {
    const username = request.params.username

    console.log("Find products for user: " , username)

    try {
        const result = await User.findOne({username: username}, {_id:0, username: 1, products: 1} )
        response.status(200).json({data: result})
        console.log("Success in finding products ", username)
    } catch (error) {
        response.status(400).json({data: error})
        console.log("Problem in finding products")
    }
}

exports.create = async(request, response) => {
    console.log("Insert a product")

    const username = request.body.username
    const products = request.body.products

    console.log("Inserting products for user ", username)

    try {
        const result = await User.updateOne(
            {username : username}, 
            {
                $push:{  // me to puse prosthetoume stoixeia se ena array
                    products: products
                }
            })
            response.status(200).json({data: result})
            console.log("xxxx")
    } catch (error) {
        response.status(400).json({data: error})
        console.log("Failed to insert")
    }

    
}

exports.update = async(request, response) => {
    const username = request.params.username
    
    const _id = request.body.product._id
    const quantity = request.body.product.quantity

    console.log("Update product for username: " , username)

    try {
        const result = await User.updateOne(
            {username: username, 'products._id': _id},
            {
                $set: {   //to set kanei update
                    'products.$.quantity': quantity                
                } 
            }            
        )
        response.status(200).json({data: result})
        console.log("Update was successful")
    } catch (error) {
        response.status(400).json({data: error})
        console.log("Update failed")
    }
}

exports.delete = async(request, response) => {
    const username = request.params.username
    const _id = request.params.id

    console.log('Delete product')

    try {
        const result = await User.delete(
            {username: username},
            {
                $pull: {  //pull gia na svhsoume apo to array kai push gia na eisagoume
                    products: {_id: _id}        
                }
            }
        )  // kanoume update epeidh theloume na diagrapsoume mono ena subdocument
        request.status(200).json()         
    } catch (error) {

    }
}
