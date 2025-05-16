"use client"
import React from "react"
import { useRecoilValue } from "recoil"
import { nftsAtom } from "@/store/atoms/nfts"
import { IoInformationCircle } from "react-icons/io5";
import MintBtn from "@/components/MintButton";

export default function Mint(){
    const nfts = useRecoilValue(nftsAtom)

    return (
        <div className="flex flex-col h-[calc(100vh-70px)] overflow-y-auto w-screen bg-black text-white overflow-hidden">
            <div className="flex w-full h-[calc(100vh-140px)] overflow-hidden">
                <div className="flex flex-wrap justify-evenly gap-8 w-[100%]">
                    <section className="flex-1 justify-evenly h-full  p-10 pb-20 overflow-y-auto flex flex-wrap gap-10">
                        {
                            nfts.length > 0 && nfts.map((nft) => {
                                return (
                                    <div key={nft.metadata.name} className="w-[22%]">
                                        <div className="rounded-md flex flex-col bg-grayShade">
                                            <img src={nft.imageUrl} alt="" className="w-full object-contain rounded-t-md" />
                                            <div className="h-[50px] w-full px-3 rounded-b-md bg-grayShade text-white flex justify-between items-center font-semibold">
                                                {nft.metadata.name}
                                                <IoInformationCircle className="size-5 text-white cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </section>
                </div> 
                {/* <aside className="w-[600px] h-[calc(100vh-40px)] p-7 flex flex-col gap-3">
                    <div className="flex gap-2">
                        <div className="font-semibold text-white/50 text-lg">Collection Name:</div>
                        <div className="font-bold text-lg">{toTitleCase(nfts[0].metadata.collection.name)}</div>
                    </div>
                    <div className="flex gap-2">
                        <div className="font-semibold text-white/50 text-lg">Description:</div>
                        <div className="font-bold text-lg">{(nfts[0].metadata.description)}</div>
                    </div>
                </aside> */}
            </div>
                <div className="w-full h-[70px] flex justify-center items-center border-t-2 border-grayShade">
                    <MintBtn nfts={nfts} />
                </div>
        </div>
    )
}