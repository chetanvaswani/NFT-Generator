"use client"
import React from "react"
import { useRecoilValue } from "recoil"
import { nftsAtom } from "@/store/atoms/nfts"
import { IoInformationCircle } from "react-icons/io5";
// import { toTitleCase } from "@/utils/toTitleCase";

export default function Mint(){
    const nfts = useRecoilValue(nftsAtom)

    return (
        <div className="p-12 flex flex-col gap-10 h-[calc(100vh-70px)] overflow-y-auto">
            <div className="flex flex-wrap justify-evenly gap-8 w-full">
                {
                    nfts.length > 0 && nfts.map((nft) => {
                        return (
                            <div key={nft.metadata.name} className="w-[25%]">
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
            </div> 
        </div>
    )
}