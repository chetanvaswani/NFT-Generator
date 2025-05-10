import { FaPlus } from "react-icons/fa6";
import { GoDash } from "react-icons/go";
import { useDrag, useDrop } from 'react-dnd';
import { RiDraggable } from "react-icons/ri";
import { useRef } from 'react';
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { selectedLayersAtom } from "@/store/atoms/layers";

export default function DraggableLayerDisplay ({ layerKey, index, moveLayer }: any) {
    const ref = useRef(null);
    const headerRef = useRef(null);
    const selectedLayers = useRecoilValue(selectedLayersAtom);
  
    const [{ isDragging }, drag] = useDrag({
      type: 'layer',
      item: { index },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: 'layer',
      hover: (item: any) => {
        if (item.index !== index) {
          moveLayer(item.index, index);
          item.index = index;
        }
      },
    });
  
    drag(headerRef);
    drop(ref);
  
    const layers = selectedLayers[layerKey];
  
    return (
      <div
        ref={ref}
        className="border-2 border-grayShade rounded-sm"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <header
          ref={headerRef}
          className="flex items-center h-9 pl-5 bg-grayShade font-sans font-bold text-lg justify-between cursor-ns-resize"
        >
          <div className="flex items-center">
            {layerKey.toUpperCase()}
            <span className="ml-2 text-sm font-medium text-white/50">(selected-items)</span>
          </div>
          <div className="flex gap-1 items-center">
            <div className="text-white/50 text-xs flex items-center">(drag <FaLongArrowAltUp className="size-3" /> or <FaLongArrowAltDown className="size-3" />  to arrange layers)</div>
            <RiDraggable className="text-white size-5 mr-1" />
          </div>
        </header>
        <div className="flex flex-wrap gap-x-4 gap-y-10 p-5">
          {layers.map((layer) => {
            const rarity = parseInt((100 / layers.length).toFixed(0));
            return (
              <div key={layer.id} className="relative w-[200px] flex flex-col items-center gap-1">
                <img
                  src={layer.imageUrl}
                  alt={layer.traitName}
                  className="w-4/5 object-contain rounded-2xl border-2 border-dotted border-grayShade cursor-pointer relative z-10"
                />
                <span className="font-sans font-bold text-sm text-center mt-1">{layer.traitName}</span>
                <div className="w-full flex justify-center items-center">
                  <div className="bg-grayShade w-[80%] p-2 py-1 flex justify-between items-center">
                    <button className="text-2xl font-bold">
                      <GoDash className="size-4" />
                    </button>
                    <div>{rarity}%</div>
                    <button className="text-2xl font-bold">
                      <FaPlus className="size-4" onClick={() => {}} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };