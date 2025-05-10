import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/utils/generateImage";
import { generateUniqueDNAs } from "@/utils/generateUniqueDNAs";
import { generateMetadata } from "@/utils/generateMetadata";
import { uploadToCloudinary } from "@/utils/uploadImages";

export async function POST(req: NextRequest) {
  try {
    const { collection, layers, layerOrder }: any = await req.json();
    const { name, symbol, description, nftCount, width, height } = collection;

    if (!name || !symbol || !nftCount || !width || !height || !layers || !layerOrder) {
      return NextResponse.json({ error: 'Missing required fields' });
    }

    if (parseInt(nftCount) > 10){
        return NextResponse.json({status: "failuer", data: {
            msg: "You can only generate up to 10 NFTs for now."
        }})
    }

    const dnAs: string[] = generateUniqueDNAs(layers, layerOrder, nftCount);

    // this will generate the imgs(artwork) for all nfts and also the metadata
    const nfts = await Promise.all(
      dnAs.map(async (dna: string, index: number) => {
        const imageBuffer: Buffer = await generateImage(dna, layers, layerOrder, width, height);
        const imageUrl: string = await uploadToCloudinary(imageBuffer, `${name}_${symbol}`, index);
        const metadata: any = generateMetadata(dna, index, name, description, symbol, imageUrl, layers, layerOrder);
        return { metadata, imageUrl };
      })
    );

    return NextResponse.json({
        status: "success",
        data: nfts
    });
  } catch (error: any) {
    console.error('Error in /api/v1/generate:', error);
    return NextResponse.json({ status: "failuer", error: 'Internal server error' });
  }
}