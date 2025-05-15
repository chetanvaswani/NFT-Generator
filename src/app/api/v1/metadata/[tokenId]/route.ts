import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../db';

export async function GET(req: NextRequest, { params }: { params: { tokenId: string } }) {
  try {
    const { tokenId } = params;

    if (!tokenId) {
      return NextResponse.json({ status: "failure", error: "Missing tokenId" }, { status: 400 });
    }

    const nft = await prisma.nft.findUnique({
      where: { tokenId },
      include: { collection: true },
    });

    if (!nft) {
      return NextResponse.json({ status: "failure", error: "NFT not found" }, { status: 404 });
    }

    const metadata = {
      name: nft.name,
      symbol: nft.collection.symbol,
      description: nft.description || '',
      image: nft.imageUrl,
      attributes: nft.metadata,
      collection: {
        name: nft.collection.name,
        symbol: nft.collection.symbol,
      },
    };

    return NextResponse.json(metadata);
  } catch (error: any) {
    console.error('Error in /api/metadata/[tokenId]:', error);
    return NextResponse.json({ status: "failure", error: 'Internal server error' }, { status: 500 });
  }
}