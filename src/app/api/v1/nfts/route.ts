import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db';

export async function PUT(req: NextRequest) {
  try {
    const { collectionName, nfts }: { collectionName: string; nfts: { name: string; tokenId: string; ownerWallet?: string }[] } = await req.json();
    console.log("collection name", collectionName)
    if (!collectionName ) {
      return NextResponse.json({ status: "failure", error: "Missing or invalid collectionId or nfts array" });
    }

    const nftCollection = await prisma.nftCollection.findFirst({
      where: { name: collectionName },
    });

    if (!nftCollection) {
      return NextResponse.json({ status: "failure", error: "Collection not found" });
    }

    const updatedNfts = await Promise.all(
      nfts.map(async (nft) => {
        const updatedNft = await prisma.nft.update({
          where: {
            collectionId: nftCollection.id,
            tokenId: nft.name,
          },
          data: {
            tokenId: nft.tokenId,
            ownerWallet: nft.ownerWallet || null,
            isMinted: true,
          },
        });
        return updatedNft;
      })
    );

    const totalNfts = await prisma.nft.count({ where: { id: nftCollection.id } });
    const mintedNfts = await prisma.nft.count({ where: { id: nftCollection.id, isMinted: true } });

    if (totalNfts === mintedNfts) {
      await prisma.nftCollection.update({
        where: { id: nftCollection.id },
        data: { isMinted: true },
      });
    }

    return NextResponse.json({
      status: "success",
      data: {
        collectionId: nftCollection.id,
        updatedNfts: updatedNfts.map(nft => ({
          id: nft.id,
          name: nft.name,
          tokenId: nft.tokenId,
          ownerWallet: nft.ownerWallet,
          isMinted: nft.isMinted,
        })),
      },
    });
  } catch (error: any) {
    console.error('Error in /api/v1/update-token-ids:', error);
    return NextResponse.json({ status: "failure", error: 'Internal server error' });
  }
}