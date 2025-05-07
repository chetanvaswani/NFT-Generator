export default function CartForm() {
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
  