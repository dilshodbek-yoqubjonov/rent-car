const express = require("express")
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(PORT)
})
