import { useEffect, useRef, useState } from "react";
import Loader from "./RingLoader";

export default function CartForm({ onSubmit, loading }: { onSubmit: (formData: FormData) => void, loading: boolean }) {
  const alertDivRef = useRef<HTMLDivElement>(null);
  const [btnText, setBtnText] = useState("Generate Collection")

  useEffect(() => {
    if (loading){
      setBtnText("Generating your collection..")
    } else {
      setBtnText("Generate Collection")
    }
  }, [loading])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold ml-1 mb-4">Collection Information:</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-lg">
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
        <div ref={alertDivRef}></div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 h-12 flex justify-center items-center gap-2 rounded-md font-bold transition bg-white text-black disabled:opacity-[80%]`}
          >
            {
              loading ? <Loader /> : false
            }
            {btnText}
          </button>
        </div>
      </form>
    </div>
  );
}