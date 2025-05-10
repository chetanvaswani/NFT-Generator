"use client"
import { useRecoilValue } from "recoil";
import { selectedLayersAtom } from '@/store/atoms/layers';
import CartForm from '@/components/CartForm';
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState, useCallback } from 'react';
import DraggableLayer from "@/components/DraggableLayer";

export default function Cart() {
  const selectedLayers = useRecoilValue(selectedLayersAtom);
  const [layerOrder, setLayerOrder] = useState(Object.keys(selectedLayers).filter(key => selectedLayers[key].length > 0));
  const [loading, setLoading] = useState(false);

  const moveLayer = (dragIndex: any, hoverIndex: any) => {
    const draggedLayer = layerOrder[dragIndex];
    const newOrder = [...layerOrder];
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, draggedLayer);
    setLayerOrder(newOrder);
  };

  const handleFormSubmit = useCallback(async (formData: FormData) => {
    const collection = {
      name: formData.get("collectionName"),
      description: formData.get("collectionDescription"),
      symbol: formData.get("collectionSymbol"),
      nftCount: parseInt(formData.get("numberOfNfts") as string),
      width: 631,
      height: 631,
    };

    const layers = Object.keys(selectedLayers).reduce((acc:any, key: any) => {
      if (selectedLayers[key].length > 0) {
        acc[key] = {
          traits: selectedLayers[key].map(layer => ({
            artistId: layer.artistId,
            collectionId: layer.collectionId,
            categoryId: layer.categoryId,
            traitName: layer.traitName,
            imageUrl: layer.imageUrl,
            rarity: parseInt((100 / selectedLayers[key].length).toFixed(0)),
          })),
        };
      }
      return acc;
    }, {});

    const payload = {
      collection,
      layers,
      layerOrder,
    };

    console.log(payload)

    try {
      setLoading(true)
      const response = await fetch("/api/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setLoading(false)
        throw new Error("Failed to generate collection");
      }

      const data = await response.json();
      setLoading(false)
      console.log("Collection generated:", data);
    } catch (error) {
      console.error("Error generating collection:", error);
    }
  }, [selectedLayers, layerOrder]);

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white overflow-hidden">
      <div className="flex w-full h-[calc(100vh-40px)] overflow-hidden">
        <DndProvider backend={HTML5Backend}>
          <section className="flex-1 border-r-2 border-grayShade p-5 pb-20 overflow-y-auto flex flex-col gap-10">
            {layerOrder.length > 0 ? (
              layerOrder.map((key, index) => (
                <DraggableLayer key={key} layerKey={key} index={index} moveLayer={moveLayer} />
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center text-white/15 text-2xl font-extrabold">
                No Selected Items to Display
              </div>
            )}
          </section>
        </DndProvider>
        <aside className="w-[500px] h-[calc(100vh-40px)] p-5">
          <CartForm onSubmit={handleFormSubmit} loading={loading} />
        </aside>
      </div>
    </div>
  );
}