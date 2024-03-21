const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')

app.use(express.json()) //to xreiazomaste gia na katalavei oti tha parei ena json to valame gia thn post

mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log('Connection to mongodb established')},
        (err) => {console.log('Failed to connect to mongodb' , err)}
    )

const user = require('./routes/user.route')
const userProduct = require('./routes/user.products.routes')


//ftiaxnoume mia endiamesh th user
//paei sto user.route na dei to eidous klhsh exoume

app.use("/api/users",user)
app.use("/api/user-products", userProduct)

app.use('/api-docs', 
    swaggerUi.serve,   //tha treksei kai tha diavasei oti exei mesa to swaggerDocument 
    swaggerUi.setup(swaggerDocument.options)
    )  

app.listen(port, () => {
    console.log("Server is up and running. SemperFi")
})