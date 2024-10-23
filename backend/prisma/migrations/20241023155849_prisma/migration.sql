-- CreateTable
CREATE TABLE "car_info" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "city_mpg" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "combination_mpg" INTEGER NOT NULL,
    "drive" TEXT NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "highway_mpg" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "car_info_pkey" PRIMARY KEY ("id")
);
