/*
  Warnings:

  - Added the required column `location` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "location" geography(Point, 4326) NOT NULL;
