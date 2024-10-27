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

const updateCar = async (req, res) => {
  let { id } = req.params;
  let numericId = Number(id); // numberic Id

  try {
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

    // cheking file uploads
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ error: "Fayllarni yuklang!", success: false });
    }
    // cheking images in array
    let images = req.files.images;
    if (!Array.isArray(images)) {
      images = [images];
    }
    // get old data info
    const data = await prisma.car_info.findFirst({
      where: { id: numericId },
    });

    if (!data) {
      return res
        .status(404)
        .json({ error: "Bunday id da moshina mavjud emas", success: false });
    }
    // save files to uploads
    const updatedImages = [];
    for (let image of images) {
      const uniqueSuffix = Date.now();
      const fileName = `${image.name}-${uniqueSuffix}${path.extname(
        image.name
      )}`;
      updatedImages.push(fileName);
      const uploadsDir = path.join(process.cwd(), "src", "uploads"); // Ensure correct path

      try {
        await image.mv(path.join(uploadsDir, fileName));
      } catch (err) {
        return res.status(500).json({
          error: "Fayl yuklashda xato yuz berdi.",
          success: false,
        });
      }
    }
    // update data
    let updatedData = await prisma.car_info.update({
      where: { id: numericId },
      data: {
        cost: cost !== undefined ? Number(cost) : data.cost, // Convert to number
        city_mpg: city_mpg !== undefined ? Number(city_mpg) : data.city_mpg, // Convert to number
        class_type: class_type !== undefined ? class_type : data.class_type,
        combination_mpg:
          combination_mpg !== undefined
            ? Number(combination_mpg)
            : data.combination_mpg, // Convert to number
        drive: drive !== undefined ? drive : data.drive,
        fuel_type: fuel_type !== undefined ? fuel_type : data.fuel_type,
        highway_mpg:
          highway_mpg !== undefined ? Number(highway_mpg) : data.highway_mpg, // Convert to number
        make: make !== undefined ? make : data.make,
        name: name !== undefined ? name : data.name,
        system: system !== undefined ? system : data.system,
        model: model !== undefined ? model : data.model,
        transmission:
          transmission !== undefined ? transmission : data.transmission,
        image: updatedImages.length > 0 ? updatedImages : data.image, // Use new images if provided
      },
    });

    res.status(200).json(updatedData); // Respond with the updated data
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
};

module.exports = {
  getAllCars,
  createCar,
  updateCar,
};
