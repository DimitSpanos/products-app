const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')


let addressSchema = new Schema({
    area:{type: String},
    road:{type: String}
}, {_id:false})  //we se id:false because we don't want a new id when we add area and road

let phoneSchema = new Schema({
    type: {type:String},
    number:{type:String}
}, {_id:false})

let productSchema = new Schema({
    product: {type:String},
    cost: {type:Number},
    quantity: {type:Number},
    dsate: {type: Date, default: Date.now}
})

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required field'],
        maxLength: 20, //you can make it an array as above and pass a message for the length
        unique: true,
        trim: true,
        lowercase:true //an dwsei kefalaia na ginoun mikra
    },
    password: {
        type: String,
        required: [true, 'Password is required field'],
        maxLength: 20, //you can make it an array as above and pass a message for the length
        minLength: 6,
        lowercase:true //an dwsei kefalaia na ginoun mikra
    },
    name: { type: String},
    surname: {type: String},
    email: {
        type: String,
        required: [true, 'Email is required field'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ,'Email is a required field']   
    },
    address: addressSchema,
    phone: {type: [phoneSchema], null:true} , //we allow the user to leave the phone blank
    products: {type: [productSchema], null:true}
       
}, {
    collection: 'users',
    timestamps: true  //date and time we inserted or updated a user
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('user', userSchema)

//if one field is unique and you try to add the same value you get a message that it already exist
//for validation we installed the mongoose unique validator