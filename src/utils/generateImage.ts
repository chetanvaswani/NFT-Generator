import { createCanvas, loadImage } from 'canvas';
import { Layer } from '@/schemas/layer';

export async function generateImage(dna: string, layers: { [key: string]: Layer }, layerOrder: string[], width: number, height: number): Promise<Buffer> {
    const canvas: any = createCanvas(width, height);
    const ctx: any = canvas.getContext('2d');
    const dnaParts: string[] = dna.split(':');
  
    for (let i = 0; i < layerOrder.length; i++) {
      const layerName: string = layerOrder[i];
      const traitName: string = dnaParts[i];
      const trait: Layer['traits'][number] | undefined = layers[layerName].traits.find(t => t.traitName === traitName);
      if (trait && trait.imageUrl) {
        const image: any = await loadImage(trait.imageUrl);
        ctx.drawImage(image, 0, 0, width, height);
      }
    }
  
    return canvas.toBuffer('image/png');
  }