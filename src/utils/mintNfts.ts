import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { WalletContextState } from '@solana/wallet-adapter-react';
import { TOKEN_2022_PROGRAM_ID, createMintToInstruction, createAssociatedTokenAccountInstruction, getMintLen, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, TYPE_SIZE, LENGTH_SIZE, ExtensionType, getAssociatedTokenAddressSync } from "@solana/spl-token"
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
  
  interface NFTData {
    metadata: {
      name: string;
      symbol: string;
      description: string;
    };
  }
  
  export default async function mintNFT(
    nftData: NFTData,
    wallet: WalletContextState,
    connection: any
  ): Promise<string> {
    console.log(wallet, (await wallet.publicKey))
    if (!wallet.publicKey) {
      throw new Error("Wallet not connected");
    }
  
    const mintKeypair = Keypair.generate();
    const metadataUri = `https://nftgeneratorweb.netlify.app/api/v1/metadata/${mintKeypair.publicKey.toBase58()}`; 
  
    const metadata = {
      mint: mintKeypair.publicKey,
      name: nftData.metadata.name,
      symbol: nftData.metadata.symbol,
      uri: metadataUri,
      additionalMetadata: [],
    };
  
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
  
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        mintKeypair.publicKey,
        wallet.publicKey,
        mintKeypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        0,
        wallet.publicKey,
        null,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mintKeypair.publicKey,
        metadata: mintKeypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      }),
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        getAssociatedTokenAddressSync(mintKeypair.publicKey, wallet.publicKey, false, TOKEN_2022_PROGRAM_ID),
        wallet.publicKey,
        mintKeypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createMintToInstruction(
        mintKeypair.publicKey,
        getAssociatedTokenAddressSync(mintKeypair.publicKey, wallet.publicKey, false, TOKEN_2022_PROGRAM_ID),
        wallet.publicKey,
        1, // 1 token for NFT
        [],
        TOKEN_2022_PROGRAM_ID
      )
    );
  
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(mintKeypair);
  
    const signedTransaction = await (wallet as any).signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTransaction.serialize());
    await connection.confirmTransaction(txid);
  
    console.log(`NFT minted at ${mintKeypair.publicKey.toBase58()}`);
    return mintKeypair.publicKey.toBase58();
  }