const { request } = require('express')
const User = require('../models/user.model')

exports.findAll = async(request, response) => {
    console.log('Find all users')

    try {
    const result = await User.find()   // kanoume find opws kai sto studio 3t gia na vroume auto pou theloume
    response.status(200).json({data:result})
    }catch (err) {
        console.log(`Problem in reading users ${err}`)
        response.status(500).json({ message: 'An error occurred while fetching the users', error: err.message });
    }
}
exports.findOne = async(request,response) => {
    console.log("find a user")
    const username = request.params.username

    try {
        const result = await User.findOne({username: username})
        response.status(200).json({data: result})
    } catch(err) {

        console.log(`Problem in reading user ${err}`)
    }
}

exports.create = async(request, response) => {
    console.log("Insert User")

    console.log(request.body)  //etsi fernei auto pou exoun mpei sth forma gia post

    const newUser = new User({   //edw to new user einai san mia morfh DTO
        username: request.body.username,
        password: request.body.password,
        name: request.body.name,
        surname: request.body.surname,
        email: request.body.email,
        address: request.body.address,
        phone: request.body.phone,
        products: request.body.products
    })

    try {
        const result = await newUser.save()
        response.status(200).json({data: result})
        console.log("User saved")
    } catch (error) {
        response.status(400).json({data:error})
        console.log("Problem in saving user")
    }

    
}

exports.update = async(request, response) => {
    const username = req.params.username

    console.log("Update user with username: ", username)

    const updateUser = {
        name: request.body.name,
        surname: request.body.surname,
        email: request.body.email,
        address: request.body.address,
        phone: request.body.phone
    }

    try { 
        const result = await User.findOneAndUpdate(
            {username: username},  //edw kanei to find sth vash
            updateUser, //dinoume tis allages pou prepe ina ginoun`
            {new: true}  // to vazoume gia na dhmiourghsei to user se periptwsh pou den parxei hdh sth vash
        )
        response.status(200).json({data:result})
        console.log("Success in updating user" , username)
    } catch (error) {
        response.status(400).json({data: error})
        console.log("Problem in updating user")
    }
}

exports.delete = async(request, response) => {  

    const username = req.params.username

    console.log("Delete user: " , username)

    try {
        const result = await User.findOneAndDelete({username: username}) // to filtro anazhthshs
        response.status(200).json({data: result})
        console.log("Success in deleting user: " , username)  //an theloume na kanoume elegxo an uparxei kanoume mia if prin to response.status
    } catch (error) {
        response.json({data: error})
        console.log("Problem in deleting user")
    }
}