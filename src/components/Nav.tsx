'use client';
import { CgImage } from 'react-icons/cg';
import { IoImagesOutline } from "react-icons/io5";
import { IoImages } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { IoCartOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname)

  return (
    <div className="mx-5 px-5 h-[70px] border-b-2 border-[#181818] flex justify-between items-center gap-2.5 animate-slideDown opacity-0">
      <div
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={() => router.push('/')}
      >
        <span className="text-[40px] font-extrabold">NFT Generator</span>
        <div className="flex items-center">
          <span className="text-[15px] bg-grayShade border border-white rounded-full px-3 py-1 font-extrabold">
            v1.0
          </span>
        </div>
      </div>
      <div className="flex gap-5">
        <div className='flex items-center gap-2'>
          {/* <div className='text-xl'>Gallery</div> */}
          {
            pathname === "/dashboard" ? 
            <IoImages
              className="cursor-pointer size-7"
              onClick={() => router.push('/dashboard')}
            /> :
            <IoImagesOutline
              className="cursor-pointer size-7 text-white/50"
              onClick={() => router.push('/dashboard')}
            />
          }
        </div>
        <div className='flex'>
          {
            pathname === "/cart" ? 
            <IoCart
              className="cursor-pointer size-9"
              onClick={() => router.push('/cart')}
            /> : 
            <IoCartOutline
              className="cursor-pointer size-9 text-white/50"
              onClick={() => router.push('/cart')}
            />
          }
        </div>
      </div>
    </div>
  );
}