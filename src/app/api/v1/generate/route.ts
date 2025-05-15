import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/utils/generateImage";
import { generateUniqueDNAs } from "@/utils/generateUniqueDNAs";
import { generateMetadata } from "@/utils/generateMetadata";
import { uploadToCloudinary } from "@/utils/uploadImages";
import prisma from '../../../../db';

export async function POST(req: NextRequest) {
  try {
    const { collection, layers, layerOrder }: any = await req.json();
    const { name, symbol, description, nftCount, width, height } = collection;

    if (!name || !symbol || !nftCount || !width || !height || !layers || !layerOrder) {
      return NextResponse.json({ error: 'Missing required fields' });
    }

    if (parseInt(nftCount) > 10) {
      return NextResponse.json({
        status: "failuer",
        data: {
          msg: "You can only generate up to 10 NFTs for now."
        }
      });
    }


    const nftCollection = await prisma.nftCollection.create({
      data: {
        name,
        symbol,
        description: description || '',
        creatorName: 'Anonymous',
        blockchain: 'SOLANA', 
        coverImageUrl: '', 
      },
    });

    const dnAs: string[] = generateUniqueDNAs(layers, layerOrder, nftCount);

    const nfts = await Promise.all(
      dnAs.map(async (dna: string, index: number) => {

        const imageBuffer: Buffer = await generateImage(dna, layers, layerOrder, width, height);
        const imageUrl: string = await uploadToCloudinary(imageBuffer, `nfts/${name}_${symbol}`, index, symbol);

        const metadata: any = generateMetadata(dna, index, name, description, symbol, imageUrl, layers, layerOrder);
        const attributes = metadata.attributes;

        await prisma.nft.create({
          data: {
            tokenId: metadata.name,
            name: metadata.name,
            description: metadata.description || '',
            imageUrl,
            dna,
            metadata: attributes, 
            collectionId: nftCollection.id,
            ownerWallet: null, 
            isMinted: false,
          },
        });

        return { metadata, imageUrl };
      })
    );

    return NextResponse.json({
      status: "success",
      data: {
        collectionId: nftCollection.id,
        nfts,
      },
    });
  } catch (error: any) {
    console.error('Error in /api/v1/generate:', error);
    return NextResponse.json({ status: "failuer", error: 'Internal server error' });
  }
}