const { Router } = require("express");
const {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/car.controller");

const router = Router();

router.get("/car", getAllCars);
router.post("/create", createCar);
router.put("/update/:id", updateCar);
router.delete("/delete/:id", deleteCar);

module.exports = router;
