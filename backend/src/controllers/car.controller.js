const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");

const prisma = new PrismaClient();

// Barcha avtomobillarni olish
async function getAllCars(req, res) {
  try {
    const cars = await prisma.car_info.findMany();
    res.json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ma'lumotlarni olishda xato yuz berdi.", success: false });
  }
}

// Avtomobil yaratish
const createCar = async (req, res) => {
  // Check for uploaded files
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ error: "Fayllarni yuklang!", success: false });
  }

  let images = req.files.images;
  if (!Array.isArray(images)) {
    images = [images];
  }

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

  try {
    const uploadsDir = path.join(process.cwd(), "src", "uploads"); // Ensure correct path

    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }

      for (let image of images) {
        const uniqueSuffix = Date.now();
        const fileName = `${image.name}-${uniqueSuffix}${path.extname(
          image.name
        )}`;
        nameImages.push(fileName);

        try {
          // Save the image files
          await image.mv(path.join(uploadsDir, fileName));
        } catch (err) {
          return res
            .status(500)
            .json({ error: "Fayl yuklashda xato yuz berdi.", success: false });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Fayl yaratishda hatolik yuz berdi", success: false });
    }

    // Save car data to the database
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
        image: nameImages,
      },
    });

    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Ma'lumotlarni saqlashda xato yuz berdi.",
      success: false,
    });
  }
};

module.exports = {
  getAllCars,
  createCar,
};
