-- CreateTable
CREATE TABLE "car" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "mpg" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);
