/*
  Warnings:

  - Added the required column `name` to the `Coffee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coffee" ADD COLUMN     "name" TEXT NOT NULL;
