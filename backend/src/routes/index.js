const { Router } = require("express");
const { getAllCars, createCar } = require("../controllers/car.controller");

const router = Router();

router.get("/", getAllCars);
router.post("/", createCar);

module.exports = router;
