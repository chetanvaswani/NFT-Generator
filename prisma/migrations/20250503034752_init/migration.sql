-- CreateTable
CREATE TABLE "layer_images" (
    "id" SERIAL NOT NULL,
    "collection" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "trait_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "layer_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_layer_images_collection" ON "layer_images"("collection");

-- CreateIndex
CREATE INDEX "idx_layer_images_category_name" ON "layer_images"("category_name");
