/*
  Warnings:

  - You are about to drop the column `artist` on the `layer_images` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `layer_images` table. All the data in the column will be lost.
  - You are about to drop the column `collection` on the `layer_images` table. All the data in the column will be lost.
  - You are about to drop the `_ArtistToLayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArtistToLayers" DROP CONSTRAINT "_ArtistToLayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToLayers" DROP CONSTRAINT "_ArtistToLayers_B_fkey";

-- DropIndex
DROP INDEX "idx_layer_images_category_name";

-- DropIndex
DROP INDEX "idx_layer_images_collection";

-- AlterTable
ALTER TABLE "layer_images" DROP COLUMN "artist",
DROP COLUMN "category_name",
DROP COLUMN "collection",
ADD COLUMN     "artist_id" INTEGER,
ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "collection_id" INTEGER;

-- DropTable
DROP TABLE "_ArtistToLayers";

-- CreateTable
CREATE TABLE "collections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cover_image" TEXT NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collections_name_key" ON "collections"("name");

-- CreateIndex
CREATE INDEX "idx_collection_artist_id" ON "collections"("artist_id");

-- CreateIndex
CREATE INDEX "idx_category_collection_id" ON "categories"("collection_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_collection_id_key" ON "categories"("name", "collection_id");

-- CreateIndex
CREATE INDEX "idx_layer_images_artist_id" ON "layer_images"("artist_id");

-- CreateIndex
CREATE INDEX "idx_layer_images_collection_id" ON "layer_images"("collection_id");

-- CreateIndex
CREATE INDEX "idx_layer_images_category_id" ON "layer_images"("category_id");

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layer_images" ADD CONSTRAINT "layer_images_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layer_images" ADD CONSTRAINT "layer_images_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layer_images" ADD CONSTRAINT "layer_images_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
