/*
  Warnings:

  - Added the required column `lotNumber` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "lotNumber" VARCHAR(70) NOT NULL;
