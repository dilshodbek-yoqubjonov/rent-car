const { Router } = require("express");
const { getAllCars, createCar } = require("../controllers/car.controller");

const router = Router();

router.get("/", getAllCars);
router.post("/", createCar);
router.post("/some", (req, res) => {
    console.log(req.body);  // Bu yerda yuborilgan ma'lumotni ko'rsatish
    res.send("Ma'lumot qabul qilindi");
  });
module.exports = router;
