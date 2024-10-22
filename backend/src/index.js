const express = require("express")
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()


app.listen(8000,()=> {
    console.log(8000);
    
})