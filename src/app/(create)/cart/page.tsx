
"use client"
import { useRouter } from 'next/navigation'
import { MdOutlineImageNotSupported } from 'react-icons/md'
import {useRecoilState} from "recoil";
import { selectedLayersAtom } from '@/store/atoms/layers';

export default function Cart() {
  const router = useRouter()
  const [selectedLayers, setSelectedLayers] = useRecoilState(selectedLayersAtom)
  console.log(Object.keys(selectedLayers))

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white overflow-hidden">
      <div className="flex w-full h-[calc(100vh-40px)] overflow-hidden">
        <section className="flex-1 border-r-2 border-grayShade p-5 pb-20 overflow-y-auto flex flex-col gap-10">
          {
            Object.keys(selectedLayers).length > 0 ? Object.keys(selectedLayers).map((key) => {
              if (selectedLayers[key].length > 0){
                return (
                  <div className='border-2 border-grayShade rounded-sm'>
                      <header className="flex items-center h-9 pl-5 bg-grayShade font-sans font-bold text-lg">
                        {key.toUpperCase()}
                        <span className="ml-2 text-sm font-medium text-white/50">(selected-items)</span>
                      </header>
                      <div className="flex flex-wrap gap-x-4 gap-y-10 p-5">
                        {
                          selectedLayers[key].map((layer) => {
                            return (
                              <div key={layer.id} className="relative w-[200px] flex flex-col items-center gap-1">
                                <img
                                  src={layer.imageUrl}
                                  alt={layer.traitName}
                                  className="w-4/5 object-contain rounded-2xl border-2 border-dotted border-grayShade cursor-pointer relative z-10"
                                />
                                <span className="font-sans font-bold text-sm text-center mt-1">{layer.traitName}</span>
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
          <CollectionDetails />
        </aside>
      </div>
    </div>
  )
}

function CollectionDetails() {
  return (
    <div>
      <h2 className="text-2xl font-semibold ml-1 mb-4">Collection Information:</h2>
      <form className="flex flex-col gap-5 rounded-lg">
        <div className="flex flex-col gap-2">
          <label htmlFor="collectionName" className="text-base font-bold text-white">
            Collection Name:
          </label>
          <input
            type="text"
            id="collectionName"
            name="collectionName"
            placeholder="Enter collection name"
            required
            autoComplete="off"
            className="p-2 border-2 rounded-sm placeholder:text-[#777] border-[#333] bg-grayShade text-white focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="collectionDescription" className="text-base font-bold text-white">
            Description:
          </label>
          <input
            id="collectionDescription"
            name="collectionDescription"
            placeholder="Enter collection description"
            required
            autoComplete="off"
            className="p-2 border-2 rounded-sm placeholder:text-[#777] border-[#333] bg-grayShade text-white focus:outline-none focus:border-gray-500 resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="collectionSymbol" className="text-base font-bold text-white">
            Symbol:
          </label>
          <input
            type="text"
            id="collectionSymbol"
            name="collectionSymbol"
            placeholder="Enter collection symbol"
            maxLength={4}
            required
            autoComplete="off"
            className="p-2 border-2 rounded-sm placeholder:text-[#777] border-[#333] bg-grayShade text-white focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="numberOfNfts" className="text-base font-bold text-white">
            Number of NFTs to Generate:
          </label>
          <input
            type="number"
            id="numberOfNfts"
            name="numberOfNfts"
            placeholder="Enter number of NFTs"
            min={1}
            max={10}
            required
            autoComplete="off"
            className="p-2 border-2 rounded-sm placeholder:text-[#777] border-[#333] bg-grayShade text-white focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full mt-2 h-12 rounded-md bg-white text-black font-bold transition hover:bg-white/80"
          >
            Generate Collection
          </button>
        </div>
      </form>
    </div>
  )
}
