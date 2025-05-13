import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function ImportWallet(){
    return (
        <div className="flex gap-5 items-center">
            <div className='font-semibold'>
                Connect to your solana wallet to mint the NFT(s)
            </div>
            <WalletMultiButton />
        </div>
    )
}