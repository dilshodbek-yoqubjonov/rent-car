const { Router } = require("express");
const { getAllCars, createCar } = require("../controllers/car.controller");

const router = Router();

router.get("/", getAllCars);
router.post("/create", createCar);

module.exports = router;
