export interface Layer {
    traits: Array<{
      artistId: number;
      collectionId: number;
      categoryId: number;
      traitName: string;
      imageUrl: string;
      rarity: number;
    }>;
}