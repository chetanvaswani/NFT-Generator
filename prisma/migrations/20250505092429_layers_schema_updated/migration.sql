/*
  Warnings:

  - Made the column `artist` on table `layer_images` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "layer_images" ALTER COLUMN "artist" SET NOT NULL;
