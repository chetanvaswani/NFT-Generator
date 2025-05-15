"use client"
import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import mintNFT from "@/utils/mintNfts";

interface NFTData {
  metadata: {
    name: string;
    symbol: string;
    description: string;
  };
}

interface MintBtnProps {
  nfts: NFTData[];
}

export default function MintBtn({ nfts }: MintBtnProps){
  const wallet = useWallet();
  const { connection } = useConnection();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      const mintedNFTs = [];
      for (const nft of nfts) {
        const mintAddress = await mintNFT(nft, wallet, connection);
        mintedNFTs.push({
          name: nft.metadata.name,
          tokenId: mintAddress,
          ownerWallet: wallet.publicKey.toBase58(),
        });
      }

      // Update token IDs in the database
    //   const response = await fetch('/api/v1/update-token-ids', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       collectionId,
    //       nfts: mintedNFTs,
    //     }),
    //   });

    //   const result = await response.json();
    //   if (result.status !== "success") {
    //     throw new Error("Failed to update token IDs in the database");
    //   }

      setSuccess(`Successfully minted ${mintedNFTs.length} NFTs!`);
    } catch (err: any) {
      setError(err.message || "Minting failed");
      console.error("Minting error:", err);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleMint}
        disabled={isMinting || !wallet || !wallet.publicKey}
        className={`px-4 py-2 rounded-lg font-semibold text-white bg-grayShade disabled:opacity-75 disabled:cursor-not-allowed`}
      >
        {isMinting ? "Minting..." : "Mint NFTs"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};