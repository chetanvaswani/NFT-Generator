"use client"
import React, { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import mintNFT from "@/utils/mintNfts";
import axios from "axios";

export default function MintBtn({ nfts }: any){
  const wallet = useWallet();
  const { connection } = useConnection();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (error !== null){
        setTimeout(() => {
            setError(null)
        }, 2000)
    }
  }, [error])

  const handleMint = async () => {
    if (!wallet || !wallet.publicKey ) {
      setError("Please connect your wallet");
      return;
    }

    setIsMinting(true);
    setError(null);
    setSuccess(null);

    try {
      const balance = await connection.getBalance(wallet.publicKey);
      console.log(balance, "this is your sol balance")
      // 0.1 SOL per NFT
      const requiredLamports = 0.1 * LAMPORTS_PER_SOL * nfts.length;
      if (balance < requiredLamports) {
        throw new Error(
          `Insufficient balance: You need ~${requiredLamports / LAMPORTS_PER_SOL} SOL, but you have ${balance / LAMPORTS_PER_SOL} SOL`
        );
      }

      // ƒpr each NFT
      const mintedNFTs: any[] = [];
      for (const nft of nfts) {
        const mintAddress = await mintNFT(nft, wallet, connection);
        mintedNFTs.push({
          name: nft.metadata.name,
          tokenId: mintAddress,
          ownerWallet: wallet.publicKey.toBase58(),
        });
      }

      console.log(mintedNFTs)
      console.log(nfts[0].metadata.collection.name, "collection name")

      await axios.put('/api/v1/nfts', {
            collectionName: nfts[0].metadata.collection.name,
            nfts: mintedNFTs
        }
      ).then((res) => {
            console.log(res)
          if (res.data.status !== "success") {
            throw new Error("Failed to update token IDs in the database");
          } else {
              setSuccess(`Successfully minted ${mintedNFTs.length} NFT(s)! Please check your wallet!`);
          }
      })

    } catch (err: any) {
      setError(err.message || "Minting failed");
      console.error("Minting error:", err);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="w-[50%]">
        {
            success !== null ?
                <p className="text-green-500 text-center font-semibold text-lg">{success}</p>
            : error !== null ?
                <p className="text-red-500 text-center font-semibold text-lg">{error}</p>
            :
             <button onClick={handleMint} disabled={isMinting || !wallet || !wallet.publicKey}
                className={`px-4 py-2 rounded-lg w-full font-semibold text-white bg-grayShade disabled:opacity-75 disabled:cursor-not-allowed`}>
                    {isMinting ? "Minting..." : "Mint NFTs"}
            </button> 
        }
    </div>
  );
};