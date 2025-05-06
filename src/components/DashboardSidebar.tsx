"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useRecoilState} from "recoil";
import {categoriesAtom} from "@/store/atoms/categories";

import { GiClothes, GiFurShirt } from 'react-icons/gi';
import { FaRedhat } from 'react-icons/fa';
import { PiEyesFill } from 'react-icons/pi';
import { TbBackground } from 'react-icons/tb';
import { SiSurveymonkey } from 'react-icons/si';

export default function DashboardSidebar({ selectedCategory, setSelectedCategory }: any) {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useRecoilState(categoriesAtom)
    const categoryIcons: any = {
      "fur": <GiFurShirt className="text-3xl" />,
      "mouth": <SiSurveymonkey className="text-3xl" />,
      "clothes": <GiClothes className="text-3xl" />,
      "background": <TbBackground className="text-3xl" />,
      "eyes": <PiEyesFill className="text-3xl" />,
      "cap": <FaRedhat className="text-3xl" />,
    };
  
    useEffect(() => {
      console.log(categories)
      if (categories.length < 1){
        axios.get('/api/v1/categories?collectionId=1').then((res) => {
          if(res.status === 200){
            setCategories(res.data.data)
            console.log("fetch categories successful")
            setSelectedCategory(res.data.data[0])
            setLoading(false)
          }
        }).catch((err) => {
          console.log(err)
          setLoading(false)
        }) 
      } else {
        setSelectedCategory(categories[0])
        setLoading(false)
      }
    }, [])
  
    return (
      <div className="w-72 border-r-2 border-grayShade flex flex-col gap-3 animate-slideInLeft max-[1000px]:w-24 max-[1000px]:items-center max-[1000px]:pt-6 max-[500px]:w-16">
        {
          loading ? 
          <div role="status" className="max-w-md p-4 space-y-4 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-grayShade">
            <div className='w-full flex'>
                <div className="h-4 bg-gray-300 rounded-full dark:bg-grayShade w-[80%] mb-2.5"></div>
            </div>
            {
              [1, 2, 3, 4, 5, 6].map((curr) => {
                return (
                  <div className="flex gap-4 w-full items-center justify-between" key={curr}>
                      <div className="h-[35px] bg-gray-300 rounded-lg dark:bg-grayShade w-[15%]"></div>
                      <div className='w-[80%]'>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-grayShade w-full mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-grayShade"></div>
                      </div>
                  </div>
                )
              })
            }
          </div> :
          <div>
              <div className="font-logo text-3xl ml-4 mt-5 mb-4 font-bold tracking-wide max-[1000px]:hidden">
                Categories
              </div>
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`flex items-center gap-2 cursor-pointer p-2 ${
                    selectedCategory?.name === category.name ? 'text-white' : 'text-white/50'
                  } hover:text-white hover:underline max-[1000px]:justify-center`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="ml-6 max-[1000px]:ml-0 max-[1000px]:text-4xl max-[1000px]:hover:text-5xl">
                    {categoryIcons[category.name]}
                  </div>
                  <div
                    className="font-trebuchet text-xl font-bold tracking-wide max-[1000px]:hidden"
                  >
                    {category.name.toUpperCase()}
                  </div>
                </div>
              ))}
          </div>
        }
      </div>
    );
  }