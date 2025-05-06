import { atom } from "recoil";
import { categoryInterface } from "../../schemas/category";

export const categoriesAtom = atom<categoryInterface[]>({
    key: "categoriesAtom",
    default: [],
  });