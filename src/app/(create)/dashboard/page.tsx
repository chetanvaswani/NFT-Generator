"use client"
import { useState, useEffect } from 'react';
import { GiClothes, GiFurShirt } from 'react-icons/gi';
import { FaRedhat } from 'react-icons/fa';
import { PiEyesFill } from 'react-icons/pi';
import { TbBackground } from 'react-icons/tb';
import { SiSurveymonkey } from 'react-icons/si';

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="flex flex-col min-h-screen w-screen bg-black text-white overflow-hidden animate-fadeIn">
      <div className="flex flex-1">
        <DashboardSidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div>

        </div>
      </div>
    </div>
  );
}

function DashboardSidebar({ selectedCategory, setSelectedCategory }: any) {
  const categories = [
    { name: 'fur', icon: <GiFurShirt className="text-3xl" /> },
    { name: 'mouth', icon: <SiSurveymonkey className="text-3xl" /> },
    { name: 'clothes', icon: <GiClothes className="text-3xl" /> },
    { name: 'background', icon: <TbBackground className="text-3xl" /> },
    { name: 'eyes', icon: <PiEyesFill className="text-3xl" /> },
    { name: 'cap', icon: <FaRedhat className="text-3xl" /> },
  ];

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, []);

  return (
    <div className="w-72 border-r-2 border-grayShade flex flex-col gap-3 animate-slideInLeft max-[1000px]:w-24 max-[1000px]:items-center max-[1000px]:pt-6 max-[500px]:w-16">
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
            {category.icon}
          </div>
          <div
            className="font-trebuchet text-xl font-bold tracking-wide max-[1000px]:hidden"
          >
            {category.name.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
}