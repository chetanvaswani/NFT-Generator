import { atom } from "recoil";

interface layersInterface {
    [categoryName: string]: any[];
  }

export const layersAtom = atom<layersInterface>({
    key: "layersAtom",
    default: {},
});

export const selectedLayersAtom = atom<layersInterface>({
    key: "selectedLayersAtom",
    default: {}
})