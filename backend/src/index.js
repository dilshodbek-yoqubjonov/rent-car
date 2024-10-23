const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("./routes");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(PORT);
});
