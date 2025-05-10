import { Layer } from '@/schemas/layer';

export function generateMetadata(dna: string, index: number, name: string, description: string, symbol: string, imageUrl: string, layers: { [key: string]: Layer }, layerOrder: string[]): any {
    const dnaParts: string[] = dna.split(':');
    const attributes: Array<{ trait_type: string; value: string }> = layerOrder.map((layerName: string, i: number) => ({
      trait_type: layerName,
      value: dnaParts[i],
    }));
  
    return {
      name: `${name} #${index + 1}`,
      symbol,
      description,
      image: imageUrl,
      attributes,
      collection: { name, symbol },
    };
  }