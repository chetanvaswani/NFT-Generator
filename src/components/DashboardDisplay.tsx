import React, { useEffect, useState } from "react";
import axios from "axios";
import {useRecoilState} from "recoil";
import {layersAtom, selectedLayersAtom} from "../store/atoms/layers"

export default function DashboardDisplay({selectedCategory}: any) {
    const [layer, setLayers] = useRecoilState(layersAtom);
    const [selectedLayers, setSelectedLayers] = useRecoilState(selectedLayersAtom)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (selectedCategory !== null && !(layer[selectedCategory.name])){
      axios.get(`/api/v1/layers?categoryId=${selectedCategory?.id}`).then((res) => {
        console.log(res.data)
        setLayers((prevLayers) => ({
            ...prevLayers,
            [selectedCategory.name]: res.data.data,
          }));
        setLoading(false)
        console.log({
            [selectedCategory.name]: res.data.data,
        })
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
    } else {
        setLoading(false)
    }
  }, [selectedCategory])

  if (loading){
    return (
        <div className="flex flex-wrap justify-evenly gap-8 p-12 animate-pulse overflow-hidden h-[calc(100vh-70px)] w-[calc(100%-300px)] max-[1000px]:w-[calc(100%-100px)]">
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((curr) => {
                    return (
                        <div key={curr} className="w-[30%]">
                            <div className="flex flex-col gap-4 w-full items-center justify-between" key={curr}>
                                <div className="w-full h-[225px] bg-gray-300 rounded-lg dark:bg-grayShade"></div>
                                <div className='w-[80%]'>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-grayShade w-full mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-grayShade"></div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }            
        </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-evenly gap-8 p-12 overflow-y-auto h-[calc(100vh-70px)] w-[calc(100%-300px)] max-[1000px]:w-[calc(100%-100px)]">
      {layer[selectedCategory.name]?.map((layer: any) => {
        return (
          <div
            key={layer.id}
            id={layer.traitName}
            onClick={() => {
                if (selectedLayers[selectedCategory.name] && selectedLayers[selectedCategory.name].length > 0){
                    console.log(selectedLayers[selectedCategory.name])
                    let updatedLayerArray= selectedLayers[selectedCategory.name]
                    if (updatedLayerArray.includes(layer)){
                        updatedLayerArray = updatedLayerArray.filter((l: any) => l !== layer)
                        setSelectedLayers((prev) => ({
                            ...prev,
                            [selectedCategory.name]: [...updatedLayerArray]
                        }))
                    } else {
                        setSelectedLayers((prev) => ({
                            ...prev,
                            [selectedCategory.name]: [...updatedLayerArray, layer]
                        }))
                    }
                    console.log(selectedLayers[selectedCategory.name])
                } else {
                    setSelectedLayers((prev) => ({
                        ...prev,
                        [selectedCategory.name]: [layer]
                    }))
                }
            }}
            className={`flex flex-col w-1/4 gap-2 cursor-pointer relative group not-selected ${ selectedLayers[selectedCategory.name] && selectedLayers[selectedCategory.name].includes(layer) ? "selected": "not-selected"}`}
          >
            <img
              src={layer.imageUrl}
              alt={`layer ${layer.id}`}
              className="w-full object-contain border-4 border-dotted border-grayShade rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300 text-white text-lg font-sans">
            </div>
            <div className="flex justify-center items-center h-6 py-5 w-full border-2 border-grayShade text-center font-sans text-xl font-normal">
              {layer.traitName}
            </div>
          </div>
        );
      })}
    </div>
  );
}