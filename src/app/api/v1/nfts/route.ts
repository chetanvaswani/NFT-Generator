import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../db';

export async function PUT(req: NextRequest) {
  try {
    const { collectionId, nfts }: { collectionId: number; nfts: { name: string; tokenId: string; ownerWallet?: string }[] } = await req.json();

    if (!collectionId || !nfts || !Array.isArray(nfts) || nfts.length === 0) {
      return NextResponse.json({ status: "failure", error: "Missing or invalid collectionId or nfts array" });
    }

    const nftCollection = await prisma.nftCollection.findUnique({
      where: { id: collectionId },
    });

    if (!nftCollection) {
      return NextResponse.json({ status: "failure", error: "Collection not found" });
    }

    const updatedNfts = await Promise.all(
      nfts.map(async (nft) => {
        const updatedNft = await prisma.nft.update({
          where: {
            collectionId: collectionId,
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

    const totalNfts = await prisma.nft.count({ where: { collectionId } });
    const mintedNfts = await prisma.nft.count({ where: { collectionId, isMinted: true } });

    if (totalNfts === mintedNfts) {
      await prisma.nftCollection.update({
        where: { id: collectionId },
        data: { isMinted: true },
      });
    }

    return NextResponse.json({
      status: "success",
      data: {
        collectionId,
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