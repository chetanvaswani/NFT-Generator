-- CreateTable
CREATE TABLE "nft_collections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "description" TEXT,
    "cover_image_url" TEXT,
    "creatorName" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfts" (
    "id" SERIAL NOT NULL,
    "token_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT NOT NULL,
    "dna" TEXT,
    "metadata" JSONB NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "owner_wallet" TEXT,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nfts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nft_collections_symbol_key" ON "nft_collections"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "nfts_token_id_key" ON "nfts"("token_id");

-- CreateIndex
CREATE UNIQUE INDEX "nfts_dna_key" ON "nfts"("dna");

-- CreateIndex
CREATE INDEX "idx_nft_collection_id" ON "nfts"("collection_id");

-- AddForeignKey
ALTER TABLE "nfts" ADD CONSTRAINT "nfts_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "nft_collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
