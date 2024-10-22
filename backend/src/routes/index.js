const { Router } = require("express");
const car = require("../controllers/car.controller");

const router = Router();

router.get("/", car.getAllCars);
router.post("/create", car.createCar);

module.exports = router;
