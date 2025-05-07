
"use client"
// import { useRouter } from 'next/navigation'
import {useRecoilState} from "recoil";
import { selectedLayersAtom } from '@/store/atoms/layers';
import { FaPlus } from "react-icons/fa6";
import { GoDash } from "react-icons/go";
import CartForm from '@/components/CartForm';
import { useEffect } from 'react';


export default function Cart() {
  // const router = useRouter()
  const [selectedLayers, setSelectedLayers] = useRecoilState(selectedLayersAtom);


  // console.log(Object.keys(selectedLayers))
  useEffect(() => {
    if (Object.keys(selectedLayers).length > 0){
      Object.keys(selectedLayers).map((key) => {
       const rarity = parseInt((100/selectedLayers[key].length).toFixed(3))
       const layersByCategory = selectedLayers[key]
       const layersWithRarity: any = []
       layersByCategory.forEach((layer) => {
         layersWithRarity.push({
           ...layer,
           rarity
         })
       })
       setSelectedLayers((prev) => ({
         ...prev,
         [key]: layersWithRarity
       }))
     })
    }
  }, [])


  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white overflow-hidden">
      <div className="flex w-full h-[calc(100vh-40px)] overflow-hidden">
        <section className="flex-1 border-r-2 border-grayShade p-5 pb-20 overflow-y-auto flex flex-col gap-10">
          {
            Object.keys(selectedLayers).length > 0 ? Object.keys(selectedLayers).map((key) => {
              if (selectedLayers[key].length > 0){
                return (
                  <div key={key} className='border-2 border-grayShade rounded-sm'>
                      <header className="flex items-center h-9 pl-5 bg-grayShade font-sans font-bold text-lg">
                        {key.toUpperCase()}
                        <span className="ml-2 text-sm font-medium text-white/50">(selected-items)</span>
                      </header>
                      <div className="flex flex-wrap gap-x-4 gap-y-10 p-5">
                        {
                          selectedLayers[key].map((layer) => {
                            let rarity = parseInt((100/selectedLayers[key].length).toFixed(0))
                            console.log(layer)
                            return (
                              <div key={layer.id} className="relative w-[200px] flex flex-col items-center gap-1">
                                <img
                                  src={layer.imageUrl}
                                  alt={layer.traitName}
                                  className="w-4/5 object-contain rounded-2xl border-2 border-dotted border-grayShade cursor-pointer relative z-10"
                                />
                                <span className="font-sans font-bold text-sm text-center mt-1">{layer.traitName}</span>
                                <div className='w-full flex justify-center items-center'>
                                  <div className='bg-grayShade w-[80%] p-2 py-1 flex justify-between items-center'>
                                    <button className='text-2xl font-bold'>
                                      <GoDash className='size-4' />
                                    </button>
                                    <div>{rarity}%</div>
                                    <button className='text-2xl font-bold'>
                                      <FaPlus className='size-4' onClick={() => {
                                        rarity += 10
                                        console.log(rarity)
                                      }} />
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <button></button>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                  </div>
                )
              }
            }):
            <div className='w-full h-full flex justify-center items-center text-white/15 text-2xl font-extrabold'>
                No Selected Items to Display
            </div>
          }
        </section>
        <aside className="w-[500px] h-[calc(100vh-40px)] p-5">
          <CartForm />
        </aside>
      </div>
    </div>
  )
}

