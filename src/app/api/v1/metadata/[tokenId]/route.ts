import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db';

const isValidBase58 = (str: string): boolean => {
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return base58Regex.test(str);
};

export async function OPTIONS(req: NextRequest) {
  if (req){

  }
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "GET, OPTIONS", 
      "Access-Control-Allow-Headers": "Content-Type", 
      "Access-Control-Max-Age": "86400", // 1 day
    },
  });
}

export async function GET(
  req: NextRequest,
  context: { params: { tokenId: string } }
) {
  try {
    const { tokenId } = context.params;
    if(req){

    }
    if (!tokenId) {
      return NextResponse.json({ status: "failure", error: "Missing tokenId" }, { status: 400 });
    }

    if (!isValidBase58(tokenId)) {
      return NextResponse.json({ status: "failure", error: "Invalid tokenId format" }, { status: 400 });
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
      external_url: `https://nftgeneratorweb.netlify.app/api/v1/metadata/${tokenId}`,
      seller_fee_basis_points: 500,
    };

    return NextResponse.json(metadata, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error: any) {
    console.error('Error in /api/v1/metadata/[tokenId]:', error);
    return NextResponse.json({ status: "failure", error: 'Internal server error' }, { status: 500 });
  }
}