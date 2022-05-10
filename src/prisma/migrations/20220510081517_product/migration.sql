/*
  Warnings:

  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" VARCHAR(70) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(70) NOT NULL,
ADD COLUMN     "phoneNumber" VARCHAR(15) NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "nameAr" VARCHAR(255) NOT NULL,
    "nameEn" VARCHAR(70) NOT NULL,
    "nameKu" VARCHAR(70) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "unit" VARCHAR(10) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "images" TEXT[],
    "slug" VARCHAR(255) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
