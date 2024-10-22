const { PrismaClient } = require("@prisma/client");
const path = require("path");

const prisma = new PrismaClient();

// Barcha avtomobillarni olish
const getAllCars = async (req, res) => {
  try {
    const cars = await prisma.car.findMany();
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ma'lumotlarni olishda xato yuz berdi." });
  }
};

// Avtomobil yaratish
const createCar = async (req, res) => {
  // Fayl yuklanganini tekshirish
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }

  const image = req.files.image; // Faylni olish
  const { cost, name, system, mpg, transmission } = req.body; // Boshqa ma'lumotlar

  // Faylni yuklash
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileName = `${image.name}-${uniqueSuffix}${path.extname(image.name)}`;

  // Faylni saqlash
  image.mv(`./uploads/${fileName}`, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Fayl yuklashda xato yuz berdi." });
    }

    try {
      // Ma'lumotlar bazasiga saqlash
      const savedCar = await prisma.car.create({
        data: {
          cost: Number(cost), // Raqam sifatida saqlash
          name,
          system,
          mpg,
          transmission,
          img: fileName, // Fayl nomini bazaga yozish
        },
      });

      res.status(201).json(savedCar);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Ma'lumotlarni saqlashda xato yuz berdi." });
    }
  });
};

module.exports = {
  getAllCars,
  createCar,
};
