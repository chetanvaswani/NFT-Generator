import { Layer } from '@/schemas/layer';

export function generateUniqueDNAs(layers: { [key: string]: Layer }, layerOrder: string[], nftCount: number): string[] {
    const dnaSet: Set<string> = new Set();
    const dnAs: string[] = [];
    
    // I have kept a limit of 100 just for now, while this is in the testing phase
    while (dnAs.length < nftCount && dnaSet.size < 100) {
      const dna: string = layerOrder.map((layerName: string) => {
        const traits: Layer['traits'] = layers[layerName].traits;
        const totalRarity: number = traits.reduce((sum: number, trait) => sum + (trait.rarity || 1), 0);
        let random: number = Math.random() * totalRarity;
        for (const trait of traits) {
          random -= trait.rarity || 1;
          if (random <= 0) return trait.traitName;
        }
        return traits[0].traitName;
      }).join(':');
  
      if (!dnaSet.has(dna)) {
        dnaSet.add(dna);
        dnAs.push(dna);
      }
    }
  
    if (dnAs.length < nftCount) {
      throw new Error('Could not generate enough unique NFTs');
    }
  
    return dnAs;
}