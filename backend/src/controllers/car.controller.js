const { PrismaClient } = require("@prisma/client");
const { log } = require("console");
const path = require("path");

const prisma = new PrismaClient();

// Barcha avtomobillarni olish
const getAllCars = async (req, res) => {
  try {
    const cars = await prisma.car_info.findMany();
    res.json(cars);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ma'lumotlarni olishda xato yuz berdi.", success: false });
  }
};

// Avtomobil yaratish
const createCar = async (req, res) => {
  // Fayl yuklanganini tekshirish
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ error: "No files were uploaded.", success: false });
  }

  let images = req.files.images; // Fayllarni olish

  // Agar faqat bitta fayl bo'lsa, uni arrayga aylantirish
  if (!Array.isArray(images)) {
    images = [images];
  }

  log(images); // Rasmlarni log qilish

  const {
    cost,
    city_mpg,
    class_type,
    combination_mpg,
    drive,
    fuel_type,
    highway_mpg,
    make,
    name,
    system,
    model,
    transmission,
  } = req.body;

  const nameImages = [];

  // Har bir rasmni saqlash jarayoni
  for (let image of images) {
    const uniqueSuffix = Date.now();
    const fileName = `${image.name}-${uniqueSuffix}${path.extname(image.name)}`;
    nameImages.push(fileName);

    // Faylni saqlash
    image.mv(`./uploads/${fileName}`, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Fayl yuklashda xato yuz berdi.", success: false });
      }
    });
  }

  try {
    // Ma'lumotlar bazasiga saqlash
    let savedCar = await prisma.car_info.create({
      data: {
        cost: Number(cost),
        city_mpg: Number(city_mpg),
        class_type,
        combination_mpg: Number(combination_mpg),
        drive,
        fuel_type,
        highway_mpg: Number(highway_mpg),
        make,
        name,
        system,
        model,
        transmission,
        image: nameImages.join(","), // Fayl nomlarini vergul bilan ajratilgan ko'rinishda bazaga yozish
      },
    });

    res.status(201).json(savedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ma'lumotlarni saqlashda xato yuz berdi.",
      success: false,
    });
  }
};
module.exports = {
  getAllCars,
  createCar,
};
