const { Router } = require("express");
const {
  getAllCars,
  createCar,
  updateCar,
} = require("../controllers/car.controller");

const router = Router();

router.get("/car", getAllCars);
router.post("/create", createCar);
router.put("/update/:id", updateCar);

module.exports = router;
